import { BrowserRouter as Route, Link } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm";
import { Button } from "../components/ui/button"

function SignUp() {
  return (
    <>


       <div className="md:hidden">
        <img
          src="https://example.com/images/authentication-light.png"
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="https://example.com/images/authentication-dark.png"
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className=" relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 p-0">

        <Link to="/login" className="absolute right-4 top-4 md:right-8 md:top-8">
          <Button variant="ghost">
            Login
          </Button>
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
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
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignUpForm />

          </div>
        </div>
      </div> 
    </>
  );
}

export default SignUp;
