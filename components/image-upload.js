"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export function ImageUpload({
  label,
  value,
  onChange,
  folder = "company-assets",
  aspectRatio = "square",
  maxSize = 5,
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileUpload = async (file) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error("File too large", {
        description: `File size must be less than ${maxSize}MB`,
      })
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file",
      })
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const data = await response.json()
      onChange(data.url)

      toast.success("Upload successful", {
        description: "Image has been uploaded successfully",
      })
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to upload image. Please try again."
      setError(errorMessage)
      toast.error("Upload failed", {
        description: errorMessage,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    await handleFileUpload(file)
  }

  const handleDrop = useCallback(async (event) => {
    event.preventDefault()
    setIsDragOver(false)

    const files = Array.from(event.dataTransfer.files)
    const file = files[0]

    if (file) {
      await handleFileUpload(file)
    }
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleRemove = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setError(null)
  }

  const aspectClasses = aspectRatio === "wide" ? "aspect-[16/9]" : "aspect-square"

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {value ? (
        <div className="relative group">
          <div className={`relative ${aspectClasses} w-full max-w-xs rounded-lg overflow-hidden border`}>
            <Image
              src={value || "/placeholder.svg"}
              alt={label}
              fill
              className="object-cover"
              onError={() => setError("Failed to load image")}
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${aspectClasses} max-w-xs flex flex-col items-center justify-center ${
            isDragOver
              ? "border-primary bg-primary/5"
              : error
                ? "border-destructive"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              {isDragOver ? (
                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
              ) : (
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              )}
              <p className="text-sm text-muted-foreground">
                {isDragOver ? "Drop image here" : `Click to upload or drag & drop ${label.toLowerCase()}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Max {maxSize}MB • JPG, PNG, GIF</p>
            </>
          )}
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
