"use client"

import { withAuth } from "@/hooks/with-auth";
import RegistrationScreen from "@/components/registration-screen";

export default withAuth(RegistrationScreen, { requireAuth: false, redirectTo: '/home' });
