import { signOut } from 'next-auth/react';
import React from 'react'

export default function Navbar() {
  return (
    <nav className='w-min flex justify-between text-center gap-10'>
      {[
        ["Models", "/"],
        ["Data", "/data"],
      ].map(([title, url], key) => (
        <a
          href={url}
          className=""
          key={key}
        >
          {title}
        </a>
      ))}
      <button className="w-max" onClick={() => signOut()}>Sign out</button>
    </nav>
  );
}
