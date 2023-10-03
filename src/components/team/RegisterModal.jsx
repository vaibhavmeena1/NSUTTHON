
import React, { useState, useEffect } from 'react';
import RegisterBlock from './RegisterBlock';
import { Button } from "@/components/ui/button"
import '../styles/transition.css';
import { CSSTransition } from 'react-transition-group';
import { useToast } from "@/components/ui/use-toast"
import { TransitionGroup } from 'react-transition-group';
import { PopupDialog } from './Popup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm({ numberOfMembers, teamName }) {
    // Array to store details of each member
    const [members, setMembers] = useState(Array(numberOfMembers).fill({}));
    const { toast } = useToast()
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setMembers(prevMembers => {
            if (numberOfMembers > prevMembers.length) {
                // If numberOfMembers has increased, add new members
                return [...prevMembers, ...Array(numberOfMembers - prevMembers.length).fill({})];
            } else if (numberOfMembers < prevMembers.length) {
                // If numberOfMembers has decreased, remove extra members
                return prevMembers.slice(0, numberOfMembers);
            } else {
                // If numberOfMembers hasn't changed, return the previous state
                return prevMembers;
            }
        });
    }, [numberOfMembers]);

    const saveMemberDetails = (index, newMember) => {
        const updatedMembers = [...members];
        updatedMembers[index] = newMember;
        setMembers(updatedMembers);
    };

    // New function to handle submission
    const submitDetails = () => {
        // setShowPopup(true);
        if (!teamName) {
            toast({
                variant: "destructive",
                title: "Missing details",
                description: "Enter team name",
            });
        }
        else if (members.some(member => !member.name || !member.email || !member.phone || !member.rollno || !member.branch)) {
            toast({
                variant: "destructive",
                title: "Missing details",
                description: "All fields are required. Please fill in missing fields.",
            });
        }
        if (teamName && !members.some(member => !member.name || !member.email || !member.phone || !member.rollno || !member.branch)) {
            setShowPopup(true);
        }

        const teamDetails = {
            teamName: teamName,
            members: members
        };
        console.log(JSON.stringify(teamDetails, null, 2));
    };
    const handlePopupResponse = (response) => {
        if (response) {
            // Prepare data for submission
            const teamDetails = {
                teamName: teamName,
                members: members
            };

            // POST data using Axios
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, teamDetails)
                .then(res => {
                    if (res.status === 201) {
                        const { teamId: receivedTeamId } = res.data;
                        console.log("Team ID received:", receivedTeamId)
                        console.log("Team name:", teamName)

                        navigate('/success', { state: { teamId: receivedTeamId, teamName: teamName } });

                        setShowPopup(false);
                        toast({
                            // variant: "positive",
                            title: "Success!",
                            description: "Registration successful!"
                        });
                    } else {
                        toast({
                            variant: "destructive",
                            title: "Error",
                            description: "Something went wrong."
                        });
                    }
                })
                .catch(error => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: error.response ? error.response.data.error : "Server error"
                    });
                    console.error("Error while registering:", error);
                });
        } else {
            console.log("User responded with NO");
            setShowPopup(false);
        }
    };



    return (
        <div>
            {members.map((member, index) => (
                <RegisterBlock
                    key={index}
                    member={member}
                    saveMemberDetails={(newMember) => saveMemberDetails(index, newMember)}
                    index={index + 1}
                />
            ))}
            <Button className="w-full font-bold  font-raleway text-xl py-6" onClick={submitDetails} >SUBMIT</Button>

            {showPopup &&
                <PopupDialog
                    teamName={teamName} members={members}
                    onResponse={handlePopupResponse}
                />
            }
        </div>
    );
}
;
export default RegisterForm;
