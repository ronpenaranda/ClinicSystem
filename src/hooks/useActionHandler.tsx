import { useState, useCallback } from "react";

export function useActionHandler<R>(action: (...args: any[]) => Promise<R>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<R | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setIsPending(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await action(...args);
        setResult(res);
        return res;
      } catch (err) {
        console.error("Action failed:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsPending(false);
      }
    },
    [action]
  );

  return { execute, isPending, error, result };
}