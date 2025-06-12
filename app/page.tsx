import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowRight, Shield, Users, TrendingDown } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-emerald-600">JejaKarbon</CardTitle>
          <p className="text-gray-600 mt-2">Track, reduce, and offset your carbon footprint</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Daily Challenges</h3>
                <p className="text-xs text-gray-600">Complete eco-friendly tasks</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Track Progress</h3>
                <p className="text-xs text-gray-600">Monitor your carbon footprint</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Join Community</h3>
                <p className="text-xs text-gray-600">Connect with eco-warriors</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-4">
            <Link href="/register">
              <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <div></div>

            <Link href="/login">
              <Button
                variant="outline"
                className="w-full h-12 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium text-base"
              >
                I already have an account
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our <br></br>
              <span className="text-emerald-600 underline">Terms of Service</span> and{" "}
              <span className="text-emerald-600 underline">Privacy Policy</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
