import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router";

const PersistentCountdown = () => {
    const [targetTime, setTargetTime] = useState(null);

    useEffect(() => {
        const savedTime = localStorage.getItem("countdownTargetTime");
        if (savedTime) {
            setTargetTime(Number(savedTime)); // Load the saved target time
        } else {
            const newTargetTime = Date.now() + 420 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
            localStorage.setItem("countdownTargetTime", newTargetTime);
            setTargetTime(newTargetTime);
        }
    }, []);

    // Renderer function for the countdown
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <h2>The countdown has ended!</h2>;
        } else {
            return (
                <section id='countdown'>
                    <div className="container">
                        <div className="col-lg-6 col-md-8">
                            <div>
                                <h2 className="b_gold">Deco Collection <span>50% OFF</span></h2>
                                <p>
                                    Discover timeless elegance with our Deco Collection. Enjoy a limited-time 50% OFF on iconic designs that blend vintage charm with modern aesthetics. Upgrade your space today!
                                </p>
                                <div className="counters d-flex gap-sm-4 gap-2  flex-wrap">
                                    <div>
                                        <h1>{days}</h1>
                                        <h5>days</h5>
                                    </div>
                                    <h1>:</h1>
                                    <div>
                                        <h1>{hours}</h1>
                                        <h5>hours</h5>
                                    </div>
                                    <h1>:</h1>
                                    <div>
                                        <h1>{minutes}</h1>
                                        <h5>minutes</h5>
                                    </div>
                                    <h1>:</h1>
                                    <div>
                                        <h1>{seconds}</h1>
                                        <h5>seconds</h5>
                                    </div>
                                </div>
                                <Link className="black_btn">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    };

    if (!targetTime) {
        return <p>Loading...</p>;
    }

    return <Countdown date={targetTime} renderer={renderer} />;
};

export default PersistentCountdown;
