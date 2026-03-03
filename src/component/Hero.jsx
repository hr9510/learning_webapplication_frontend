"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Account from '@/app/Account/page'
import { GetCourses, refreshingToken } from './Fetching'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [course, setCourse] = useState(null) // null initially
  const [hydrated, setHydrated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  setHydrated(true)

    const getData = async () => {
    try {
      let data = await GetCourses()
      if (data === "ACCESS_TOKEN_EXPIRED") {
        const res = await refreshingToken()
        setCourse[null]
        if (res == "GOOD") {
          alert("Token renewed")
        }
       data = await GetCourses()
      }
      
      if (Array.isArray(data)) {
        setCourse(data)
      } else {
        setCourse(null)
      }
    } catch (err) {
      console.error(err)
      setCourse([])
    } finally {
      setLoading(false)
    }
  }
console.log(course)
  getData()
}, [])

  if (!hydrated) return null
  if (loading) return <div className="my-10 text-center">Loading...</div>

  return (
    <main>
      {course ?<div className='flex items-center justify-center my-10'>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {course.map((item, idx) => (
              <Link
                href={`/courses/courseDetails/course-${item.id || idx + 1}`}
                key={idx}
                className="h-[180px] w-[300px] rounded-xl bg-white shadow-md 
                 flex flex-col items-center justify-start overflow-hidden 
                 font-bold hover:h-[220px] hover:shadow-xl 
                 transition-all duration-300"
              >
                <img
                  src={item.imgLink}
                  alt={item.title}
                  className="min-h-[180px] w-full object-cover"
                />
                <span className='p-2'>{item.title}</span>
              </Link>
            ))}
          </div>
        </div> : <Account />}
        
        
    </main>
  )
}
