import React, { useState } from "react";

const NotificationItem = ({ notification }) => {
  const [isRead, setIsRead] = useState(notification.isRead);

  const handleMarkAsRead = async () => {
    try {
      // Make API call to mark notification as read using fetch
      const response = await fetch(
        `/api/notifications/mark-as-read/${notification._id}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to mark notification as read: ${response.status}`
        );
      }

      // Update local state
      setIsRead(true);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className={`notification-item ${isRead ? "read" : "unread"}`}>
      <p>{notification.message}</p>
      {!isRead && <button onClick={handleMarkAsRead}>Mark as Read</button>}
    </div>
  );
};

export default NotificationItem;
