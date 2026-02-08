import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const useNewsletter = () => {
    const [email, setEmail] = useState({
        recipient: "ahmarbaig1@gmail.com",
        sender: "",
        subject: "",
        message: ""
    })

    const [errors, setErrors] = useState({});

    const handleEmail = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value })

        // Real-time validation
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: e.target.value.trim() === "" ? `${e.target.name} is required` : ""
        }));
    }

    const [isLoading, setIsLoading] = useState(false)

    const formSubmit = (e, isContactForm = false) => {
        e.preventDefault();

        if (isContactForm) {
            let validationErrors = {};
            if (!email.sender.trim()) validationErrors.sender = "Email is required";
            if (!email.subject.trim()) validationErrors.subject = "Subject is required";
            if (!email.message.trim()) validationErrors.message = "Message is required";

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        }

        setIsLoading(true);
        axios.post("https://apex.oracle.com/pls/apex/oracle_hr/Email/Email_send", email)
            .then((resp) => {
                console.log("Submitted Successfully!", resp.data);
                toast.success("Submitted Successfully!");

                // Reset the form on success
                setEmail({
                    recipient: "ahmarbaig1@gmail.com",
                    sender: "",
                    subject: "",
                    message: ""
                });
            })
            .catch((err) => {
                console.log("failed to submit", err);
                toast.error("failed to submit");
            })
            .finally(() => {
                setTimeout(() => setIsLoading(false), 1000);
            });
    };

    return (
        { email, handleEmail, isLoading, formSubmit, errors }
    )
}

export default useNewsletter