import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/Landing.css";
import "../styles/test.css";
import "react-bubble-ui/dist/index.css";


import { AuthProvider } from "../lib/clientSideAuth";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
