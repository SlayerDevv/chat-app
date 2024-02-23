import { useAuthContext } from "./UseAuthContext";
import { useState, Dispatch } from "react";
import ax from 'axios'
import { useRouter } from "next/navigation";
export const useCheckUserLogin = () => {
    const router = useRouter();
  const [loginError, setError] = useState(null);
  const [Loginloading, setLoading] = useState(false);
  const dispatch = useAuthContext()

  const checkuser = async (token: string) => {
    setLoading(true);
    setError(null);

    const res = await fetch("http://105.106.127.100:5001/",{
            method: "GET",
            headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`},
    

    });
    
    const json = await res.json();
    if (!res.ok) {
      setLoading(true);
      setError(json.error);
      router.push("/login");
        }

    if (res.ok) {
    router.push('/')
    setLoading(false);
    setError(null);
    }
  };
  return {checkuser, loginError, Loginloading}
};