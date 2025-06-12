"use client"

import { Button } from "@/components/ui/button"
import { Bell, Home, BarChart3, Plus, Award, User, Leaf, Bike, TreesIcon as Plant, Star, Medal, Zap } from "lucide-react"
import Link from "next/link"

export default function BadgesScreen() {
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
          <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>

          <div className="grid grid-cols-3 gap-4">
            {/* Earth Saver Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <Leaf className="h-8 w-8 text-red-500" />
              </div>
              <span className="text-xs text-red-500 text-center">Earth Saver</span>
            </div>

            {/* Cycle Hero Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Bike className="h-8 w-8 text-blue-500" />
              </div>
              <span className="text-xs text-blue-500 text-center">Cycle Hero</span>
            </div>

            {/* Plant Master Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Plant className="h-8 w-8 text-green-500" />
              </div>
              <span className="text-xs text-green-500 text-center">Plant Master</span>
            </div>

            {/* Super Saver Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <span className="text-xs text-yellow-500 text-center">Super Saver</span>
            </div>

            {/* Eco Warrior Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <Medal className="h-8 w-8 text-purple-500" />
              </div>
              <span className="text-xs text-purple-500 text-center">Eco Warrior</span>
            </div>

            {/* Energy Saver Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <span className="text-xs text-amber-500 text-center">Energy Saver</span>
            </div>

            {/* Locked Badge 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <Leaf className="h-8 w-8 text-gray-400" />
              </div>
              <span className="text-xs text-gray-400 text-center">Green Guardian</span>
            </div>

            {/* Locked Badge 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <Bike className="h-8 w-8 text-gray-400" />
              </div>
              <span className="text-xs text-gray-400 text-center">Carbon-Free Commuter</span>
            </div>

            {/* Locked Badge 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <Plant className="h-8 w-8 text-gray-400" />
              </div>
              <span className="text-xs text-gray-400 text-center">Habitat Hero</span>
            </div>
          </div>
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
