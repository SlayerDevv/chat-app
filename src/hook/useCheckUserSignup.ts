import { useAuthContext } from "./UseAuthContext";
import { useState, Dispatch } from "react";
import ax from 'axios'
import { useRouter } from "next/navigation";
export const useCheckUserSignup = () => {
    const router = useRouter();
  const [SignupError, setError] = useState(null);
  const [Signuploading, setLoading] = useState(false);
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
      router.push("/signup");
        }

    if (res.ok) {
    router.push('/')
    setLoading(false);
    setError(null);
    }
  };
  return {checkuser, SignupError, Signuploading}
};