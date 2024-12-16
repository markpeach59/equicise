import { NavBar } from "~/components/nav-bar";
import { useUser } from "@clerk/remix";

import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  return null;
};

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Welcome to Your Dashboard</h1>
        <p className="text-xl mb-4 text-muted-foreground">
          Hello, {user?.firstName || 'User'}! This is your protected dashboard.
        </p>
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Account Information</h2>
          <ul className="space-y-2">
            <li><strong>Name:</strong> {user?.firstName} {user?.lastName}</li>
            <li><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</li>
            <li><strong>User ID:</strong> {user?.id}</li>
          </ul>
        </div>
      </main>
      <footer className="bg-muted p-4 text-center text-muted-foreground">
        © 2024 Equicise Ltd. All rights reserved.
      </footer>
    </div>
  );
}