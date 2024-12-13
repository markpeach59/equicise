import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/remix";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <Link to="/" className="text-2xl font-bold text-primary">
        Equicise
      </Link>
      <ul className="flex space-x-4">
        
        
        <SignedIn>
          <li><Link to="/dashboard" className="text-foreground hover:text-primary">Dashboard</Link></li>
        </SignedIn>
      </ul>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
}

