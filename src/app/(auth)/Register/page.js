"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit with axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = "https://api.freeapi.app/api/v1/users/register";

    try {
      const { data } = await axios.post(
        url,
        {
          email: form.email,
          password: form.password,
          role: form.role,
          username: form.username,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setMessage(" Registration Successful!");

        // Reset form
        setForm({
          username: "",
          email: "",
          password: "",
          role: "USER",
        });

        // Redirect after delay
        setTimeout(() => {
          router.push("/Login");
        }, 1500);
      } else {
        setMessage(` ${data.message || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.response?.data?.message) {
        setMessage(` ${error.response.data.message}`);
      } else {
        setMessage(" Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition-all ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.startsWith("") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/Login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
