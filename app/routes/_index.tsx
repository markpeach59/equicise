import type { MetaFunction } from "@remix-run/node";


import { Button } from "~/components/ui/button"

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/remix'
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div>
        <SignedIn>
        <p>You are signed in!</p>

        <UserButton />
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>

        <SignInButton />
      </SignedOut>
    </div>
        <div>
      <Button>Click me</Button>
    </div>
      </div>
    </div>
  );
}



