"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Car, Zap, UtensilsCrossed, Calendar } from "lucide-react" // Removed unused imports
import { useRouter } from "next/navigation"
import { addCarbonEntry } from "@/lib/api"; // Removed unused CarbonEntryData import
import { getUserIdFromJwt } from "@/lib/utils"; // Assuming this helper exists

export default function AddCarbonScreen() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState("vehicle")
  const [formData, setFormData] = useState({
    vehicleType: "Car",
    fuelType: "Gasoline",
    distance: "",
    date: "",
    notes: "",
    deskripsi: "",
    electronicsItem: "",
    durationUsage: "",
    foodItem: "",
    weight: "",
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

  const handleSaveEntry = async () => {
    setIsSaving(true);
    try {
      const userId = getUserIdFromJwt(); // Get user ID from JWT

      if (!userId) {
        alert("User not authenticated.");
        setIsSaving(false);
        return;
      }

      let entryData: any; // TODO: Refine type later

      if (activeCategory === "vehicle") {
        entryData = {
          user_id: userId,
          source: "vehicle",
          deskripsi: formData.deskripsi,
          vehicle_details: {
            fuel_type: formData.fuelType,
            distance: formData.distance ? parseFloat(formData.distance) : 0,
          },
          electrical_details: {
            item: "",
            duration_usage: 0
          },
          food_details: {
            food_item: "",
            weight: 0
          }
        };
      } else if (activeCategory === "electronics") {
        entryData = {
          user_id: userId,
          source: "electronics",
          deskripsi: formData.deskripsi,
          electrical_details: {
            item: formData.electronicsItem,
            duration_usage: formData.durationUsage ? parseFloat(formData.durationUsage) : 0,
          },
          vehicle_details: {
            fuel_type: "",
            distance: 0
          },
          food_details: {
            food_item: "",
            weight: 0
          }
        };
      } else if (activeCategory === "food") {
        entryData = {
          user_id: userId,
          source: "food",
          deskripsi: formData.deskripsi,
          food_details: {
            food_item: formData.foodItem,
            weight: formData.weight ? parseFloat(formData.weight) : 0,
          },
          vehicle_details: {
            fuel_type: "",
            distance: 0
          },
          electrical_details: {
            item: "",
            duration_usage: 0
          }
        };
      } else {
        alert("Invalid category selected.");
        setIsSaving(false);
        return;
      }

      const result = await addCarbonEntry(entryData);
      if (result.status) {
        alert(result.message); // Or use a more sophisticated notification
        router.push("/home");
      } else {
        alert(result.message || "Failed to save carbon entry.");
      }
    } catch (error: any) { // TODO: Refine error type
      console.error("Failed to save carbon entry:", error);
      alert(error?.response?.data?.message || "An error occurred while saving the entry.");
    } finally {
      setIsSaving(false);
    }
  };

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

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-gray-700 font-medium">
                  Description
                </Label>
                <Textarea
                  id="deskripsi"
                  placeholder="e.g., Daily commute to work"
                  value={formData.deskripsi}
                  onChange={(e) => handleInputChange("deskripsi", e.target.value)}
                  className="min-h-[80px] border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Electronics Form */}
          {activeCategory === "electronics" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="electronicsItem" className="text-gray-700 font-medium">
                  Item
                </Label>
                <Input
                  id="electronicsItem"
                  type="text"
                  placeholder="e.g., Laptop, Refrigerator"
                  value={formData.electronicsItem}
                  onChange={(e) => handleInputChange("electronicsItem", e.target.value)}
                  className="h-12 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="durationUsage" className="text-gray-700 font-medium">
                  Duration Usage (hours)
                </Label>
                <div className="relative">
                  <Input
                    id="durationUsage"
                    type="number"
                    placeholder="0"
                    value={formData.durationUsage}
                    onChange={(e) => handleInputChange("durationUsage", e.target.value)}
                    className="h-12 pr-12 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">hours</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-gray-700 font-medium">
                  Description
                </Label>
                <Textarea
                  id="deskripsi"
                  placeholder="e.g., Using laptop for work"
                  value={formData.deskripsi}
                  onChange={(e) => handleInputChange("deskripsi", e.target.value)}
                  className="min-h-[80px] border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Food Form */}
          {activeCategory === "food" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="foodItem" className="text-gray-700 font-medium">
                  Food Item
                </Label>
                <Input
                  id="foodItem"
                  type="text"
                  placeholder="e.g., Organic, Meat, Dairy"
                  value={formData.foodItem}
                  onChange={(e) => handleInputChange("foodItem", e.target.value)}
                  className="h-12 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-700 font-medium">
                  Weight (kg)
                </Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="h-12 pr-12 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">kg</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-gray-700 font-medium">
                  Description
                </Label>
                <Textarea
                  id="deskripsi"
                  placeholder="e.g., Disposing weekly organic waste"
                  value={formData.deskripsi}
                  onChange={(e) => handleInputChange("deskripsi", e.target.value)}
                  className="min-h-[80px] border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSaveEntry}
            disabled={isSaving} // Disable when saving
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base mt-8"
          >
            {isSaving ? "Saving..." : "Save Entry"}
          </Button>
        </div>
      </div>
    </div>
  )
}
