import { APPNAME } from "@/lib/consts";
import UserMenu from "./UserMenu";

export default function NavBar({ user }: { user: any }) {
  return (
    <div className="px-6 h-[60px] flex items-center justify-between border-b">
      <h1 className="font-bold text-xl">{APPNAME}</h1>
      <UserMenu user={user} />
    </div>
  );
}
