import {Label} from "~/components/ui/label";
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";

interface Option {
    id: string;
    label:string;
}

interface RectangleRadioGroupProps {
 options: Option[];
 defaultValue?: string;
 name: string;
}

export function RectangleRadioGroup({
    options, 
    defaultValue, 
    name,
}: RectangleRadioGroupProps){
return (
    <RadioGroup
        defaultValue={defaultValue}
        name={name}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
{options.map((option) => (
    <div key={option.id}>
<RadioGroupItem 
    value={option.id}
    id={option.id}
    className="peer sr-only"
/>
<Label  
    htmlFor={option.id}
    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
    >{option.label}
    </Label>
    </div>))}

    </RadioGroup>
)

}





