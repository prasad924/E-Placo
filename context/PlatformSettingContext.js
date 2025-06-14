"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from "@/lib/api"

const PlatformSettingsContext = createContext()

export const PlatformSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get("/auth/platform-settings")
      setSettings(res.data)
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
      const res = await api.put("/admin/settings", updatedData)
      setSettings(res.data)
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

export const usePlatformSettings = () => useContext(PlatformSettingsContext)
