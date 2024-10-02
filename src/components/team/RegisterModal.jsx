import React, { useState, useEffect } from 'react';
import RegisterBlock from './RegisterBlock';
import { Button } from "@/components/ui/button";
import '../styles/transition.css';
import { CSSTransition } from 'react-transition-group';
import { useToast } from "@/components/ui/use-toast";
import { TransitionGroup } from 'react-transition-group';
import { PopupDialog } from './Popup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Transition } from "@headlessui/react";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA

function RegisterForm({ numberOfMembers, teamName }) {
    const [members, setMembers] = useState(Array(numberOfMembers).fill({}));
    const { toast } = useToast();
    const [showPopup, setShowPopup] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null); // CAPTCHA state
    const navigate = useNavigate();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    useEffect(() => {
        setMembers(prevMembers => {
            if (numberOfMembers > prevMembers.length) {
                return [...prevMembers, ...Array(numberOfMembers - prevMembers.length).fill({})];
            } else if (numberOfMembers < prevMembers.length) {
                return prevMembers.slice(0, numberOfMembers);
            } else {
                return prevMembers;
            }
        });
    }, [numberOfMembers]);

    const saveMemberDetails = (index, newMember) => {
        const updatedMembers = [...members];
        updatedMembers[index] = newMember;
        setMembers(updatedMembers);
    };

    const submitDetails = () => {
        // Check if CAPTCHA is verified
        if (!captchaVerified) {
            toast({
                variant: "destructive",
                title: "CAPTCHA Error",
                description: "Please verify you are not a robot.",
            });
            return;
        }

        // Check for team name
        if (!teamName) {
            toast({
                variant: "destructive",
                title: "Missing details",
                description: "Enter team name",
            });
            return;
        }

        // Check for any empty member fields
        if (members.some(member => !member.name || !member.email || !member.phone || !member.rollno || !member.branch)) {
            toast({
                variant: "destructive",
                title: "Missing details",
                description: "All fields are required. Please fill in missing fields.",
            });
            return;
        }

        // Check for invalid emails
        const invalidEmailMembers = members.filter(member => !emailPattern.test(member.email));

        if (invalidEmailMembers.length > 0) {
            const invalidNames = invalidEmailMembers.map(m => m.name).join(', ');
            toast({
                variant: "destructive",
                title: "Invalid Email",
                description: `Ensure the email addresses for ${invalidNames} are valid.`,
            });
            return;
        }

        // If all checks pass, proceed
        setShowPopup(true);
        const teamDetails = { teamName, members };
        console.log(JSON.stringify(teamDetails, null, 2));
    };

    const handlePopupResponse = (response) => {
        if (response) {
            const teamDetails = {
                teamName: teamName,
                members: members,
                recaptchaToken: captchaToken,
              };

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, teamDetails)
                .then(res => {
                    if (res.status === 201) {
                        const { teamId: receivedTeamId } = res.data;
                        navigate('/success', { state: { teamId: receivedTeamId, teamName } });
                        setShowPopup(false);
                    } else {
                        toast({ variant: "destructive", title: "Error", description: "Something went wrong." });
                    }
                })
                .catch(error => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: error.response ? error.response.data.error : "Server error",
                    });
                    console.error("Error while registering:", error);
                });
        } else {
            setShowPopup(false);
        }
    };

    // Callback for reCAPTCHA
    const onCaptchaChange = (token) => {
        if (token) {
            setCaptchaToken(token);
        }
    };

    return (
        <div>
            {members.map((member, index) => (
                <Transition
                    as={React.Fragment}
                    key={index}
                    appear={true}
                    show={true}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full opacity-0"
                    enterTo="translate-x-0 opacity-100"
                >
                    <div style={{ transitionDelay: `${index * 100}ms` }}>
                        <RegisterBlock
                            member={member}
                            saveMemberDetails={(newMember) => saveMemberDetails(index, newMember)}
                            index={index + 1}
                        />
                    </div>
                </Transition>
            ))}
            
            {/* CAPTCHA Integration */}
            <div className="py-4">
                <ReCAPTCHA
                    sitekey={"6Lc_c1UqAAAAAFDv5TJVVMtRw6LSzIDHAovY1odj"} // Your reCAPTCHA site key
                    onChange={onCaptchaChange}
                />
            </div>

            <Button className="w-full font-bold font-raleway text-xl py-6" onClick={submitDetails}>
                SUBMIT
            </Button>

            {showPopup && (
                <PopupDialog
                    teamName={teamName}
                    members={members}
                    onResponse={handlePopupResponse}
                />
            )}
        </div>
    );
}

export default RegisterForm;
