"use client"
import { handleLogout } from '@/component/Fetching'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutPage() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => handleLogout(router)}
        className="px-6 py-2 font-semibold text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
