import { useAuthContext } from "./UseAuthContext";
import { useState, Dispatch } from "react";
import ax from 'axios'
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAuthContext()

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const res = await fetch("http://105.106.127.100:5001/api/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
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
  return {login, error, loading}
};