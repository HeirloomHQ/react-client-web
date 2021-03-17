import { useState, useRef, createRef, useEffect } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Button from "../components/button";
import DashNavbar from "../components/dashNavbar";
import HeirloomSettingsModal from "../components/heirloomSettingsModal";
import LoadingSpinner from "../components/loadingSpinner";
import { useUser, useUserMock } from "../lib/clientSideAuth";
import { useMemorials, useMemorialsMock } from "../lib/memorial";

export default function Home() {
  const { loading: userLoading, user } = useUser();
  const { loading: memorialsLoading, memorials, roles, setMemorial } = useMemorials(
    user?.id
  );
  const router = useRouter();

  const memorialCount = memorials?.length || 0;

  const ref = useRef(null);
  const scroll = (scrollOffset, left) => {
    const { offsetLeft } = scrollOffset.current;
    ref.current.scrollLeft = offsetLeft - 200;
  };

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs(
      Array(memorialCount)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memorialCount]);

  function openSettings(memorial) {
    setMemorial(memorial);
  }

  const [centeredCard, setCenteredCard] = useState(0);

  return userLoading || !user ? (
    <div className="bg-paper min-h-screen h-full">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <Head>
        <title>Heirloom | My Heirlooms</title>
      </Head>
      <ChakraProvider>
        <div className="bg-paper min-h-screen flex flex-col">
          <DashNavbar />

          {/*Memorial Grid*/}
          {memorialsLoading || !memorials ? (
            <LoadingSpinner />
          ) : (
            <>
              <div
                className="w-screen flex-grow flex overflow-x-hidden mx-auto py-20 transition-transform"
                ref={ref}
              >
                <div className="flex-grow inline-flex box-border min-w-full px-40">
                  {memorials.map((memorial, index) => (
                    <div
                      className="flex-shrink-0 rounded-3xl mx-10 flex flex-col justify-center items-center bg-black bg-opacity-20 w-11/12"
                      style={{
                        backgroundImage: `url(${memorial.coverPhoto})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      key={memorial?.id + index}
                      onClick={() => {
                        if (index === centeredCard) {
                          router.push({
                            pathname: "/page",
                            query: {
                              mem_id: memorial.id,
                              firstname: memorial.firstName,
                              lastname: memorial.lastName,
                            },
                          });
                          return;
                        }
                        scroll(elRefs[index]);
                        setCenteredCard(index);
                      }}
                      ref={elRefs[index]}
                    >
                      <p className="font-display text-7xl font-semibold text-white">{`${memorial?.firstName} ${memorial?.lastName}`}</p>
                      <p className="font-sans text-2xl font-semibold text-white mt-4">
                        {memorial?.description}
                      </p>
                    </div>
                  ))}
                  <div className="w-40 flex-shrink-0" />
                </div>
              </div>
            </>
          )}
        </div>
        <HeirloomSettingsModal />
      </ChakraProvider>
    </>
  );
}

function MemorialSlide(props) {
  return <div></div>;
}
