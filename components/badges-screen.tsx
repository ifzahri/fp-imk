"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Home, BarChart3, Plus, Award, User, Leaf, Bike, TreesIcon as Plant, Star, Medal, Zap, Lock } from "lucide-react"
import Link from "next/link"
import { getUserBadges, getAllBadges } from "@/lib/api"
import { getUserIdFromJwt } from "@/lib/utils"
import { BadgeResponse } from "@/types/types"

// Interface for handling nested badge responses
interface NestedBadgesPayload {
  badges: BadgeResponse[]
  page?: number
  per_page?: number
  max_page?: number
  count?: number
}

export default function BadgesScreen() {
  const [userBadges, setUserBadges] = useState<BadgeResponse[]>([])
  const [allBadges, setAllBadges] = useState<BadgeResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get user ID from JWT (may be null if not logged in)
        const userId = getUserIdFromJwt()

        // Fetch both all badges and user badges concurrently
        const [allBadgesResult, userBadgesResult] = await Promise.all([
          getAllBadges().catch(e => { throw { type: "all", error: e } }),
          userId 
            ? getUserBadges(userId).catch(e => { 
                console.warn("Could not load user badges, defaulting to none:", e)
                return { status: true, message: "", data: [] }
              })
            : Promise.resolve({ status: true, message: "", data: [] })
        ])

        // Handle all badges response
        if (!allBadgesResult.status) {
          throw new Error(`Could not load badges: ${allBadgesResult.message}`)
        }

        // Support both flat array and nested response structures
        let allBadgesData: BadgeResponse[]
        if (Array.isArray(allBadgesResult.data)) {
          allBadgesData = allBadgesResult.data
        } else {
          allBadgesData = (allBadgesResult.data as NestedBadgesPayload).badges || []
        }
        setAllBadges(allBadgesData)

        // Handle user badges response
        if (userBadgesResult.status) {
          let userBadgesData: BadgeResponse[] = []
          if (userBadgesResult.data === null || userBadgesResult.data === undefined) {
            userBadgesData = [] // Data is explicitly null or undefined
          } else if (Array.isArray(userBadgesResult.data)) {
            userBadgesData = userBadgesResult.data
          } else {
            // Assume it's NestedBadgesPayload
            userBadgesData = (userBadgesResult.data as NestedBadgesPayload).badges || []
          }
          setUserBadges(userBadgesData)
        } else {
          // If user badges fail to load (status is false), default to empty
          console.warn("Could not load user badges:", userBadgesResult.message)
          setUserBadges([])
        }

      } catch (err: unknown) {
        console.error("Badges fetch error:", err)
        if (typeof err === "object" && err !== null && "type" in err && err.type === "all") {
          setError("Failed to load badge list. Please try again.")
        } else if (typeof err === "object" && err !== null && "response" in err && typeof err.response === "object" && err.response !== null && "data" in err.response && typeof err.response.data === "object" && err.response.data !== null && "message" in err.response.data && typeof err.response.data.message === "string") {
          setError(err.response.data.message)
        } else if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Failed to load badges")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBadges()
  }, [])

  const getBadgeIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vehicle':
      case 'transport':
        return Bike
      case 'energy':
      case 'electronics':
        return Zap
      case 'environment':
      case 'eco':
        return Leaf
      case 'food':
        return Plant
      case 'achievement':
        return Medal
      default:
        return Star
    }
  }

  const getBadgeColor = (category: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: "bg-gray-200",
        text: "text-gray-400",
        icon: "text-gray-400"
      }
    }

    switch (category.toLowerCase()) {
      case 'vehicle':
      case 'transport':
        return {
          bg: "bg-blue-100",
          text: "text-blue-500",
          icon: "text-blue-500"
        }
      case 'energy':
      case 'electronics':
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-500",
          icon: "text-yellow-500"
        }
      case 'environment':
      case 'eco':
        return {
          bg: "bg-green-100",
          text: "text-green-500",
          icon: "text-green-500"
        }
      case 'food':
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-500",
          icon: "text-emerald-500"
        }
      case 'achievement':
        return {
          bg: "bg-purple-100",
          text: "text-purple-500",
          icon: "text-purple-500"
        }
      default:
        return {
          bg: "bg-amber-100",
          text: "text-amber-500",
          icon: "text-amber-500"
        }
    }
  }

  const isUserBadge = (badgeId: string) => {
    return userBadges.some(userBadge => userBadge.id === badgeId)
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-[100vh] bg-white rounded-lg shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <h1 className="text-lg font-bold text-emerald-600">JejaKarbon</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4 text-gray-600" />
            </Button>
            <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden border border-gray-200">
              <img src="/img/miffy.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>
            <div className="text-sm text-gray-500">
              {userBadges.length}/{allBadges.length} earned
              {!getUserIdFromJwt() && (
                <div className="text-xs text-amber-600 mt-1">
                  Login to unlock badges
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-500">Loading badges...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-red-600 font-medium mb-2">Oops! Something went wrong</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
              <Button 
                onClick={() => {
                  setError(null)
                  setIsLoading(true)
                  // Trigger re-fetch by updating a dependency
                  window.location.reload()
                }} 
                variant="outline"
                className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
              >
                Try Again
              </Button>
            </div>
          ) : allBadges.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No badges available yet</p>
              <p className="text-gray-400 text-sm mt-1">Check back later for new achievements!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {allBadges.map((badge) => {
                const isUnlocked = isUserBadge(badge.id)
                const IconComponent = getBadgeIcon(badge.category)
                const colors = getBadgeColor(badge.category, isUnlocked)
                
                return (
                  <div key={badge.id} className="flex flex-col items-center relative">
                    <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mb-2 relative`}>
                      {badge.icon_url ? (
                        <img 
                          src={badge.icon_url} 
                          alt={badge.name}
                          className={`w-8 h-8 ${isUnlocked ? '' : 'grayscale opacity-50'}`}
                        />
                      ) : (
                        <IconComponent className={`h-8 w-8 ${colors.icon}`} />
                      )}
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full">
                          <Lock className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <span className={`text-xs ${colors.text} text-center font-medium`}>
                      {badge.name}
                    </span>
                    {badge.description && (
                      <span className="text-xs text-gray-400 text-center mt-1 leading-tight">
                        {badge.description}
                      </span>
                    )}
                    {badge.level && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{badge.level}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Achievement Stats */}
          {!isLoading && !error && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">Achievement Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Badges Earned:</span>
                  <span className="font-semibold text-emerald-600 ml-2">{userBadges.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-semibold text-blue-600 ml-2">
                    {allBadges.length > 0 ? Math.round((userBadges.length / allBadges.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex items-center justify-around py-3 px-4">
            <Link href="/home">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-gray-500"
              >
                <Home className="h-4 w-4" />
                <span className="text-xs">Home</span>
              </Button>
            </Link>
            <Link href="/analytics">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-gray-500"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Analytics</span>
              </Button>
            </Link>
            <Link href="/add">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-gray-500"
              >
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <Plus className="h-4 w-4 text-white" />
                </div>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-emerald-600"
            >
              <Award className="h-4 w-4" />
              <span className="text-xs">Badges</span>
            </Button>
            <Link href="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-gray-500"
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
