import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { APPNAME } from "@/lib/consts";
import { formatInitials } from "@/lib/formatters";
import { getProfileByUserSub } from "@/lib/profiles";
import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";
import { ReactNode } from "react";

async function getUserProfile() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data) {
    return getProfileByUserSub(data?.user?.id as string);
  }
  return null;
}


export default async function ProfileLayout({ children }: { children: ReactNode[] }) {
  const profile = await getUserProfile();
  return (
    <div className="mx-24 my-12">
      <div className="flex items-center gap-4 mb-12">
        <Avatar className="h-[48px] w-[48px]">
          <AvatarImage src={profile?.avatar || ""} alt={`${profile?.givenName} ${profile?.familyName}`} />
          <AvatarFallback>{formatInitials([profile?.givenName as string, profile?.familyName as string])}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold text-lg">{profile?.givenName} {profile?.familyName}</h1>
          <h2 className="font-dimmed text-sm mb-2">{profile?.email}</h2>
          <p className="text-sm font-medium">&#9733;4.75</p>
        </div>
      </div>
      <div className="flex gap-8">
        <Card className="w-[280px]">
          <CardHeader>
            Edit your profile
            <CardDescription>This is what others will see when they interact with you on {APPNAME}</CardDescription>
          </CardHeader>
          <CardContent>
            <nav className="flex flex-col gap-4">
              <Button variant="secondary">Personal Information</Button>
              <Button variant="secondary">Renter&apos;s Application</Button>
              <Button variant="secondary">Preferences</Button>
              <Button variant="secondary">Payment History</Button>
              <Button variant="secondary">Notifications</Button>
              <Button variant="secondary">Messages</Button>
            </nav>
          </CardContent>
        </Card>
        <main className="mt-4">
          {children}
        </main>
      </div>
    </div>
  )
}