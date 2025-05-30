"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  size?: number;
  children?: React.ReactNode;
}

const BackButton = ({ className = "", size = 20, children }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
      onClick={() => router.back()}
    >
      <ArrowLeft size={size} />
      {children}
    </button>
  );
};

export default BackButton;
