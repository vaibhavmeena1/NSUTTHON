import { useLocation } from 'react-router-dom';

function SuccessPage() {
    const location = useLocation();
    const teamId = location.state?.teamId;
    const teamName = location.state?.teamName;

    // Now you can use teamId and teamName in your component's rendering logic
    // ...

    return (
        <div>
            <div className="grid lg:max-w-none lg:mr-14   lg:grid-cols-7 p-0 " style={{ height: 'calc(100vh - 60px)' }}>

                <div className="relative hidden h-full flex-col p-10 lg:flex col-span-2">
                    <div className="absolute inset-0 bg-zinc-900"></div>
                </div>

                <div className="p-6 md:p-8   lg:pl-20   col-span-5">
                    <h1 className=" font-extrabold font-raleway  tracking-tight text-3xl  md:text-4xl">
                        WELCOME {teamName}
                    </h1>
                    <h1 className=" font-extrabold font-raleway  tracking-tight text-3xl  md:text-4xl">
                        Your Team ID is: {teamId}
                    </h1>

                    <h1>you are now eligible </h1>

                </div>
            </div>


            
        </div>
    );
}

export default SuccessPage;