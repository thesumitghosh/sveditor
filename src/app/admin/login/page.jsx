"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    // STATIC AUTH
    if (username === "adminsv" && password === "Mail@123456") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/editor");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4">
      <div className="w-full max-w-md">

        {/* BRAND */}
        <div className="text-center mb-6">
          <img
            src="https://www.studyvarsity.com/icons/cropped-S-150x150.png"
            alt="Brand Logo"
            className="mx-auto  mb-3"
            width={100}
            height={100}
          />
          <p className="text-gray-600 text-sm">
            STUDY VARSITY
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="password"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>

        {/* FOOTER */}
        {/* <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} YourBrand · Admin Panel
        </p> */}
      </div>
    </div>
  );
}
