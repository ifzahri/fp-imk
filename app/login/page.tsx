"use client"

import { withAuth } from "@/hooks/with-auth";
import LoginScreen from "@/components/login-screen";

export default withAuth(LoginScreen, { requireAuth: false, redirectTo: '/home' });
