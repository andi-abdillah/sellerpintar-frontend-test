"use client"

import { Button } from "@/components/ui/button";
import UserInitialIcon from "@/components/ui/user-initial-icon";
import { useAuth } from "@/provider/auth-context"
import Link from "next/link";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto mt-10 p-6 rounded-md text-center space-y-6">
        <h2 className="text-xl font-bold text-gray-800">User Profile</h2>
        <div className="flex justify-center">
          <UserInitialIcon username={user?.username} size={60} />
        </div>
        <div className="space-y-3 text-base">
          <div className="flex justify-between items-center p-3 bg-gray-100 border border-slate-200 rounded-md">
            <div className="flex justify-between font-semibold w-1/3">Username<span>:</span></div>
            <div className="flex-1 text-center">{user?.username}</div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-100 border border-slate-200 rounded-md">
            <div className="flex justify-between font-semibold w-1/3">Role<span>:</span></div>
            <div className="flex-1 text-center">{user?.role}</div>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link
            href="/admin/dashboard"
          >
            Back to dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default UserProfile