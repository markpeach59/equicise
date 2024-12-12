import { Link } from "@remix-run/react";

import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/remix'

import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
  } from "../components/ui/navigation-menu"

export default function Header() {
    return (
        <div className="flex flex-col bg-white dark:bg-gray-900">
            <div className="w-full px-4 py-6 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100">Equicise</Link>
                
    <NavigationMenu>
<NavigationMenuList className = "flex gap-4">
<NavigationMenuLink>
            <Link to="/">Home</Link>
   </NavigationMenuLink>       

   <NavigationMenuLink>
<Link to="/dashboard">Dashboard</Link>
</NavigationMenuLink>
<NavigationMenuLink>
<Link to="/book">Book</Link>
</NavigationMenuLink>
<NavigationMenuLink>
<Link to="/pay">Pay</Link>
</NavigationMenuLink>

{/*<SignedIn><SignOutButton /></SignedIn>*/}

</NavigationMenuList>
</NavigationMenu>
</div>
</div>
    );
}
