"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Leaf, ChevronRight, Car, Zap, Home, BarChart3, Plus, Award, User, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { getCarbonDashboard, getActivitiesByUser, getUserDailyChallenge } from "@/lib/api"
import { getUserIdFromJwt } from "@/lib/utils"
import { CarbonDashboardResponse, ActivityResponse, UserChallengeResponse } from "@/types/types"

export default function HomeScreen() {
  const [dashboardData, setDashboardData] = useState<CarbonDashboardResponse | null>(null)
  const [activities, setActivities] = useState<ActivityResponse[]>([])
  const [dailyChallenge, setDailyChallenge] = useState<UserChallengeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch dashboard data
        const dashResult = await getCarbonDashboard()
        if (dashResult.status) {
          setDashboardData(dashResult.data)
        }

        // Fetch user activities
        const userId = getUserIdFromJwt()
        if (userId) {
          const activitiesResult = await getActivitiesByUser(userId)
          if (activitiesResult.status) {
            setActivities(activitiesResult.data.slice(0, 4)) // Show only recent 4 activities
          }
        }

        // Fetch daily challenge
        try {
          const challengeResult = await getUserDailyChallenge()
          if (challengeResult.status) {
            setDailyChallenge(challengeResult.data)
          }
        } catch (challengeError) {
          // Daily challenge might not exist, that's okay
          console.log("No daily challenge found")
        }

      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load data")
        console.error("Home screen data fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getActivityIcon = (source: string) => {
    switch (source) {
      case 'vehicle': return Car
      case 'electronics': return Zap
      case 'food': return UtensilsCrossed
      default: return Car
    }
  }

  const getActivityColor = (source: string) => {
    switch (source) {
      case 'vehicle': return "text-red-500"
      case 'electronics': return "text-yellow-500"
      case 'food': return "text-green-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <h1 className="text-lg font-bold text-emerald-600">JejaKarbon</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4 text-gray-600" />
            </Button>
            <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-600">
                <img src="/img/miffy.jpg" alt="Miffy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 pb-20">
          {/* Carbon Footprint Card */}
          <Card className="bg-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-medium">{"Today's Carbon Footprint"}</h2>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {isLoading ? "Loading..." : dashboardData ? 
                    `${dashboardData.daily_average?.value?.toFixed(1) || "0.0"} kg CO` : 
                    "0.0 kg CO"
                  }<sub className="text-lg">2</sub>
                </div>
                <div className="flex items-center text-sm opacity-90">
                  <span className="mr-1">
                    {dashboardData?.daily_average?.trend === 'up' ? '↑' : '↓'}
                  </span>
                  {dashboardData?.daily_average?.percentage_change.toFixed(2)|| "0"}% vs yesterday
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Challenge */}
          <Card className="border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <Link href="/daily-challenge" className="block">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">Daily Challenge</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      dailyChallenge ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {dailyChallenge ? 'Active' : 'None'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {dailyChallenge ? dailyChallenge.challenge_description : "No active challenge"}
                </p>
                {dailyChallenge && (
                  <>
                    <Progress 
                      value={dailyChallenge.milestone_progress[0] ? 
                        (dailyChallenge.current_progress / dailyChallenge.milestone_progress[0].target) * 100 : 0
                      } 
                      className="h-2 mb-2" 
                    />
                    <p className="text-xs text-gray-500">
                      {dailyChallenge.current_progress}/{dailyChallenge.milestone_progress[0]?.target || 0} completed
                    </p>
                  </>
                )}
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">Recent Activities</CardTitle>
                <Link href="/carbon-history" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  View all
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {isLoading ? (
                  <p className="text-sm text-gray-500 text-center py-4">Loading activities...</p>
                ) : activities.length > 0 ? (
                  activities.map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.source)
                    const colorClass = getActivityColor(activity.source)
                    return (
                      <Link
                        key={index}
                        href="/carbon-history"
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                            <IconComponent className={`h-4 w-4 ${colorClass}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm capitalize">{activity.source}</p>
                            <p className="text-xs text-gray-500">{activity.deskripsi}</p>
                          </div>
                        </div>
                        <span className={`font-semibold ${colorClass} text-sm`}>
                          +{activity.carbon_estimate?.toFixed(1) || "0.0"} kg
                        </span>
                      </Link>
                    )
                  })
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-2">No activities yet</p>
                    <Link 
                      href="/add" 
                      className="text-xs text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Start tracking your carbon footprint
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex items-center justify-around py-3 px-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-emerald-600"
            >
              <Home className="h-4 w-4" />
              <span className="text-xs">Home</span>
            </Button>
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
            <Link href="/badges">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-gray-500"
              >
                <Award className="h-4 w-4" />
                <span className="text-xs">Badges</span>
              </Button>
            </Link>
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
