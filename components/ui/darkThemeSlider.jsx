"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const SliderButton = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <motion.button
      role="switch"
      aria-checked={isDark}
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-all duration-300",
        isDark ? "bg-zinc-950 border border-zinc-800" : "bg-white border border-zinc-200"
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
    >
      <motion.span
        className={cn(
          "rounded-full transition-all duration-300 flex items-center justify-center",
          isDark ? "bg-zinc-800 text-white" : "bg-gray-200 text-gray-700",
          "h-5 w-5"
        )}
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 700, damping: 30, bounce: 0 }}
      >
        {isDark ? <Moon className="h-4 w-4" strokeWidth={1.5} /> : <Sun className="h-4 w-4" strokeWidth={1.5} />}
      </motion.span>
    </motion.button>
  )
}

export { SliderButton }
