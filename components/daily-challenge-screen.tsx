"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DailyChallengeScreen() {
  const challenges = [
    {
      title: "Drive less than 10 km",
      progress: 50,
      current: 5,
      target: 10,
      status: "active",
      color: "bg-emerald-50 border-emerald-200",
      progressColor: "bg-emerald-500",
    },
    {
      title: "Not eating any processed food",
      progress: 0,
      current: 0,
      target: 1,
      status: "pending",
      color: "bg-emerald-50 border-emerald-200",
      progressColor: "bg-emerald-500",
    },
    {
      title: "Use electronics less than 20 kWh",
      progress: 75,
      current: 15,
      target: 20,
      status: "active",
      color: "bg-emerald-50 border-emerald-200",
      progressColor: "bg-emerald-500",
    },
    {
      title: "Use AC less than 10 hours",
      progress: 100,
      current: 10,
      target: 10,
      status: "failed",
      color: "bg-red-50 border-red-200",
      progressColor: "bg-red-500",
    },
  ]

  const overallProgress = 75 // 3/4 completed

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
          {/* Overall Progress Card */}
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-base font-semibold text-gray-900">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3 pt-0">
              <Progress value={overallProgress} className="h-3" />
              <p className="text-sm text-gray-600 font-medium">3/4 completed</p>
            </CardContent>
          </Card>

          {/* Challenge Cards */}
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <Card key={index} className={`border-2 ${challenge.color} shadow-lg`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 text-center text-sm">{challenge.title}</h3>

                    <div className="space-y-2">
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full transition-all duration-300 ease-in-out ${challenge.progressColor}`}
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-medium">Progress</span>
                        <span className="text-xs text-gray-600 font-medium">
                          {challenge.current}/{challenge.target}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
