import { useCallback, useState } from "react";

export function useActionHandler<Args extends unknown[], R>(
  action: (...args: Args) => Promise<R>,
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<R | null>(null);

  const execute = useCallback(
    async (...args: Args) => {
      setIsPending(true);
      setError(null);

      try {
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
    [action],
  );

  return { execute, isPending, error, result };
}
