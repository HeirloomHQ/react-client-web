import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/Landing.css";
import { AuthProvider } from "../lib/clientSideAuth";
import { MemorialsProvider } from "../lib/memorial";

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

function Wrapper({ children }) {
  const wrapWith = [AuthProvider, MemorialsProvider];
  return wrapWith.reduce((acc, Wrap) => <Wrap>{acc}</Wrap>, <>{children}</>);
}

export default MyApp;
