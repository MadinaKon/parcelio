import "@/styles/globals.css";
import { SWRConfig } from "swr";

// const fetcher = (url) => fetch(url).then((response) => response.json());

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <SWRConfig value={{ fetcher }}>
//         <Component {...pageProps} />
//       </SWRConfig>
//     </>
//   );
// }
export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
