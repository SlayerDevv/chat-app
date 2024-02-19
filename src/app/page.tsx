"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { io } from 'socket.io-client';
import { useEffect, useState } from'react';
import { loginBtn } from '@/components/login-btn';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      loginBtn: any;
    }
  }
}
export default function Home(){
  return (
    <div className='flex relative h-screen justify-center items-center'>
      <Card className=''>
        <CardHeader>
          <CardTitle>Welcome to Chat App</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Please Write Your Name to continue to chat
          </CardDescription>
          <Input id="input" type="text" placeholder='Write Your Name' className='my-2' />
        </CardContent>
        <CardFooter>
          <loginBtn></loginBtn>
        </CardFooter>
      </Card>
    </div>
  )

}