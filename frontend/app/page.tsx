"use client";

import { useSession } from "next-auth/react";
import Signin from "@/components/Signin";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status);

  if (status === "loading") return <div>Loading</div>

  if (status !== "authenticated") {
    return <Signin />;
  } else {
    return (
      <div className="">
        <div className="flex justify-center py-8"><Navbar /></div>
      </div>
    );
  }
}
