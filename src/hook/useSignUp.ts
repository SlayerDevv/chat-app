import { useAuthContext } from "./UseAuthContext";
import { useState, Dispatch } from "react";
import ax from 'axios'
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAuthContext()

  const signUp = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    const res = await fetch("http://105.106.127.100:5001/api/signup",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,

              }),
          
    });
    
    const json = await res.json();
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
        }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
       dispatch.dispatch({ type: "LOGIN", payload: json });
       setLoading(false);
    }
  };
  return {signUp, error, loading}
};