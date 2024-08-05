// src/components/Notification.jsx
import React, { useEffect, useState } from "react";
import "./notification.scss";

function Notification({ message, type, duration, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
