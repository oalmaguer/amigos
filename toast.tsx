// Toast.js
"use client";
import React, { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, duration = 3000, onClose }: any) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500); // Give time for the fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
};

export default Toast;
