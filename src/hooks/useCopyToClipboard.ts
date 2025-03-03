import { useState } from "react";

interface CopyStatus {
  success: boolean;
  error: string | null;
}

const useCopyToClipboard = (): [
  (text: string) => Promise<void>,
  CopyStatus
] => {
  const [status, setStatus] = useState<CopyStatus>({
    success: false,
    error: null,
  });

  const copy = async (text: string): Promise<void> => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API is not supported in this browser");
      }

      await navigator.clipboard.writeText(text);
      setStatus({ success: true, error: null });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setStatus({ success: false, error: errorMessage });
    }
  };

  return [copy, status];
};

export default useCopyToClipboard;
