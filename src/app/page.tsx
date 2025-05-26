import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-yellow-500 text-xl">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
