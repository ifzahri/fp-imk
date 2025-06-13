"use client"

import { withAuth } from "@/hooks/with-auth";
import DailyChallengeScreen from "@/components/daily-challenge-screen";

export default withAuth(DailyChallengeScreen);
