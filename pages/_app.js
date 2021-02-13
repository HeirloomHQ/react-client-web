import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/Landing.css";
import { AuthProvider } from "../lib/clientSideAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default MyApp;
