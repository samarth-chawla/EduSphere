"use client"

import React from "react"

const Tabs = ({ value, onValueChange, defaultValue, className, children, ...props }) => {
  // No need for internal state as it's managed by Redux
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

const TabsList = ({ className, children, ...props }) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const TabsTrigger = ({ className, value, children, ...props }) => {
  // Get the current value and onChange from the parent Tabs component via props
//   const { value: selectedValue, onValueChange } = React.useContext({
//     value: props.value,
//     onValueChange: props.onValueChange,
//   })

  const isSelected = selectedValue === value

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isSelected ? "bg-white text-gray-950 shadow-sm" : "text-gray-500 hover:text-gray-900"
      } ${className}`}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ className, value, children, ...props }) => {
  // Get the current value from the parent Tabs component via props
  const { value: selectedValue } = React.useContext({
    value: props.value,
  })

  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

