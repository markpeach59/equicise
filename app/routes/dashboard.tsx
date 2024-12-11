
import type { MetaFunction } from "@remix-run/node";
import { LoaderFunction, redirect } from "@remix-run/node";

import {mongodb} from "~/utils/db.server";
import type {User} from '~/utils/types.server';

import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/remix'

import { useLoaderData } from "@remix-run/react";


export const meta: MetaFunction = () => {
    return [
      { title: "Equicise Dashboard" },
      { name: "description", content: "Client Bookings" },
    ];
  };

  
  
export const loader: LoaderFunction = async (args) => {

    let db = await mongodb.db("test");
    let collection = await db.collection("users2");
    let users = await collection.find({}).toArray();

    console.log('Users -', users);

    let booking = 'Saturday 9:30';
    let availability = 'None';
    return Response.json({booking, availability, users});
}


export default function Dashboard() {
   
    const { booking } = useLoaderData<{ booking: String }>();
    const { availability } = useLoaderData<{ availability: String }>();
    const { users } = useLoaderData<{ users: User[] }>();



    return (
        <div className="flex h-screen  justify-center">
      <div className="flex flex-col gap-16">
        <h1>Dashboard</h1>
        <p>Welcome</p>

        <SignedIn>
        <p>You are signed in!</p>

        <UserButton />

        <div><SignOutButton /></div>
      </SignedIn>

        <p>Booking : {booking}</p>

        <p>Future Availability : {availability}</p>

<ul>
{users.map((user:User) => {return(<li key={user._id.toString()}>{user.email} {user._id.toString()}</li>)})}
</ul>
        


      </div>
      </div>
    );
  }