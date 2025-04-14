"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      setToken(data.token);
      localStorage.setItem("token", data.token);
      console.log("Login successful. Token:", data.token);

      // Redirect to admin dashboard or home
      router.push("/admin/dashboard"); // adjust route accordingly
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1111110e] min-h-[70svh] w-[80svw] mx-auto rounded-xl shadow-xl p-6 mt-10">
      <h1 className="capitalize text-4xl !font-bold styled-font text-center py-3  rounded-lg mb-6">
        Admin Login
      </h1>

      <div className="bg-white bg-opacity-70 rounded-lg p-6 max-w-md mx-auto">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {token && (
            <div className="mt-3 text-green-700 font-medium text-sm">
              Logged in successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;