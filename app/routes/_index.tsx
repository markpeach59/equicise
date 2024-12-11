import type { MetaFunction } from "@remix-run/node";




import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/remix'



export const meta: MetaFunction = () => {
  return [
    { title: "Equicise Home" },
    { name: "description", content: "Welcome to Equicise!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <div>
        <SignedIn>
        <p>You are signed in!</p>

        <UserButton />

        <div><SignOutButton /></div>
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        

        <div><SignInButton /></div>

        <div><SignUpButton /></div>
      </SignedOut>
    </div>
        
      </div>
    </div>
  );
}



