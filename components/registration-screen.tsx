"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { registerUser } from "@/lib/api"
import toast from "react-hot-toast"

export default function RegistrationScreen() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telp_number: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSignUp = async () => {
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!")
      setIsLoading(false)
      return
    }

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields!")
      setIsLoading(false)
      return
    }

    try {
      const result = await registerUser(formData.name, formData.email, formData.password, formData.telp_number);
      if (result.status) {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error?.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold text-emerald-600">Register Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-600 font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telp_number" className="text-gray-600 font-medium">
              Telephone Number
            </Label>
            <Input
              id="telp_number"
              type="tel"
              placeholder="Your telephone number"
              value={formData.telp_number}
              onChange={(e) => handleInputChange("telp_number", e.target.value)}
              className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 pr-12"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-600 font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter the password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 pr-12"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium text-base mt-8"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
          <div className="text-center text-sm text-gray-600 mt-6">
            {"Already have an account? "}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
              Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
