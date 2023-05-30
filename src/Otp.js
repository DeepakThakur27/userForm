import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

import './style.css';

export const Otp = () => {
    const navigate = useNavigate();
    const formOtp = localStorage.getItem('otp')

    const [otp, setOtp] = useState('');
    const [genOtp, setGenOtp] = useState(formOtp)
    console.log(' Otp = ', genOtp)

    const timeOut = (flage) => {

        const setTime = setTimeout(() => {
            setGenOtp('')
            localStorage.removeItem('otp')
            console.log("Tiem Out", genOtp)
        }, 9000);

        if (flage) {
            localStorage.removeItem('otp')
            clearInterval(setTime)
        }

    };

    const resend = () => {
        const NewOtp = Math.trunc(Math.random() * 10001);
        setGenOtp(NewOtp)
        console.log('resend', genOtp);
        timeOut();
    }

    const verifyOtp = () => {
        let flage = false;
        flage = (otp == genOtp)
        console.log('otp', otp, 'genOtp', genOtp, 'flage', flage)
        if (otp.length === 4) {
            if (flage) {
                timeOut(flage)
                navigate('/home')
            } else {
                alert('Enter valid OTP')
            }
        }

    }
    useEffect(() => {
        timeOut()
    }, [])

    return (
        <>
            <div >
                <h4 className="title">OTP Screen</h4>
                <div className="main">
                    <div className="otpContainer">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}

                            numInputs={4}
                            renderSeparator={<span> - </span>}
                            renderInput={(props) => <input className='otpInput' {...props} style={{
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