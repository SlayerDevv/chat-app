import React from 'react'
import { Button } from './ui/button'
import { useLogOut } from '@/hook/useLogOut'
import { useAuthContext } from '@/hook/UseAuthContext'
import {useRouter} from 'next/navigation'
export const Navbar = () => {
  const router = useRouter()
  const { state } = useAuthContext()
  const {logout} = useLogOut()
  const handleClick = () => {
    logout()
  }
  return (
    <nav className='flex w-full top-0 left-0 items-center justify-between p-3'>
          
            <h1 className='text-xl '>Chat App</h1>
            {state.user && (
              <div className='flex items-center space-x-3'>
                <span className='font-medium'>You are Logged As {state.user.username}</span>
                <Button onClick={() =>handleClick()}>Logout</Button>
              </div>
            )}
            {!state.user && (
              <div className='flex space-x-3'>
                <Button onClick={() => router.push('/login')}>Login</Button>
                <Button onClick={() => router.push('/signup')}>SignUp</Button>
              </div>
            )}
    </nav>
  )
}
