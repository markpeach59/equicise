import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { NavBar } from "~/components/nav-bar";
import { Button } from "~/components/ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/remix";


export const meta: MetaFunction = () => {
  return [
    { title: "Remix Landing Page" },
    { name: "description", content: "Welcome to our awesome landing page!" },
  ];
};

export default function Index() {
  
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center">
         Hello
         <SignedIn>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome, {user?.firstName || 'User'}!</h1>
            <p className="text-xl mb-8 text-muted-foreground">Glad to have you back. Ready to explore?</p>
            <Button size="lg" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Our Awesome Product</h1>
            <p className="text-xl mb-8 text-muted-foreground">Discover amazing features that will revolutionize your workflow.</p>
            <Button size="lg" asChild>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </SignedOut>
        </div>
      </main>
      <footer className="bg-muted p-4 text-center text-muted-foreground">
        © 2024 Equicise ltd. All rights reserved.
      </footer>
    </div>
  );
}



