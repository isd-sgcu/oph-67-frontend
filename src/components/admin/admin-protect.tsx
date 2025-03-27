import React from 'react'

import { LiffError } from '@/components/liff/liff-error'
import { LiffLoading } from '@/components/liff/liff-loading'
import { useAuth } from '@/hooks/use-auth'

interface AdminProtectProps {
  children: React.ReactNode
}

const AdminProtect: React.FC<AdminProtectProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LiffLoading />
  }

  if (user?.role !== 'admin') {
    return <LiffError error='You are not authorized to access this page.' />
  }

  return children
}

export default AdminProtect
