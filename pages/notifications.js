import Notification from "../components/notification/Notification";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function NotificationsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  // Fetch user data (including notifications)
  const { data: user, isLoading } = useSWR(
    userId ? `/api/users/${userId}` : null
  );

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Notifications</h1>
      <Notification defaultData={user} />
    </div>
  );
}