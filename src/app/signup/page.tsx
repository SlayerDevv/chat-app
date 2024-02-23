"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { io } from 'socket.io-client';
import { FormEvent, useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ax from 'axios'
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label'
import {useSignUp} from '@/hook/useSignUp'
import {useAuthContext} from '@/hook/UseAuthContext'
import {useCheckUserSignup} from '@/hook/useCheckUserSignup'
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {signUp, loading, error} = useSignUp();
  const {checkuser, SignupError, Signuploading} = useCheckUserSignup()
  const {state} = useAuthContext();
  const router = useRouter();

  const check = async() => {
    await checkuser(state.user?.tk)
  }
  useEffect(() => {
    check()
  }, [state.user?.tk])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(username, email, password);

    if (error){
      console.log(error);
    }
    router.push('/login')
      
  }
  if (Signuploading && SignupError){
  return (

    <div className='flex relative top-28 justify-center '>
      <form  onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className='fixed space-y-3 bg-gray-900/15 p-5 rounded-lg'>
        <div>
          <Label htmlFor="username" className=''>Username</Label>
          <Input  onChange={(e) => setUsername(e.target.value)} value={username} id="username" type="text"  placeholder='Your Username' className='my-2' />
        </div>
        <div>
          <Label htmlFor="email" className=''>Email</Label>
          <Input  onChange={(e) => setEmail(e.target.value)} value={email}  id="email" type="text"  placeholder='me@email.com' className='my-2' />
        </div>
        <div>
          <Label htmlFor="password" className=''>Password</Label>
          <Input  onChange={(e) => setPassword(e.target.value)} value={password} id="password"  type="text" placeholder='Your Password' className='my-2' maxLength={50} minLength={5} />
        </div>
        <Button disabled={loading} variant={'default'} >SignUp</Button>
        <a href="/login" className='text-sm pl-28 hover:text-blue-600'>Login</a>
        {error && <Alert className='' variant={'destructive'} >{error}</Alert>}
      </form>
    </div>

  )

}
}