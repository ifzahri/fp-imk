/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"
import { getUserDailyChallenge, updateUserChallengeProgress } from "@/lib/api"
import { UserChallengeResponse } from "@/types/types"
import toast from "react-hot-toast"

export default function DailyChallengeScreen() {
  const [challenge, setChallenge] = useState<UserChallengeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setIsLoading(true)
        const result = await getUserDailyChallenge()
        if (result.status) {
          setChallenge(result.data)
        } else {
          setError(result.message || "No daily challenge found")
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load daily challenge")
        console.error("Daily challenge fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChallenge()
  }, [])

  const handleProgressUpdate = async (newProgress: number) => {
    if (!challenge || isUpdating) return

    try {
      setIsUpdating(true)
      const result = await updateUserChallengeProgress(challenge.challenge_id, newProgress)
      if (result.status) {
        setChallenge(result.data)
        toast.success("Progress updated successfully!")
      } else {
        toast.error(result.message || "Failed to update progress")
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update progress")
      console.error("Progress update error:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusIcon = (isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    return <Clock className="h-4 w-4 text-yellow-500" />
  }

  const getStatusColor = (isCompleted: boolean) => {
    if (isCompleted) {
      return "bg-green-50 border-green-200"
    }
    return "bg-emerald-50 border-emerald-200"
  }

  const getProgressColor = (isCompleted: boolean) => {
    if (isCompleted) {
      return "bg-green-500"
    }
    return "bg-emerald-500"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center border-b shadow-sm">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="mr-3 h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Daily Challenge</h1>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading daily challenge...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : challenge ? (
            <>
              {/* Challenge Info Card */}
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {challenge.challenge_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3 pt-0">
                  <p className="text-sm text-gray-600">{challenge.challenge_description}</p>
                  <div className="flex items-center justify-center gap-2">
                    {/* <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Save {challenge.current_progress} kg CO₂
                    </span> */}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Progress Card
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3 pt-0">
                  <Progress 
                    value={challenge.milestone_progress[0] ? 
                      (challenge.current_progress / challenge.milestone_progress[0].target) * 100 : 0
                    } 
                    className="h-3" 
                  />
                  <p className="text-sm text-gray-600 font-medium">
                    {challenge.current_progress}/{challenge.milestone_progress[0]?.target || 0} completed
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() => handleProgressUpdate(challenge.current_progress + 1)}
                      disabled={isUpdating || challenge.current_progress >= (challenge.milestone_progress[0]?.target || 0)}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isUpdating ? "Updating..." : "+1 Progress"}
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
            </>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No daily challenge available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
