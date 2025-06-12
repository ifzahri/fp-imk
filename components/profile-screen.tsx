"use client"

import { Button } from "@/components/ui/button"
import { Home, BarChart3, Plus, Award, User, ChevronRight, Camera, LogOut } from "lucide-react"
import Link from "next/link"

export default function ProfileScreen() {
  const menuItems = [
    { label: "Edit Profile", icon: ChevronRight },
    { label: "Display", icon: ChevronRight },
    { label: "Languages", icon: ChevronRight },
    { label: "Community", icon: ChevronRight },
    { label: "Terms and Conditions", icon: ChevronRight },
    { label: "FAQs", icon: ChevronRight },
    { label: "Rate Us", icon: ChevronRight },
    { label: "Safety", icon: ChevronRight },
    { label: "Help", icon: ChevronRight },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <h1 className="text-lg font-bold text-emerald-600">JejaKarbon</h1>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 pb-20">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                <img
                  src="/img/miffy.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Full Name</h2>
            <p className="text-sm text-gray-500">@username</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <span className="text-gray-800">{item.label}</span>
                <item.icon className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <Link href="/login" passHref>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
            <br></br>
          </Link>
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
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-emerald-600"
            >
              <User className="h-4 w-4" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
