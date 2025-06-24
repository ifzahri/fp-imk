"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Car, Zap, UtensilsCrossed, Trash2, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getActivitiesByUser, deleteActivity } from "@/lib/api"
import { useAuthStore } from "@/stores/auth"
import { ActivityResponse } from "@/types/types"
import toast from "react-hot-toast"

export default function CarbonHistoryScreen() {
  const router = useRouter()
  const { user } = useAuthStore()

  const {
    data: entries,
    isLoading,
    isError,
    refetch,
  } = useQuery<ActivityResponse[]>({
    queryKey: ["userActivities", user?.id],
    queryFn: async () => {
      const response = await getActivitiesByUser(user!.id)
      return response.data // Extract the data array from the APIResponse
    },
    enabled: !!user?.id, // Only run the query if user.id is available
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vehicle":
        return Car
      case "electronics":
        return Zap
      case "food":
        return UtensilsCrossed
      default:
        return Car
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "vehicle":
        return "text-red-500 bg-red-100"
      case "electronics":
        return "text-yellow-500 bg-yellow-100"
      case "food":
        return "text-blue-500 bg-blue-100"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  const handleDeleteEntry = async (entryId: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteActivity(entryId)
        refetch() // Re-fetch data after successful deletion
        toast.success("Activity deleted successfully!")
      } catch (error) {
        console.error("Failed to delete activity:", error)
        toast.error("Failed to delete activity. Please try again.")
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    }
  }

  // Group entries by date
  const groupedEntries = (Array.isArray(entries) ? entries : []).reduce(
    (groups: Record<string, ActivityResponse[]>, entry: ActivityResponse) => {
      const date = new Date(entry.created_at).toISOString().split("T")[0] // Use created_at for date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(entry)
      return groups
    },
    {} as Record<string, ActivityResponse[]>,
  )

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedEntries).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative h-[95vh]">
          <div className="bg-white px-4 py-4 flex items-center border-b">
            <Button variant="ghost" size="icon" className="mr-3 h-8 w-8" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Carbon History</h1>
          </div>
          <div className="p-4 text-center text-gray-500">Loading carbon history...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative h-[95vh]">
          <div className="bg-white px-4 py-4 flex items-center border-b">
            <Button variant="ghost" size="icon" className="mr-3 h-8 w-8" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Carbon History</h1>
          </div>
          <div className="p-4 text-center text-red-500">Error loading carbon history.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative h-[95vh]">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center border-b">
          <Button variant="ghost" size="icon" className="mr-3 h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Carbon History</h1>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 pb-20 max-h-[calc(100vh-100px)] overflow-y-auto">
          {sortedDates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No entries found</p>
              <p className="text-sm">Start tracking your carbon footprint!</p>
            </div>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="space-y-3">
                {/* Date Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">{formatDate(date)}</h2>
                  <span className="text-xs text-gray-500">
                    {groupedEntries[date]
                      .reduce((total: number, entry: ActivityResponse) => {
                        return total + entry.carbon_output
                      }, 0)
                      .toFixed(1)}{" "}
                    kg CO₂
                  </span>
                </div>

                {/* Entries for this date */}
                <div className="space-y-2">
                  {groupedEntries[date].map((entry) => {
                    const IconComponent = getCategoryIcon(entry.source)
                    return (
                      <Card key={entry.id} className="border-gray-200 shadow-sm">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(entry.source)}`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm">{entry.source}</p>
                                <p className="text-xs text-gray-500 truncate">{entry.deskripsi}</p>
                                <p className="text-sm font-semibold text-orange-500">{entry.carbon_output.toFixed(1)} kg CO₂</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between h-full ml-2">
                              <span className="text-xs text-gray-400">{new Date(entry.created_at).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                              <div className="mt-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 hover:text-red-600"
                                  onClick={() => handleDeleteEntry(entry.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
