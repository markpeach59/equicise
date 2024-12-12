import { useState, useMemo } from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, type LoaderFunction, redirect } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import { useActionData, useSubmit, Form } from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {RectangleRadioGroup} from "~/components/rectangle-radio-group";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format, addDays, addWeeks, isBefore, isAfter, getDay } from "date-fns";
import { CalendarIcon } from 'lucide-react'

import {mongodb} from "~/utils/db.server";

interface Option {
    id: string;
    label:string;

}
interface LoaderData {
    options:Option[];
}

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
      { title: "Book - Equicise" },
      { name: "description", content: "Book" },
    ];
  };

  
  
export const loader: LoaderFunction = async (args) => {
    const options : Option[]=[
        {id: "slot1", label: "9:00 - 9:30"},
        {id: "slot2", label: "9:35 - 10:05"},
        {id: "slot3", label: "10:10 - 10:40"},
        {id: "slot4", label: "10:45 - 11:15"},
        {id: "slot5", label: "11:20 - 11:50"},
        {id: "slot6", label: "9:35 - 10:05"},

    ];

    return Response.json({options});
}

export const action = async( {request}:ActionFunctionArgs) => {
    const formData = await request.formData();
    const date = formData.get("date");
    const slot = formData.get("slot");

    console.log( 'Slot - ', slot);

    return Response.json({submittedDate: date , submittedSlot: slot })

}

export default function Book() {


    const defaultDate = useMemo(() => {
        let date = addDays(new Date(),2);
        if (getDay(date) ===1 ){
            date = addDays(date,1);
        }
        return date;
    },[])

    
    

    const { options } = useLoaderData<{ options: Option[] }>();
    const [date, setDate] = useState<Date | undefined>(defaultDate);


    const actionData = useActionData<typeof action>();
    const submit = useSubmit();


const disabledDays = useMemo(() => {
    const sixWeeksLater = addWeeks(defaultDate, 6);
    return (day: Date) =>{
        return isBefore(day, defaultDate) || isAfter(day, sixWeeksLater)|| getDay(day) === 1 // Mondays;
    };
},[defaultDate]);




    return (

        <div className="container mx-auto p-4">
            
      <h1 className="font-bold mb-4">Please Select a Date and Session Slot</h1>
      <Form method="post" >
        <div className="flex items-center gap-4 mb-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={defaultDate}
                disabled={disabledDays}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="date" value={date?.toISOString() ?? ""} />
          </div>
          <div className="mb-5">
      
    
    
    
        <RectangleRadioGroup
            options={options}
            defaultValue="slot1"
            name="slot"
        />
        </div>
        <div className="mb-5">
        <Button type="submit">Submit</Button>
        </div>
        </Form>
        {actionData?.submittedDate && ( 
            <p className="mt-4">
                Submitted date :{ new Date (actionData.submittedDate).toLocaleDateString()}<br />
                Slot : { actionData.submittedSlot }
            </p>

        )}
      </div>
        
    )
}


