"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  size?: number;
}

const BackButton = ({ className = "", size = 20 }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`cursor-pointer ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
      onClick={() => router.back()}
    >
      <ArrowLeft size={size} />
    </button>
  );
};

export default BackButton;
