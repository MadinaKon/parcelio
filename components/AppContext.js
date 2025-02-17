import { useSession } from "next-auth/react";
import { createContext } from "react";
import useSWR from "swr";

const AppContext = createContext();

function AppProvider(props) {
  const { data: session } = useSession();
  let apiUrl;
  if (session) {
    apiUrl = `/api/services?userId=${session?.user.userId}`;
  } else {
    apiUrl = `/api/services`;
  }

  const { data } = useSWR(apiUrl, {
    fallbackData: [],
  });

  if (!data) return;

  console.log("DATA AppContext.js: ", data);

  const value = {
    data,
  };

  console.log("VALUE AppContext.js: ", value);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
