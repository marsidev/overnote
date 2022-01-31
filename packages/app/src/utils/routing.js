import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function RequireAuth({ isAuthenticated }) {
  return !isAuthenticated ? <Navigate to='/login' /> : <Outlet />
}

export function RequireNoAuth({ isAuthenticated }) {
  return isAuthenticated ? <Navigate to='/' /> : <Outlet />
}

export default RequireAuth
