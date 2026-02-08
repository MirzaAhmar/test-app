import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Hero2 from "../../Components/Hero2";
import "./ComingSoon.css";
import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const ComingSoon = () => {
    const [targetTime, setTargetTime] = useState(null);

    useEffect(() => {
        const savedTime = localStorage.getItem("countdownTargetTime");
        if (savedTime) {
            setTargetTime(Number(savedTime));
        } else {
            const newTargetTime = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
            localStorage.setItem("countdownTargetTime", newTargetTime);
            setTargetTime(newTargetTime);
        }
    }, []);

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <h2>The countdown has ended!</h2>;
        } else {
            return (
                <div className="counters d-flex gap-sm-4 gap-2 flex-wrap mt-md-5 mt-4">
                    <div>
                        <h1>{days}</h1>
                        <h5>Days</h5>
                    </div>
                    <h1>:</h1>
                    <div>
                        <h1>{hours}</h1>
                        <h5>Hours</h5>
                    </div>
                    <h1>:</h1>
                    <div>
                        <h1>{minutes}</h1>
                        <h5>Minutes</h5>
                    </div>
                    <h1>:</h1>
                    <div>
                        <h1>{seconds}</h1>
                        <h5>Seconds</h5>
                    </div>
                </div>
            );
        }
    };

    if (!targetTime) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* ====== 2.1 Hero section ====== */}
            <Hero2 heading="Coming Soon" />
            {/* ====== End 2.1 Hero section ====== */}

            <section id="coming">
                <div className="container">
                    <h1>Coming Soon...</h1>
                    <p className="col-md-5">
                        There are many variations of passages of Lorem Ipsum available, but
                        the majority have suffered alteration in some form, by injected
                        humour, or randomised words which don’t slightly believable.
                    </p>
                    <h5>NEW UPDATE WILL BE LAUNCHED IN:</h5>

                    {/* Countdown Timer Added Here */}
                    <Countdown date={targetTime} renderer={renderer} />
                    <div className='socialIcons d-flex align-items-end gap-4 mt-5'>
                        <h5>Follow us on social</h5>
                        <Link><FontAwesomeIcon icon={faFacebookF} /></Link>
                        <Link><FontAwesomeIcon icon={faXTwitter} /></Link>
                        <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ComingSoon;
