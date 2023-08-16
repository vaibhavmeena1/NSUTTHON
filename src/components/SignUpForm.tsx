import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {   Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
 
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  mobile_number: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  roll_no: z.string().min(6, {
    message: "Name must be at least 6 characters.",
  }),
  branch: z.string(),
})
 
export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Vaibhav Meena" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add your new fields here */}
        <FormField
          control={form.control}
          name="mobile_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 <FormField
    control={form.control}
    name="branch"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Branch</FormLabel>
            <FormControl>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Engineering Branches</SelectLabel>
                            <SelectItem value="CSE">CSE</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="ECE">ECE</SelectItem>
                            {/* Add more branches as needed */}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormDescription>
                Select your branch from the dropdown.
            </FormDescription>
            <FormMessage />
        </FormItem>
    )}
/>


        {/* Repeat for the other fields */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
