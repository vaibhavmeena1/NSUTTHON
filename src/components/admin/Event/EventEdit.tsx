import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/admin/time/time-picker"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"
import FileUpload from "@/components/admin/FileUpload";
import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from "lucide-react"
import { useAuth } from  "@/components/auth/auth";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const EventFormSchema = z.object({
  event_name: z.string().min(4, "Event name must be at least 4 characters."),
  description: z.string().optional(),
  // rules: z.string().optional(),
  day_number: z.number().min(1, "Day number must be at least 1.").int().optional(),
  time: z.string().refine(time => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(time), {
    message: "Invalid time format.",
    path: []
  }).optional(),
  venue: z.string().optional(),
  society_name: z.string().max(50),
  pocs: z.array(
    z.object({
      name: z.string().max(40).optional(),
      phone: z.string().max(14).optional(),
    })
  ).max(3, "You can add up to 3 POCs only."),
  banner_url_1: z.string().optional(),
  banner_url_2: z.string().optional(),
  registration_link: z.string().optional(),
  event_type: z.string().optional(),
});




export function EventsEditForm() {

const [banner1Url, setBanner1Url] = useState<string | null>(null);
const [banner2Url, setBanner2Url] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);


const form = useForm<z.infer<typeof EventFormSchema>>({
  resolver: zodResolver(EventFormSchema),
  defaultValues: {
    pocs: [
      { name: "", phone: "" }
    ]
  }
});

const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "pocs"
});
const { user } = useAuth();

function onSubmit(data: z.infer<typeof EventFormSchema>) {
  setIsLoading(true);
  if (banner1Url) {
    data.banner_url_1 = banner1Url;
  }
  if (banner2Url) {
    data.banner_url_2 = banner2Url;
  }
  const token = user?.token;
  // Configure axios headers to include the token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  axios.post('http://localhost:3000/registerevent', data, config)
    .then((response) => {
      if (response.status === 200) {
        toast({
          title: "Successfully added event!",
        });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: response.data,
        });
      }
    })
    .catch((error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to add the event.",
      });
    })
    .finally(() => {
      // Set isLoading to false once the request has finished
      setIsLoading(false);
    });
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex gap-5 w-full"> {/* <-- Make sure this is full width */}
          <div className="flex space-x-4 w-full">
            {/* Event Name and Society Name */}
            <div className="md:flex gap-5 space-y-4 md:space-y-0   w-full">
              <FormField
                control={form.control}
                name="event_name"
                render={({ field }) => (
                  <FormItem className="flex-1"> {/* <-- Updated */}
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="society_name"
                render={({ field }) => (
                  <FormItem className="flex-1"> {/* <-- Updated */}
                    <FormLabel>Society Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Society name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Day Number */}
            <FormField
              control={form.control}
              name="day_number"
              render={({ field }) => (
                <FormItem className="flex-grow-0 flex-shrink-1 w-auto min-w-max">
                  <FormLabel>Day Number</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(val) => field.onChange(Number(val))}   // Convert string to number
                      value={field.value ? field.value.toString() : "1"}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">Day 1</SelectItem>
                          <SelectItem value="2">Day 2</SelectItem>
                          <SelectItem value="3">Day 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            {/* Time */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="md:w-24 flex-grow-0 flex-shrink-1 w-auto">
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      onChange={(value) => {
                        // Format the time value
                        const formattedTime = `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}:00`;
                        // Update the form field with the formatted time
                        field.onChange(formattedTime);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>

        <div className="flex gap-5 w-full"> {/* <-- Parent flex container to ensure full width */}

          <div className="md:flex md:space-x-4 space-y-4  md:space-y-0 w-full"> {/* <-- Child flex container for the form fields */}

            {/* Registration Link */}


            {/* Venue */}
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem className=" md:w-72 flex-grow-0 flex-shrink-1 w-auto min-w-max "> {/* <-- Small width */}
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter venue (Nescii Lawns, etc)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registration_link"
              render={({ field }) => (
                <FormItem className="flex-1"> {/* <-- Takes maximum width */}
                  <FormLabel>Registration Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Type */}
            <FormField
              control={form.control}
              name="event_type"
              render={({ field }) => (
                <FormItem className="md:w-36 flex-grow-0 flex-shrink-1 w-auto min-w-max">
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter event type" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </div>

        </div>



        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="w-full  bg-transparent"
                  placeholder="Enter description"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* ... Add other fields similarly ... */}


        {/* <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules</FormLabel>
              <FormControl>
                <textarea className="w-full p-2 border rounded" placeholder="Enter rules" {...field}></textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}


        {/* ... similar pattern for the rest of the fields ... */}

        <div className="md:flex gap-12 ">
        <FileUpload 
          onBanner1Upload={(url) => setBanner1Url(url)} 
          onBanner2Upload={(url) => setBanner2Url(url)}
        />
          <div className="w-full">

            {fields.map((field, index) => (
              <div key={field.id} className="flex mb-4 gap-5">

                {/* Name Field */}
                <div className="flex w-full flex-col">
                  <FormLabel className="mb-2">{`POC ${index + 1}`}</FormLabel>
                  <FormField
                    control={form.control}
                    name={`pocs.${index}.name`}
                    render={({ field }) => (
                      <>
                        <Input placeholder={`Enter name for POC ${index + 1}`} {...field} />
                        <FormMessage />
                      </>
                    )}
                  />
                </div>

                {/* Phone Field */}
                <div className="flex w-full flex-col">
                  <FormLabel className="mb-2 invisible">Placeholder</FormLabel>
                  <FormField
                    control={form.control}
                    name={`pocs.${index}.phone`}
                    render={({ field }) => (
                      <>
                        <Input placeholder={`Enter phone for POC ${index + 1}`} {...field} />
                        <FormMessage />
                      </>
                    )}
                  />
                </div>

                {/* Remove Button */}
                {fields.length > 1 && (
                  <div>
                    <FormLabel className=" mb-2 invisible">x</FormLabel>

                    <Button
                      type="button"
                      className="flex w-10   items-center justify-center"
                      onClick={() => remove(index)}
                    >
                      <X className="-m-10 " />
                    </Button>
                  </div>

                )}

              </div>
            ))}

            {/* Add POC Button */}
            {fields.length < 3 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mb-6 mb:mb-0"
                onClick={() => append({ name: "", phone: "" })}
              >
                Add POC
              </Button>
            )}


          </div>


        </div>


        {/* ... Add other fields similarly ... */}

        <Button disabled={isLoading} type="submit"> { isLoading && <Loader2 className=" mr-1 h-4 w-4 animate-spin" /> }

{isLoading ? "Submitting..." : "Submit"} </Button>
      </form>
    </Form>
  );
}
