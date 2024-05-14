import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatInitials } from "@/lib/formatters";
import { getProfileByUserSub } from "@/lib/profiles";
import { createClient } from "@/utils/supabase/server"
import Link from "next/link";

async function getUserProfile() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data) {
    return getProfileByUserSub(data?.user?.id as string);
  }
  return null;
}

export default async function Profile() {
  const profile = await getUserProfile();
  return (
    <div className="min-h-[calc(100vh-60px)] mt-12 mx-24 flex relative">
      <aside className="sticky top-4 h-full">
        <Card className="p-4 flex flex-col">
          <CardHeader className="flex flex-col items-center gap-4">
            <Avatar className="h-[48px] w-[48px]">
              <AvatarImage src={profile?.avatar || ""} alt={`${profile?.givenName} ${profile?.familyName}`} />
              <AvatarFallback>{formatInitials([profile?.givenName as string, profile?.familyName as string])}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="font-bold text-lg">{profile?.givenName} {profile?.familyName}</h1>
              <h2 className="font-dimmed text-sm">{profile?.email}</h2>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/">View my Renter&apos;s Profile</Link>
            <Link href="/">Preferences</Link>
          </CardContent>
        </Card>
      </aside>
      <main className="h-[1000px]">
        Test
      </main>
    </div>
  )
}