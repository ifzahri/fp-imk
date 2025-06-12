"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Car, Zap, UtensilsCrossed, Calendar, Home, BarChart3, Plus, Award, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddCarbonScreen() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("vehicle")
  const [formData, setFormData] = useState({
    vehicleType: "Car",
    fuelType: "Gasoline",
    distance: "",
    date: "",
    notes: "",
  })

  const categories = [
    { id: "vehicle", label: "Vehicle", icon: Car },
    { id: "electronics", label: "Electronics", icon: Zap },
    { id: "food", label: "Food", icon: UtensilsCrossed },
  ]

  const vehicleTypes = ["Car", "Bus", "Train", "Motorcycle", "Bicycle"]
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "CNG"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveEntry = () => {
    console.log("Saving entry:", { category: activeCategory, ...formData })
    // Save to backend here
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center border-b">
          <Button variant="ghost" size="icon" className="mr-3 h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Add Carbon Usage</h1>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 pb-20">
          {/* Category Tabs */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "secondary"}
                size="sm"
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  activeCategory === category.id
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Vehicle Form */}
          {activeCategory === "vehicle" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="text-gray-700 font-medium">
                  Vehicle Type
                </Label>
                <select
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange("vehicleType", e.target.value)}
                  className="w-full h-12 px-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType" className="text-gray-700 font-medium">
                  Fuel Type
                </Label>
                <select
                  id="fuelType"
                  value={formData.fuelType}
                  onChange={(e) => handleInputChange("fuelType", e.target.value)}
                  className="w-full h-12 px-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {fuelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance" className="text-gray-700 font-medium">
                  Distance (km)
                </Label>
                <div className="relative">
                  <Input
                    id="distance"
                    type="number"
                    placeholder="0.0"
                    value={formData.distance}
                    onChange={(e) => handleInputChange("distance", e.target.value)}
                    className="h-12 pr-12 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700 font-medium">
                  Date
                </Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="h-12 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-700 font-medium">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="min-h-[80px] border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Electronics Form Placeholder */}
          {activeCategory === "electronics" && (
            <div className="text-center py-8 text-gray-500">
              <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Electronics tracking form coming soon!</p>
            </div>
          )}

          {/* Food Form Placeholder */}
          {activeCategory === "food" && (
            <div className="text-center py-8 text-gray-500">
              <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Food tracking form coming soon!</p>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSaveEntry}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base mt-8"
          >
            Save Entry
          </Button>
        </div>
      </div>
    </div>
  )
}
