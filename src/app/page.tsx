"use client"
import Image from "next/image";
import { Navbar } from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuthContext } from '@/hook/UseAuthContext'
import { useRouter } from 'next/navigation';
import {useCheckUser} from '@/hook/useCheckUser'
export default function Chat() {
  const {checkuser, error, loading} = useCheckUser()
    const router = useRouter();
    const {state} = useAuthContext();
    const check = async() => {
      await checkuser(state.user?.tk)
    }
    useEffect(() => {
      check()
    }, [state.user?.tk])
  
    // Handle loading state

  
    // Handle error state
   

 
  const socket = io("http://105.109.200.129:5001", {
    transports: ['websocket', 'polling', 'flashsocket'],
    auth: {
      token: state.user?.tk
    }
  });
  useEffect(() => {
    socket.on('chat message', (data) => {
        appendMessage(data);
        EnterSendMessage()

    })
  }, [])

  function appendMessage(message: string) {
    const ul = document.getElementById("ul") as HTMLUListElement;
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.className = "text-xs";
    span.textContent = state.user.username
    const li = document.createElement("li");
    li.className = "bg-zinc-400 w-fit p-[6px] rounded-lg text-sm";
    li.textContent = message;
    div.appendChild(span)
    div.appendChild(li)
    ul.appendChild(div)
    
  }

  function sendMessage() {
    const input = document.getElementById("message") as HTMLInputElement;
    const message = input.value.trim();
    if (message !== "") {
      appendMessage(message); // Append the message on sender's side
      socket.emit("chat message", { user: state.user.username, message: message });
      input.value = "";
    }
  }

  function EnterSendMessage(){
    const input = document.getElementById("message") as HTMLInputElement;
    input.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
          sendMessage();
        }
    })
  }
  if (!loading && !error){
  return (
    <>
      <Navbar />
      <main className="flex justify-center">
        <div className="w-[1000px] h-[500px] border-[3px] border-solid rounded-md">
          <div className="flex h-[420px] overflow-y-auto w-[996px] scroll-m-3">
            <ul className="flex-1 mt-5 ml-3 space-y-4 flex-col" id="ul">

            </ul>
          </div>
          <div className="flex block bg-white bottom-[41px] justify-between w-fit p-4 space-x-5">
            <Input id="message" className="w-[850px] rounded-lg h-10" placeholder="Write A message for the group" />
            <Button className="w-[80px] text-lg  h-10 rounded-lg" onClick={() => sendMessage()}  variant={'outline'}>Send</Button>
          </div>
        </div>
      </main>
    </>
  );
}
}
