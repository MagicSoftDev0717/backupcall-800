"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type MessageType = "success" | "error" | "warning" | "info";

interface MessageProps {
  type: MessageType;
  text: string;
  duration?: number; // auto-hide after ms
  onClose?: () => void;
}

export default function Message({ type, text, duration = 3000, onClose }: MessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const styles: Record<MessageType, string> = {
    success: "bg-green-50 text-green-700 border-green-300",
    error: "bg-red-50 text-red-700 border-red-300",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-300",
    info: "bg-blue-50 text-blue-700 border-blue-300",
  };

  const icons: Record<MessageType, JSX.Element> = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 shadow-md ${styles[type]}`}
    >
      {icons[type]}
      <span className="font-medium">{text}</span>
    </div>
  );
}
