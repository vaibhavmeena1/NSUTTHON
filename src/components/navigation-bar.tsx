import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { SideMenu } from "@/components/SideMenu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth"

export function NavigationBar() {
  // render navbar only when user logged in details are fetched
  const { user, loading } = useAuth();
  if (loading) {
    return null; // or return a loading indicator, or keep your UI consistent while waiting.
  }
  return (
    <div className="flex p-4 justify-between w-full  border-b border-gray-500">
      {/* Left: NSUTTHON */}
          <div className="relative z-20 flex items-center p-0 m-0 text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            NSUT THON
          </div>

      {/* Middle: Leaderboard and Events */}
      <div className="flex space-x-4 hidden sm:flex">
        <Link to="/leaderboard">
          <Button variant="outline" className="w-full" type="button">
            leaderboard

          </Button>
        </Link>
        <Link to="/events">
          <Button variant="outline" className="w-full" type="button">
            Events
          </Button>

        </Link>
      </div>

{/* Right: Login, profile, Sign Up, ModeToggle, and SideMenu */}
{/* // Show Login button only if user is not logged in  */}
{/* Show Profile button only if user is logged in */}
 {/* Show Sign Up button only if user is not logged in */}
      <div className="flex space-x-4 items-center">
     
      {/* {!user && (
        <Link to="/login">
          <Button variant="outline" className="w-full" type="button">
            Login
          </Button>
        </Link>
      )}

      {user && (
        <Link to="/profile">
          <Button variant="outline" className="w-full" type="button">
            Profile
          </Button>
        </Link>
      )}

 */}
        <Link to="/register">
          <Button variant="outline" className="w-full" type="button">
            Register
          </Button>
        </Link>
       
      {user && (
        <Link to="/admin/dashboard">
          <Button variant="outline" className="w-full" type="button">
            Dashboard
          </Button>
        </Link>
      )}

     {/* 
      {!user && (
        <Link to="/signup" className="hidden sm:block">
          <Button variant="outline" className="w-full" type="button">
            Sign Up
          </Button>
        </Link>
      )}
       */}
      <div className="hidden sm:block">
        <ModeToggle />
      </div>
      <div className="sm:hidden">
        <SideMenu />
      </div>
    </div>
    </div>
  );
};
