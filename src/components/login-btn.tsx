import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import { Button } from './ui/button'
export const loginBtn = () => {
    const {data: session} = useSession()
    if (session){
        return (
                <>
                    Signed In As {session.user?.name}
            <Button variant={'outline'} onClick={() => signOut()}>Sign Out</Button>
                </>
            )
    }else {
        return (
            <>
                Not Signed In
        <Button variant={'outline'} onClick={() => signIn()}>Sign In</Button>
            </>
        )
    }

}
