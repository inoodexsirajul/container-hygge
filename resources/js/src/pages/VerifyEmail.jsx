import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUrl = searchParams.get("url"); 

    if (!verifyUrl) {
      setMessage("Invalid verification link.");
      return;
    }

    fetch(verifyUrl)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || "Email verified successfully!");
       
        setTimeout(() => navigate("/signin"), 2000);
      })
      .catch(err => {
        console.error(err);
        setMessage("Verification failed or expired.");
      });
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
