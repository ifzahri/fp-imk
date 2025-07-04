/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { loginUser } from "@/lib/api"
import { useAuthStore } from "@/stores/auth"
import toast from "react-hot-toast"

export default function LoginScreen() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

const handleLogin = async () => {
  setIsLoading(true)
  try {
    const result = await loginUser(formData.email, formData.password)
    if (result.status) {
      setAuth({ token: result.data.token, role: result.data.role, user: result.data.user })
      router.push("/home")
    } else {
      toast.error(result.message)
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Login failed.")
  } finally {
    setIsLoading(false)
  }
}


  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log("Google login clicked")
    // For demo purposes, redirect to home
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white shadow-lg">
        <CardHeader className="text-center pb-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-normal text-gray-900">Welcome to</h1>
            <CardTitle className="text-3xl font-bold text-emerald-600">JejaKarbon</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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
                placeholder="Your password"
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

          {/* <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">
              Forgot Password
            </Link>
          </div> */}

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium text-base"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          {/* <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 border-gray-200 hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-medium"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? "Please wait..." : "Continue with Google"}
          </Button> */}

          <div className="text-center text-sm text-gray-600 mt-6">
            {"Don't have an account? "}
            <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
