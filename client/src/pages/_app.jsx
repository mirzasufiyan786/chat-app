import "@/styles/globals.css";
import { StateProvider } from "@/context/StateContext";
export default function App({ Component, pageProps }) {
  return(
    <StateProvider initialState={initialstate} reducer={reducer}>
<Head>
  <title>chat-app</title>
  <link rel="shortcut icon" href="/favicon.png" />
</Head>
    </StateProvider>
  )
  <Component {...pageProps} />;
}
