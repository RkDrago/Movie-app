"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users/change-password", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: currentPassword, newPassword: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to change password.");
        return;
      }

      setMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-[#1111110e] min-h-[70svh] w-[80svw] mx-auto rounded-xl shadow-xl p-6 mt-10">
      <h1 className="capitalize text-4xl font-bold styled-font text-center py-3 rounded-lg mb-6">
        Change Password
      </h1>

      <form
        onSubmit={handlePasswordChange}
        className="bg-white max-w-md mx-auto p-6 rounded-md shadow-md space-y-4"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Current password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">New password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Confirm new password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Change Account Password
        </button>

        {message && (
          <p className="text-center mt-2 text-sm font-medium text-red-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;
