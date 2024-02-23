"use client"
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { FormEvent, FormEventHandler, useEffect, useState } from'react';
import { useRouter } from 'next/navigation';
import {Label} from '@/components/ui/label'
import {useLogin} from '@/hook/useLogin'
import {useCheckUserLogin} from '@/hook/useCheckUserLogin'
import { Alert } from '@/components/ui/alert';
import { useAuthContext } from '@/hook/UseAuthContext'
export default  function Login(){
  const {state} = useAuthContext()
  const router = useRouter();
  const {checkuser, Loginloading, loginError} = useCheckUserLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, loading, error} = useLogin();

  const check = async() => {
    await checkuser(state.user?.tk)
  }
  useEffect(() => {
    check()
  }, [state.user?.tk])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     await login(email, password);
     
     if (error){
      console.log(error);
     }

     router.push('/')


  }

if (Loginloading && loginError){
  return (
    <div className='flex relative top-28 justify-center'>
          <form className='fixed space-y-3 bg-gray-900/15 p-5 rounded-lg' onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <Label htmlFor="email" className=''>Email</Label>
          <Input id="input" type="text" placeholder='me@email.com' onChange={(e) => setEmail(e.target.value)} value={email} className='my-2' />
          <Label htmlFor="email" className=''>Password</Label>
          <Input id="input" type="text" placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} value={password} className='my-2'/>
          <Button disabled={loading} variant={'default'}>Login</Button>
          <a href="/signup" className='text-sm pl-28 hover:text-blue-600'>SignUp</a>
          {error && <Alert className='' variant={'destructive'} >{error}</Alert>}
          </form>
    </div>
  )

}
}