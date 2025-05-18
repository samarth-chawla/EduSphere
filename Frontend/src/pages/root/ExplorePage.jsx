import { useSelector, useDispatch } from "react-redux"
import { Search, TrendingUp, Users, Compass, Heart, MessageSquare, Bookmark } from "lucide-react"
import { setActiveTab } from "/src/redux/exploreSlice"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tab"
import { Card, CardContent } from "../../components/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar"
import { Badge } from "../../components/Badge"

export default function ExplorePage() {
  const activeTab = useSelector((state) => state.explore.activeTab)
  const dispatch = useDispatch()

  const handleTabChange = (value) => {
    dispatch(setActiveTab(value))
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for people, topics, or keywords..."
            className="pl-10 h-12 rounded-full bg-gray-100"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Trending */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Trending Topics
                  </h2>
                  <Button variant="ghost" size="sm">
                    See all
                  </Button>
                </div>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="font-medium text-gray-500">{index + 1}</div>
                      <div>
                        <div className="font-semibold hover:underline cursor-pointer">#{topic.name}</div>
                        <div className="text-sm text-gray-500">{topic.posts} posts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Who to Follow
                  </h2>
                  <Button variant="ghost" size="sm">
                    See all
                  </Button>
                </div>
                <div className="space-y-4">
                  {suggestedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold hover:underline cursor-pointer">{user.name}</div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="trending" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="trending" className="flex items-center">
                  <FireIcon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Trending</span>
                </TabsTrigger>
                <TabsTrigger value="foryou" className="flex items-center">
                  <Compass className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">For You</span>
                </TabsTrigger>
                <TabsTrigger value="latest" className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Latest</span>
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center">
                  <FireIcon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Popular</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="foryou" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts
                    .slice()
                    .reverse()
                    .map((post, index) => (
                      <PostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="latest" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.slice(2, 8).map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.slice(0, 6).map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.user.name}</span>
        </div>
        <h3 className="font-semibold line-clamp-2 mb-2">{post.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
          </div>
          <button className="hover:text-blue-500">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

// FireIcon component since it's not in lucide-react by default
function FireIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  )
}

// Sample data
const trendingTopics = [
  { name: "photography", posts: 12453 },
  { name: "technology", posts: 8765 },
  { name: "travel", posts: 7654 },
  { name: "food", posts: 6543 },
  { name: "fitness", posts: 5432 },
]

const suggestedUsers = [
  { name: "Alex Johnson", username: "alexj", avatar: "https://via.placeholder.com/40" },
  { name: "Samantha Lee", username: "samlee", avatar: "https://via.placeholder.com/40" },
  { name: "David Chen", username: "dchen", avatar: "https://via.placeholder.com/40" },
  { name: "Maria Garcia", username: "mgarcia", avatar: "https://via.placeholder.com/40" },
]

const posts = [
  {
    title: "Amazing sunset at the beach yesterday",
    image: "https://via.placeholder.com/400x200",
    likes: 1243,
    comments: 89,
    tags: ["photography", "nature", "sunset"],
    user: { name: "Jane Smith", username: "janesmith", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "My new workspace setup for 2023",
    image: "https://via.placeholder.com/400x200",
    likes: 982,
    comments: 124,
    tags: ["technology", "workspace", "productivity"],
    user: { name: "Mark Wilson", username: "markw", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "Exploring the mountains of Switzerland",
    image: "https://via.placeholder.com/400x200",
    likes: 2341,
    comments: 156,
    tags: ["travel", "mountains", "adventure"],
    user: { name: "Emily Chen", username: "emilyc", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "Homemade pasta recipe that will change your life",
    image: "https://via.placeholder.com/400x200",
    likes: 1567,
    comments: 203,
    tags: ["food", "cooking", "recipe"],
    user: { name: "Carlos Rodriguez", username: "carlosr", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "Morning workout routine for busy professionals",
    image: "https://via.placeholder.com/400x200",
    likes: 876,
    comments: 67,
    tags: ["fitness", "health", "workout"],
    user: { name: "Sarah Johnson", username: "sarahj", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "The future of AI in everyday applications",
    image: "https://via.placeholder.com/400x200",
    likes: 2103,
    comments: 178,
    tags: ["technology", "ai", "future"],
    user: { name: "Alex Thompson", username: "alext", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "Street photography in Tokyo",
    image: "https://via.placeholder.com/400x200",
    likes: 1876,
    comments: 94,
    tags: ["photography", "travel", "urban"],
    user: { name: "Kenji Yamamoto", username: "kenjiy", avatar: "https://via.placeholder.com/40" },
  },
  {
    title: "Minimalist interior design inspiration",
    image: "https://via.placeholder.com/400x200",
    likes: 1432,
    comments: 112,
    tags: ["design", "interior", "minimalism"],
    user: { name: "Olivia Parker", username: "oliviap", avatar: "https://via.placeholder.com/40" },
  },
]

