import Link from "next/link";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="flex flex-col gap-y-7 px-8 py-4">
      <Link href="/" className="text-xl underline">Back</Link>
      {children}
    </div>
  );
}
