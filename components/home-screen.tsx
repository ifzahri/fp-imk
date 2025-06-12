"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Leaf, ChevronRight, Car, Zap, Home, BarChart3, Plus, Award, User } from "lucide-react"
import Link from "next/link"

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("home")

  const activities = [
    { type: "car", icon: Car, label: "Car Usage", detail: "15 km driven", impact: "+1.2 kg", color: "text-red-500" },
    { type: "electricity", icon: Zap, label: "Electricity", detail: "4.5 kWh used", impact: "+0.8 kg", color: "text-yellow-500" },
    { type: "car", icon: Car, label: "Car Usage", detail: "18 km driven", impact: "+1.5 kg", color: "text-red-500" },
    { type: "electricity", icon: Zap, label: "Electricity", detail: "5.2 kWh used", impact: "+1.2 kg", color: "text-yellow-500" },
  ]

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
                  2.4 kg CO<sub className="text-lg">2</sub>
                </div>
                <div className="flex items-center text-sm opacity-90">
                  <span className="mr-1">↓</span>
                  12% less than yesterday
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
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                      Active
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">Use electronics less than 20 kWh</p>
                <Progress value={75} className="h-2 mb-2" />
                <p className="text-xs text-gray-500">3/4 completed</p>
              </Link>
            </CardContent>
          </Card>

          {/* Today's Activities */}
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-900">{"Today's Activities"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{activity.label}</p>
                        <p className="text-xs text-gray-500">{activity.detail}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${activity.color} text-sm`}>{activity.impact}</span>
                  </div>
                ))}
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
