import { signIn } from 'next-auth/react'
import React from 'react'

export default function Signin() {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => signIn()}
        className="bg-blue-500 text-white font-semibold py-4 px-10 rounded"
      >
        Sign In
      </button>
    </div>
  );
}
