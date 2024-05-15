import { formatInitials } from "@/lib/formatters";
import { getProfileByUserSub } from "@/lib/profiles";
import { createClient } from "@/utils/supabase/server"
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <h2>Test Page</h2>
    </div>
  )
}