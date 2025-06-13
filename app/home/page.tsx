"use client"

import { withAuth } from "@/hooks/with-auth";
import HomeScreen from "@/components/home-screen";

export default withAuth(HomeScreen);
