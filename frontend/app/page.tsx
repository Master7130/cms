'use client';

import { useSession } from 'next-auth/react'
import Signin from '@/components/Signin';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status)

  if (status === "authenticated") {
    return <Signin />
  }
}
