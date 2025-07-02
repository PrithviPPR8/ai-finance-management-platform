import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-4 ml-2">
      Welcome to AI Finance Platform
      <Button variant="destructive" className="ml-4 cursor-pointer">Subscribe!</Button>
    </div>
  );
}
