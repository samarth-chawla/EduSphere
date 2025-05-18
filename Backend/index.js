import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken"
import multer from 'multer'

const app = express();
const saltRounds = 10;
const upload = multer({ storage: multer.memoryStorage() })
env.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());


// ********************************************   AUTHENTICATION   ********************************************
//Creating account
app.post("/api/createAccount", async function (req, res) {
  const user = req.body.username;
  const name = req.body.fullname;
  const pass = req.body.password;
  const cpass = req.body.cpassword;
  console.log(req.body);
  try {
    const checkUsernname = await db.query(
      "SELECT * FROM users where username = $1",
      [user]
    ); // to check that user already exists or username not available

    if (checkUsernname.rows.length > 0) {
      res.status(400).send("Username already exists...");
    } else {
      console.log("creating user..");
      if (pass == cpass) {
        const hashedPass = await bcrypt.hash(
          pass,
          saltRounds,
          async (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              const result = await db.query(
                "INSERT INTO users(fullname,username,password) VALUES ($1,$2,$3) RETURNING *",
                [name, user, hash]
              );
              const users = result.rows[0];
              req.login(users, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  res.redirect("/");
                }
              });
            }
          }
        );
      } else {
        res.status(400).send("Password do not match");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//Logging In with username and password
app.post("/api/loginUser", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ error: "Login failed" });
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// app.get('/auth/google/home',
//   passport.authenticate('google', {
//     successRedirect: 'http://localhost:5173/home', // front-end route after login
//     failureRedirect: 'http://localhost:5173/login',
//     session: true // or false if you're using JWT
//   })
// );

app.get("/auth/google/home", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error("Passport callback error:", err); // Log error here
      return res.status(500).send("Authentication error");
    }

    if (!user) {
      console.warn("No user returned by Google");
      return res.redirect("http://localhost:5173/login");
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login session error:", loginErr); // Log login error
        return res.status(500).send("Login failed");
      }
      const payload = {
        username: user.username,
        displayName: user.displayName,
      };

      // Sign the token
      const token = jwt.sign(payload, process.env.SESSION_SECRET , { expiresIn: "1h" });

      // Send token back to client
      // return res.redirect(`http://localhost:5173/home?token=${token}`);
      // res.json({ token });
      res.redirect("http://localhost:5173/home");
    });
  })(req, res, next);
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const checkUsernname = await db.query(
        "SELECT * FROM users where username = $1",
        [username]
      ); // to check that user already exists or not
      if (checkUsernname.rows.length > 0) {
        bcrypt.compare(
          password,
          checkUsernname.rows[0].password,
          (err, valid) => {
            // console.log(checkUsernname.rows[0].password)
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, checkUsernname.rows[0]);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          }
        );
      } else {
        res.send("Username not exists...");
      }
    } catch (error) {
      console.log(error);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/home",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password, username, fullname) VALUES ($1, $2, $3, $4) RETURNING *",
            [
              profile.email,
              "google",
              profile.displayName.replace(/\s/g, "."),
              profile.displayName,
            ]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});


// UPLOADING POST
app.post("/api/upload", async (req,res,next) => {
  const {user , image, caption } = req.body
  try {
    const result = await db.query(
    "SELECT user_id FROM users WHERE username = $1",
    [user.username])
    const id = result.rows[0].user_id;
    console.log(result.rows[0].user_id)
    if (!result){
      res.status(400).send("User not found");
    }
    const info = await db.query("INSERT INTO posts(user_id, caption, image ) VALUES ($1,$2,$3) RETURNING *",
              [id, caption, image])
    if (info){
      res.status(200).send("Uploaded!!")
    }else{
      res.status(400).send("Error UPLOADING post");
    }

  } catch (error) {
    console.log("Cannot find the user ", error)
  }
})

app.get("/api/getPosts", async (req,res,next) => {
  try {
    const result = await db.query("SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.user_id")
    res.send(result.rows)

    // console.log(result.rows)
  } catch (error) {
    console.log("Error loading posts",error)
  }
})

app.post('/api/getUserId', async (req,res) => {
  const user = req.body.username
  try {
    const result = await db.query(
    "SELECT user_id FROM users WHERE username = $1",
    [user])
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const id = result.rows[0].user_id;
    res.status(200).json({ userId: id });
  } catch (error) {
    console.log("Cannot find the user ", error)
    res.status(500).send("Internal server error");
  }
})

// Check if user has liked a post
app.post('/api/posts/:postId/likes/:userId', async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const result = await db.query(
      'SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );
    res.json({ liked: result.rowCount > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Like a post
app.post('/api/posts/:postId/likes', async (req, res) => {
  const { userId,postId } = req.body;

  try {
    await db.query(
      'INSERT INTO likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, postId]
    );
    res.status(200).json({ message: 'Post liked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Unlike a post
app.delete('/api/posts/:postId/likes/:userId', async (req, res) => {
  const { postId, userId } = req.body;

  try {
    await db.query(
      'DELETE FROM likes WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );
    res.status(200).json({ message: 'Post unliked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unlike post' });
  }
});

app.post("/api/getSuggestions",async (req,res) =>{
  const loggeduserId = req.body.loggeduserId;
  
  try {
    const result = await db.query("SELECT * FROM users WHERE user_id != $1 AND user_id NOT IN (SELECT UNNEST(follows) FROM users WHERE user_id = $1)",[loggeduserId]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error)
  }
})

app.delete("/api/suggestions/:userId/follow", async (req,res) => {
  const {userId, loggeduserId} = req.body;
  try {
    db.query('UPDATE users SET follows = array_remove(follows, $1) WHERE user_id = $2', [userId,loggeduserId]);
    res.status(200).json({ message: 'Unfollowed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unfollow' });
  }
})

app.post("/api/suggestions/:userId/follow", async (req,res) => {
  const {userId, loggeduserId} = req.body;
  try {
    db.query('UPDATE users SET follows = follows || $1 WHERE user_id = $2', [[userId],loggeduserId])
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow' });
  }
})

app.post('/api/getuserInfo', async (req,res) => {
  const user = req.body.username
  try {
    const result = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [user])
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const userInfo = result.rows[0];
    // console.log(id)
    res.status(200).json( userInfo );
  } catch (error) {
    console.log("Cannot find the user ", error)
    res.status(500).send("Internal server error");
  }
})

app.get(`/api/getPosts/:userId`, async (req,res,next) => {
  const {userId} = req.params
  try {
    const result = await db.query("SELECT * FROM posts WHERE user_id = $1", [userId])
    res.send(result.rows)
    console.log(result.rows)
  } catch (error) {
    console.log("Error loading posts",error)
  }
})

const port = process.env.port || 3000;

app.listen(port);
