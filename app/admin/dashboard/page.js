'use client';
import React, {useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin"); // Redirect to login page
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin"); // adjust to your login route
  };

  return (
    <>
      <div className="bg-[#1111110e] min-h-[70svh] w-[80svw] mx-auto rounded-xl shadow-xl p-6 mt-10">
        <h1 className="capitalize text-4xl !font-bold styled-font text-center py-3 rounded-lg mb-6">
          Admin Dashboard
        </h1>
        <div className="flex flex-col">
          <Link
            href="/admin/movies"
            className="hover:bg-gray-500 text-lg p-4 m-2 rounded-full text-center bg-gray-400 text-white !font-semibold styled-font"
          >
            Update / Delete posted Movies
          </Link>
          <Link
            href="/admin/new-movie"
            className="hover:bg-gray-500 text-lg p-4 m-2 rounded-full text-center bg-gray-400 text-white !font-semibold styled-font"
          >
            POST new Movies
          </Link>
          <Link
            href="/admin/change-password"
            className="hover:bg-gray-500 text-lg p-4 m-2 rounded-full text-center bg-gray-400 text-white !font-semibold styled-font"
          >
            Change your Password
          </Link>
          <button
            onClick={handleLogout}
            className="hover:bg-gray-500 text-lg p-4 m-2 rounded-full text-center bg-gray-400 text-white !font-semibold styled-font"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default page;