import React, { useState } from 'react'
import { toast } from "sonner";

type AsyncCallback<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;

function useFetch<TArgs extends any[] = any[], TResult = any>(cb: AsyncCallback<TArgs, TResult>) {

  const [data, setData] = useState<TResult | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: TArgs) => {
    setLoading(true);
    setError(null);

    try {
        const response = await cb(...args);
        setData(response);
        setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        toast.error(err.message);
      } else {
        setError(new Error("Unknown error"));
        toast.error("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }
  
  return { data, loading, error, fn, setData };
}

export default useFetch