"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Home, BarChart3, Plus, Award, User, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [timeframe, setTimeframe] = useState("Last 6 months")

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
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
              <img
                src="/img/miffy.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 pb-20">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Daily Avg</span>
                  <div className="w-5 h-5 text-emerald-600">
                    <BarChart3 className="w-full h-full" />
                  </div>
                </div>
                <div className="text-2xl font-bold">2.4 kg</div>
                <div className="text-xs text-red-500 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  12% vs yesterday
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Monthly Avg</span>
                  <div className="w-5 h-5 text-blue-600">
                    <BarChart3 className="w-full h-full" />
                  </div>
                </div>
                <div className="text-2xl font-bold">60.8 kg</div>
                <div className="text-xs text-emerald-600 flex items-center gap-1">
                  <ArrowDownRight className="w-3 h-3" />
                  3% vs last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carbon Trend */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Carbon Trend</h2>
              <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1 px-2">
                {timeframe}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            <Card className="border-gray-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-44 w-full bg-gray-50 flex items-center justify-center">
                  {/* <img
                    src=""
                    alt="Carbon Trend Graph"
                    className="w-full h-full object-cover"
                  /> */}
                  <p className="text-gray-500 text-sm">No trend data available</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emission Sources */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-gray-900">Emission Sources</h2>

            <div className="border-t border-gray-200">
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="text-red-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 17H16M8 17V15M8 17L6 19M16 17V15M16 17L18 19M6 11L12 5L18 11M6 11V19H18V11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Vehicle</p>
                    <p className="text-xs text-gray-500">Car, Bus, Train</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">850 kg</p>
                    <p className="text-xs text-red-500">+2.4%</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <div className="text-yellow-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.66347 17H14.3364M11.9999 3V4M18.3639 5.63604L17.6568 6.34315M21 11.9999H20M4 11.9999H3M6.34309 6.34315L5.63599 5.63604M8.46441 15.5356C6.51179 13.5829 6.51179 10.4171 8.46441 8.46449C10.417 6.51187 13.5829 6.51187 15.5355 8.46449C17.4881 10.4171 17.4881 13.5829 15.5355 15.5356L14.9884 16.0827C14.3555 16.7155 13.9999 17.5739 13.9999 18.469V19C13.9999 20.1046 13.1045 21 11.9999 21C10.8954 21 9.99995 20.1046 9.99995 19V18.469C9.99995 17.5739 9.6444 16.7155 9.01151 16.0827L8.46441 15.5356Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Electronics</p>
                    <p className="text-xs text-gray-500">Home, Office</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">620 kg</p>
                    <p className="text-xs text-emerald-600">-1.8%</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="text-blue-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 10.9C16.7956 10.9 17.5587 10.5786 18.1213 10.0059C18.6839 9.43322 19 8.66711 19 7.86667C19 7.06622 18.6839 6.30011 18.1213 5.72744C17.5587 5.15478 16.7956 4.83333 16 4.83333C15.2044 4.83333 14.4413 5.15478 13.8787 5.72744C13.3161 6.30011 13 7.06622 13 7.86667C13 8.66711 13.3161 9.43322 13.8787 10.0059C14.4413 10.5786 15.2044 10.9 16 10.9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 22V20C5 18.9391 5.42143 17.9217 6.17157 17.1716C6.92172 16.4214 7.93913 16 9 16H16C17.0609 16 18.0783 16.4214 18.8284 17.1716C19.5786 17.9217 20 18.9391 20 20V22"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 7H3M10 13H3M6 10H3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Food</p>
                    <p className="text-xs text-gray-500">Household</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">430 kg</p>
                    <p className="text-xs text-emerald-600">-0.5%</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </div>
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
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-emerald-600"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Analytics</span>
            </Button>
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
