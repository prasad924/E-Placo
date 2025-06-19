"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from "@/lib/api"

const PlatformSettingsContext = createContext(null)

export const PlatformSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get("/auth/platform-settings")
      console.log(res)
      if(res.data.message === "Settings not avaliable") {
        return
      }
      setSettings(res.data.settings)
    } catch (err) {
      console.error("Error fetching platform settings", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const updateSettings = async (updatedData) => {
    try {
      setSettings(updatedData)
      await api.put("/admin/settings", updatedData)
      await fetchSettings()
    } catch (err) {
      console.error("Error updating platform settings", err)
      throw err
    }
  }

  return (
    <PlatformSettingsContext.Provider value={{ settings, loading, updateSettings, refetchSettings: fetchSettings }}>
      {children}
    </PlatformSettingsContext.Provider>
  )
}

export const usePlatformSettings = () => {
  const context = useContext(PlatformSettingsContext)
  if (!context) {
    throw new Error("usePlatformSettings must be used within a PlatformSettingsProvider")
  }
  return context
}
