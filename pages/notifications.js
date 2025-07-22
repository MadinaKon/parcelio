import Notification from "../components/notification/Notification";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function NotificationsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  // Fetch user data (including notifications)
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(userId ? `/api/users/${userId}` : null);

  if (error) return <div>Error loading notifications</div>;
  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Notifications</h1>
      {user.notifications?.length > 0 ? (
        <Notification defaultData={user} />
      ) : (
        <p>No notifications yet</p>
      )}
    </div>
  );
}
