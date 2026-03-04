"use client";

import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  function logout() {
    document.cookie = "auth=; Max-Age=0; path=/";
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
