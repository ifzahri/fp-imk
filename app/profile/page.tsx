"use client"

import { withAuth } from "@/hooks/with-auth";
import ProfileScreen from "@/components/profile-screen";

export default withAuth(ProfileScreen);
