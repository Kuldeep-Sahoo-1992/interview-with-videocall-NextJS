"use client"
import LoaderUI from '@/components/LoaderUI'
import useUserRole from '@/hooks/useUserRole'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import InterviewScheduleUI from './InterviewScheduleUI'

const Schedule = () => {
  const router=useRouter()
  const { isInterviewer, isLoading } = useUserRole()
  
 useEffect(() => {
   if (!isInterviewer) {
     router.push("/");
   }
 }, [isInterviewer]); // ✅ Runs after render, avoiding the warning

 if (isLoading) return <LoaderUI />;
 if (!isInterviewer) return null;
  return (
    <InterviewScheduleUI/>
  )
}

export default Schedule