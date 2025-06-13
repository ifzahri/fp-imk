// hoc/withAuth.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'

interface WithAuthOptions {
  redirectTo?: string
  requireAuth?: boolean
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { redirectTo = '/login', requireAuth = true } = options

  return function AuthenticatedComponent(props: P) {
    const router = useRouter()
    const { isAuthenticated, isLoading, user } = useAuthStore()

    useEffect(() => {
      // Don't redirect while loading
      if (isLoading) return

      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
      } else if (!requireAuth && isAuthenticated) {
        // Redirect authenticated users away from auth pages
        router.push('/home')
      }
    }, [isAuthenticated, isLoading, router])

    // Show loading state
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        </div>
      )
    }

    // Don't render protected component if not authenticated
    if (requireAuth && !isAuthenticated) {
      return null
    }

    // Don't render auth component if already authenticated
    if (!requireAuth && isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

// Hook version for use in components
export function useRequireAuth(redirectTo: string = '/login') {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  return { isAuthenticated, isLoading }
}

// Hook for redirecting authenticated users
export function useRedirectIfAuthenticated(redirectTo: string = '/home') {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  return { isAuthenticated, isLoading }
}