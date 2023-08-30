import {Trash} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog-2"
  import axios from 'axios';
  import { toast } from "@/components/ui/use-toast";
  import { Button } from "@/components/ui/button"

// Define the prop types
interface EventDeleteDialogBoxProps {
    eventId: number;
    onEventDelete : () => void;
}
  
export function EventDeleteDialogBox({ eventId ,onEventDelete }: EventDeleteDialogBoxProps) {
    

    const deleteEvent = async () => {
      try {
        // Send a DELETE request to the backend
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/eventdelete/${eventId}`);

        if (response.status === 200) {
              // Call the callback after successful deletion
          toast({

            title: "Event deleted successfully!",
           
          });
          onEventDelete();
        } else {
          toast({
            title: "Error",
            variant: "destructive",
            description: response.data,
          });
        }
      } catch (error) {
        console.error("Error deleting the event:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Server error while deleting event.",
        });
      }
    };
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 border mr-2">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteEvent}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }