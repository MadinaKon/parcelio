import React, { useState, useEffect } from "react";

const NotificationPage = ({ notificationId }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        // Fetch notification data
        const response = await fetch(`/api/notifications/${notificationId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch notification: ${response.status}`);
        }

        const data = await response.json();
        setNotification(data);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
  }, [notificationId]);

  if (!notification) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`notification-item ${notification.isRead ? "read" : "unread"}`}
    >
      <p>{notification.message}</p>
      {!notification.isRead && (
        <button onClick={handleMarkAsRead}>Mark as Read</button>
      )}
    </div>
  );
};

export default NotificationPage;
