import { APPNAME } from "@/lib/consts";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { Button } from "../ui/button";

export default function NavBar({ user }: { user: any }) {
  return (
    <div className="px-6 h-[60px] flex items-center justify-between border-b">
      <Button asChild variant="ghost" className="font-bold text-lg">
        <Link href="/">
          {APPNAME}
        </Link>
      </Button>
      <UserMenu user={user} />
    </div>
  );
}
