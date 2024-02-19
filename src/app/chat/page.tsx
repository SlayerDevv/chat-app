"use client"
import Image from "next/image";
import { Navbar } from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useEffect } from "react";
export default function Chat() {
  const socket = io("http://105.110.219.200:5001");
  useEffect(() => {
    socket.off('chat message');
    socket.on('chat message', (data) => {
      if (data.user !== "User") {
        appendMessage(data);
      }
    })
  }, [])

  function appendMessage(message: string) {
    const ul = document.getElementById("ul") as HTMLUListElement;
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.className = "text-xs";
    span.textContent = "User";
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
      socket.emit("chat message", { user: "User", message: message });
      input.value = "";
    }
  }

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
            <Button className="w-[80px] text-lg  h-10 rounded-lg" onClick={() => sendMessage()} variant={'outline'}>Send</Button>
          </div>
        </div>
      </main>
    </>
  );
}
