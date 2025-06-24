"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Home, BarChart3, Plus, Award, User, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { getCarbonDashboard } from "@/lib/api"
import { CarbonDashboardResponse } from "@/types/types"

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [timeframe, setTimeframe] = useState("6_months")
  const [timeframeLabel, setTimeframeLabel] = useState("Last 6 months")
  const [dashboardData, setDashboardData] = useState<CarbonDashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTrend, setIsLoadingTrend] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false)

  const timeframeOptions = [
    { value: "7_days", label: "Last 7 days" },
    { value: "1_month", label: "Last 1 month" },
    { value: "3_months", label: "Last 3 months" },
    { value: "6_months", label: "Last 6 months" },
    { value: "1_year", label: "Last 1 year" }
  ]

  const fetchDashboardData = async (selectedTimeframe?: string) => {
    try {
      if (selectedTimeframe) {
        setIsLoadingTrend(true)
      } else {
        setIsLoading(true)
      }
      
      const url = selectedTimeframe ? `?timeframe=${selectedTimeframe}` : ''
      const result = await getCarbonDashboard(url)
      
      if (result.status) {
        setDashboardData(result.data)
      } else {
        setError(result.message || "Failed to fetch dashboard data")
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred while fetching data")
      console.error("Dashboard fetch error:", err)
    } finally {
      setIsLoading(false)
      setIsLoadingTrend(false)
    }
  }

  const handleTimeframeChange = async (newTimeframe: string) => {
    const selectedOption = timeframeOptions.find(option => option.value === newTimeframe)
    if (selectedOption) {
      setTimeframe(newTimeframe)
      setTimeframeLabel(selectedOption.label)
      setShowTimeframeDropdown(false)
      await fetchDashboardData(newTimeframe)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTimeframeDropdown) {
        setShowTimeframeDropdown(false)
      }
    }

    if (showTimeframeDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showTimeframeDropdown])

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
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : dashboardData ? 
                    `${dashboardData.daily_average?.value?.toFixed(1) || "0.0"} kg` : 
                    "0.0 kg"
                  }
                </div>
                <div className={`text-xs flex items-center gap-1 ${
                  dashboardData?.daily_average?.is_increase ? 'text-red-500' : 'text-emerald-600'
                }`}>
                  {dashboardData?.daily_average?.is_increase ? 
                    <ArrowUpRight className="w-3 h-3" /> : 
                    <ArrowDownRight className="w-3 h-3" />
                  }
                  {dashboardData?.daily_average?.percentage_change?.toFixed(1) || "0"}% {dashboardData?.daily_average?.comparison_period || "vs yesterday"}
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
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : dashboardData ? 
                    `${dashboardData.monthly_average?.value?.toFixed(1) || "0.0"} kg` : 
                    "0.0 kg"
                  }
                </div>
                <div className={`text-xs flex items-center gap-1 ${
                  dashboardData?.monthly_average?.is_increase ? 'text-red-500' : 'text-emerald-600'
                }`}>
                  {dashboardData?.monthly_average?.is_increase ? 
                    <ArrowUpRight className="w-3 h-3" /> : 
                    <ArrowDownRight className="w-3 h-3" />
                  }
                  {dashboardData?.monthly_average?.percentage_change?.toFixed(1) || "0"}% {dashboardData?.monthly_average?.comparison_period || "vs last month"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carbon Trend */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Carbon Trend</h2>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs flex items-center gap-1 px-2"
                  onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
                >
                  {timeframeLabel}
                  <ChevronDown className={`h-3 w-3 transition-transform ${showTimeframeDropdown ? 'rotate-180' : ''}`} />
                </Button>
                
                {showTimeframeDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                    {timeframeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                          timeframe === option.value ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => handleTimeframeChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Card className="border-gray-200 overflow-hidden">
              <CardContent className="p-4">
                {isLoading || isLoadingTrend ? (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Loading trend data...</p>
                  </div>
                ) : (() => {
                  const trendData = dashboardData?.carbon_trend?.[timeframe];
                  return trendData && trendData.length > 0 ? (
                    <div className="h-40">
                      {/* Simple Line Chart */}
                      <div className="relative h-full">
                        <svg className="w-full h-full" viewBox="0 0 300 160">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid" width="50" height="32" patternUnits="userSpaceOnUse">
                              <path d="M 50 0 L 0 0 0 32" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                          
                          {/* Trend line */}
                          {(() => {
                            const data = trendData;
                            const maxValue = Math.max(...data.map(d => d.value));
                            const minValue = Math.min(...data.map(d => d.value));
                            const range = maxValue - minValue || 1;
                            
                            const points = data.map((point, index) => {
                              const x = (index / Math.max(data.length - 1, 1)) * 280 + 10;
                              const y = 140 - ((point.value - minValue) / range) * 120;
                              return `${x},${y}`;
                            }).join(' ');
                            
                            return (
                              <>
                                {/* Area under curve */}
                                <path
                                  d={`M 10,140 L ${points} L ${data.length === 1 ? '10' : '290'},140 Z`}
                                  fill="rgba(16, 185, 129, 0.1)"
                                  stroke="none"
                                />
                                {/* Line */}
                                {data.length > 1 && (
                                  <polyline
                                    points={points}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                )}
                                {/* Data points */}
                                {data.map((point, index) => {
                                  const x = (index / Math.max(data.length - 1, 1)) * 280 + 10;
                                  const y = 140 - ((point.value - minValue) / range) * 120;
                                  return (
                                    <g key={index}>
                                      <circle
                                        cx={x}
                                        cy={y}
                                        r="3"
                                        fill="#10b981"
                                        stroke="white"
                                        strokeWidth="2"
                                      />
                                      {/* Labels */}
                                      <text
                                        x={x}
                                        y="155"
                                        textAnchor="middle"
                                        fontSize={data.length > 7 ? "8" : "10"}
                                        fill="#6b7280"
                                      >
                                        {point.label}
                                      </text>
                                      {/* Value labels on hover */}
                                      <text
                                        x={x}
                                        y={y - 8}
                                        textAnchor="middle"
                                        fontSize="8"
                                        fill="#10b981"
                                        className="opacity-0 hover:opacity-100 transition-opacity"
                                      >
                                        {point.value.toFixed(1)}
                                      </text>
                                    </g>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">No trend data available for {timeframeLabel.toLowerCase()}</p>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>

          {/* Emission Sources */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-gray-900">Emission Sources</h2>

            {isLoading ? (
              <div className="py-4">
                <p className="text-gray-500 text-sm text-center">Loading emission sources...</p>
              </div>
            ) : dashboardData?.emission_sources && dashboardData.emission_sources.length > 0 ? (
              dashboardData.emission_sources.map((source, index) => {
                const getSourceIcon = (sourceType: string) => {
                  switch (sourceType) {
                    case 'vehicle':
                      return (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 17H16M8 17V15M8 17L6 19M16 17V15M16 17L18 19M6 11L12 5L18 11M6 11V19H18V11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      );
                    case 'electronics':
                      return (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9.66347 17H14.3364M11.9999 3V4M18.3639 5.63604L17.6568 6.34315M21 11.9999H20M4 11.9999H3M6.34309 6.34315L5.63599 5.63604M8.46441 15.5356C6.51179 13.5829 6.51179 10.4171 8.46441 8.46449C10.417 6.51187 13.5829 6.51187 15.5355 8.46449C17.4881 10.4171 17.4881 13.5829 15.5355 15.5356L14.9884 16.0827C14.3555 16.7155 13.9999 17.5739 13.9999 18.469V19C13.9999 20.1046 13.1045 21 11.9999 21C10.8954 21 9.99995 20.1046 9.99995 19V18.469C9.99995 17.5739 9.6444 16.7155 9.01151 16.0827L8.46441 15.5356Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      );
                    case 'food':
                      return (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      );
                    default:
                      return <span className="text-lg">{source.icon}</span>;
                  }
                };

                const getSourceColor = (sourceType: string) => {
                  switch (sourceType) {
                    case 'vehicle':
                      return {
                        bg: 'bg-red-100',
                        text: 'text-red-500'
                      };
                    case 'electronics':
                      return {
                        bg: 'bg-yellow-100',
                        text: 'text-yellow-500'
                      };
                    case 'food':
                      return {
                        bg: 'bg-blue-100',
                        text: 'text-blue-500'
                      };
                    default:
                      return {
                        bg: 'bg-gray-100',
                        text: 'text-gray-500'
                      };
                  }
                };

                const colors = getSourceColor(source.source);
                const changeColor = source.is_increase ? 'text-red-500' : 'text-emerald-600';
                const changeIcon = source.is_increase ? '+' : '-';

                return (
                  <div key={index} className="border-t border-gray-200">
                    <div className="flex items-center justify-between py-3 px-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
                          <div className={colors.text}>
                            {getSourceIcon(source.source)}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{source.display_name}</p>
                          <p className="text-xs text-gray-500">{source.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-medium text-gray-900 text-sm">{source.value.toFixed(1)} kg</p>
                          <p className={`text-xs ${changeColor}`}>
                            {changeIcon}{source.percentage_change.toFixed(1)}%
                          </p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4">
                <p className="text-gray-500 text-sm text-center">No emission sources data available</p>
              </div>
            )}
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
