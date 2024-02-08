import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled component for the bell icon container
const BellIconContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px; /* Adjust margin as needed */
`;

// Styled component for the notification count badge
const NotificationCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
`;

const BellIcon = () => {
  const [notifications, setNotifications] = useState(0);

  // Simulate WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080"); // Replace with your WebSocket server URL
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socket.onmessage = (event) => {
      // Increment notification count when a new notification is received
      setNotifications((prevNotifications) => prevNotifications + 1);
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <BellIconContainer>
      {notifications > 0 && (
        <NotificationCount>{notifications}</NotificationCount>
      )}
    </BellIconContainer>
  );
};

export default BellIcon;
