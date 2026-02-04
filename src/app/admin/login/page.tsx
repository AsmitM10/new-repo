"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

type AuthState = "login" | "signup" | "verify" | "reset" | "success"

export default function AdminLogin() {
  const [authState, setAuthState] = useState<AuthState>("login")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const [rememberPassword, setRememberPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // Simple admin validation - in real app, this would be server-side
    if (email === "admin@brightstarfitness.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      localStorage.setItem("adminEmail", email)
      if (rememberPassword) {
        localStorage.setItem("adminRememberMe", "true")
      }
      router.push("/admin")
    } else {
      setError("Invalid email or password")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !username || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    localStorage.setItem("adminAuth", "true")
    localStorage.setItem("adminEmail", email)
    localStorage.setItem("adminUsername", username)
    router.push("/admin")
  }

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join("")

    if (code.length !== 5) {
      setError("Please enter the complete verification code")
      return
    }

    localStorage.setItem("adminAuth", "true")
    localStorage.setItem("adminEmail", email)
    router.push("/admin")
  }

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    localStorage.setItem("adminAuth", "true")
    localStorage.setItem("adminEmail", email)
    router.push("/admin")
  }

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${authState}-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${authState}-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-700/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-teal-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-teal-800/20 rounded-full blur-xl"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Login Form */}
        {authState === "login" && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Login as an admin</h1>
              <p className="text-gray-600 text-sm">Please enter your email and password to continue</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 text-black border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="esteban_schiller@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-500 text-black border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember Password</span>
              </label>
              <button
                type="button"
                onClick={() => setAuthState("reset")}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Forgot Password?
              </button>
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Login
            </button>

            <div className="text-center">
              <span className="text-gray-600 text-sm">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setAuthState("signup")}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Form */}
        {authState === "signup" && (
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Create an admin account</h1>
              <p className="text-gray-600 text-sm">Create an account to continue</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 text-black border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="esteban_schiller@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 text-black border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 text-black border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                <span className="ml-2 text-sm text-gray-600">Remember Password</span>
              </label>
              <button
                type="button"
                onClick={() => setAuthState("reset")}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Forgot Password?
              </button>
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Sign Up
            </button>

            <div className="text-center">
              <span className="text-gray-600 text-sm">Already have an account? </span>
              <button
                type="button"
                onClick={() => setAuthState("login")}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Login
              </button>
            </div>
          </form>
        )}

        {/* Email Verification */}
        {authState === "verify" && (
          <form onSubmit={handleVerification} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h1>
              <p className="text-gray-600 text-sm">
                We sent a reset link to contact@discode...com enter 5 digit code that mentioned in the email
              </p>
            </div>

            <div className="flex justify-center gap-3">
              {verificationCode.map((digit, index) => (
                <div key={index} className="flex flex-col items-center">
                  <label htmlFor={`code-${authState}-${index}`} className="sr-only">
                    Verification code digit {index + 1}
                  </label>
                  <input
                    id={`code-${authState}-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeInput(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="0"
                    title={`Verification code digit ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Verify Code
            </button>

            <div className="text-center">
              <span className="text-gray-600 text-sm">Haven't got the email yet? </span>
              <button type="button" className="text-teal-600 hover:text-teal-700 font-medium">
                Resend email
              </button>
            </div>
          </form>
        )}

        {/* Password Reset */}
        {authState === "reset" && (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Set a new password</h1>
              <p className="text-gray-600 text-sm">
                Create a new password. Ensure it differs from previous ones for security
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••"
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Update Password
            </button>

            <div className="text-center">
              <span className="text-gray-600 text-sm">Haven't got the email yet? </span>
              <button type="button" className="text-teal-600 hover:text-teal-700 font-medium">
                Resend email
              </button>
            </div>
          </form>
        )}

        {/* Success State */}
        {authState === "success" && (
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Successful</h1>
              <p className="text-gray-600 text-sm">
                Congratulations! Your account has been created successfully. Redirecting to dashboard...
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.setItem("adminAuth", "true")
                localStorage.setItem("adminEmail", email)
                router.push("/admin")
              }}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
