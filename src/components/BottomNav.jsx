"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Clock,
  Users,
  Settings,
} from "lucide-react";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/analytics",
    },
    {
      name: "Pending",
      icon: Clock,
      path: "/admin/posts",
    },
    {
      name: "Posts",
      icon: FileText,
      path: "/admin/postsall",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-2xl flex justify-between px-4 py-2 z-50">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = pathname === item.path;

        return (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center text-xs transition-all duration-300 relative ${
              active
                ? "text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {/* Active Glow Background */}
            {active && (
              <span className="absolute -top-2 w-10 h-10 bg-black/10 rounded-full blur-lg"></span>
            )}

            <Icon
              size={20}
              className={`transition-all duration-300 ${
                active ? "scale-110" : ""
              }`}
            />
            <span className="mt-1 font-medium">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}