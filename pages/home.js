import { useState, useRef, createRef, useEffect } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import CreateIcon from "@material-ui/icons/Create";

import DashNavbar from "../components/dashNavbar";
import HeirloomSettingsModal from "../components/heirloomSettingsModal";
import LoadingSpinner from "../components/loadingSpinner";
import { useUser, useUserMock } from "../lib/clientSideAuth";
import { useMemorials, useMemorialsMock } from "../lib/memorial";
import { CreateProvider } from "../components/createHeirloom/hooks";
import { CreateHeirloomModal } from "../components/createHeirloom";

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

  // reset memorial on initial load
  useEffect(() => {
    setMemorial();
  }, [setMemorial]);

  function openSettings(memorial) {
    setMemorial(memorial);
  }

  const [centeredCard, setCenteredCard] = useState(0);
  const [hovered, setHover] = useState(-1);

  const canManage = (memorial) => {
    if (user) {
      switch (memorial.canManage) {
        case "MEMBER":
          return ["OWNER", "MANAGER", "MEMBER"].includes(roles[memorial.id]);
        case "MANAGER":
          return ["OWNER", "MANAGER"].includes(roles[memorial.id]);
        case "OWNER":
          return roles[memorial.id] === "OWNER";
        default:
          return false;
      }
    }
    return false;
  };

  return userLoading || !user ? (
    <div className="bg-paper min-h-screen h-full">
      <LoadingSpinner />
    </div>
  ) : (
    <CreateProvider>
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
                      className="flex-shrink-0 rounded-3xl mx-10 flex flex-col justify-center items-center bg-black bg-opacity-20 w-11/12 bg-no-repeat bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${memorial.coverPhoto})`,
                      }}
                      key={memorial?.id + index}
                      onClick={() => {
                        if (index === centeredCard) {
                          router.push(`/memorial/${memorial.id}`);
                          return;
                        }
                        scroll(elRefs[index]);
                        setCenteredCard(index);
                      }}
                      ref={elRefs[index]}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(-1)}
                    >
                      <button
                        className={[
                          hovered === index &&
                          centeredCard === index &&
                          canManage(memorial)
                            ? ""
                            : "opacity-0 ",
                          "self-end rounded-md mr-8 mt-8 mb-auto ml-auto px-2 py-2 bg-black bg-opacity-40 text-white hover:bg-opacity-70 transition-all duration-150 focus:outline-none",
                        ].join(" ")}
                        onClick={(e) => {
                          openSettings(memorial);
                          e.stopPropagation();
                        }}
                      >
                        <CreateIcon
                          className="float-left mr-1 my-auto"
                          fontSize="small"
                        />
                        <span className="my-auto">Edit</span>
                      </button>
                      <p className="font-display text-7xl font-semibold text-white">{`${memorial?.firstName} ${memorial?.lastName}`}</p>
                      <p className="font-sans text-2xl font-semibold text-white mt-4">
                        {memorial?.description}
                      </p>
                      <div className="mt-auto" />
                    </div>
                  ))}
                  <div className="w-40 flex-shrink-0" />
                </div>
              </div>
            </>
          )}
        </div>
        <HeirloomSettingsModal />
        <CreateHeirloomModal />
      </ChakraProvider>
    </CreateProvider>
  );
}
