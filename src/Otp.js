import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import './style.css';
import { Protected } from "./Protected";

export const Otp = () => {
    const navigate = useNavigate();
    const formOtp = localStorage.getItem('otp')

    const [otp, setOtp] = useState(formOtp);
    const [genOtp, setGenOtp] = useState(formOtp)
    const [otpTimer, setOtpTimer] = useState();

    const resend = () => {
        localStorage.removeItem('otp')
        const NewOtp = Math.trunc(Math.random() * 10001);
        setGenOtp(NewOtp)
        console.log('resend otp = ', NewOtp);

    }

    const verifyOtp = () => {
        if ((otp?.length === 4) && otp == genOtp) {
            const token = Math.trunc(Math.random() * 10001);
            localStorage.setItem('token', token)
            navigate(`/home`);
        } else {
            alert('Enter valid OTP')
        }
    }
    useEffect(() => {
        localStorage.removeItem('otp');
        if (genOtp) {
            let count = 31;
            var timeInterval = setInterval(() => {
                count -= 1;
                setOtpTimer(count);
                if (count <= 0) {
                    setGenOtp(0)
                    setOtpTimer('Time Up')
                    clearInterval(timeInterval)
                }
            }, 1000);
        };

        return () => clearInterval(timeInterval)
    }, [genOtp])

    return (
        <>
            <div >
                <h1 className="otpTitle">OTP Screen</h1>
                <h2 className="otpTimer"> {otpTimer}</h2>
                <div className="main">

                    <div className="otpContainer">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span> - </span>}
                            renderInput={(props) => <input  {...props} style={{
                                width: '3vw', height: '5vh', borderRadius: '1.5vh', border: '3px solid #cacaf0', textAlign:
                                    "center", fontSize: '5vh', margin: '5%'
                            }} />}
                        />
                        <button type="reset" value="Reset" className="otpResend" onClick={() => resend()}>Resend</button>
                        <button type="submit" value="Submit" className="otpSubmit" onClick={() => verifyOtp()} >Submit</button>
                    </div>
                </div>
            </div>
        </>

    )
}