"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DefaultPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/articles");
  }, [router]);

  return null;
};

export default DefaultPage;
