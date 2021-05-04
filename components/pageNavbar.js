import React from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";

// onPlusClick allows access
export default function PageNavbar({ onTextClick, onImageClick, onYoutubeClick }) {
  const router = useRouter();
  const OPTIONS = [
    {
      option: "Text",
      detail: "Write a memory in plain text.",
      src: "/assets/img/memorial/text-post.png",
      onClick: onTextClick,
    },
    {
      option: "Media",
      detail: "Add photos videos and audio clips.",
      src: "/assets/img/memorial/image-post.png",
      onClick: onImageClick,
    },
    {
      option: "YouTube",
      detail: "Embed a video from Youtube.",
      src: "/assets/img/memorial/youtube-post.png",
      onClick: onYoutubeClick,
    },
  ];

  return (
    <>
      <div className="w-full flex items-center px-24 py-4 bg-paper z-0">
        <div className="mx-auto flex  items-center">
          <input
            type="image"
            src="/assets/img/back-home-button.png"
            alt="Heirloom logo"
            height={35}
            width={40}
            onClick={() => router.push("/home")}
          />
        </div>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <div className="flex">
              <img
                className="cursor-pointer"
                src="/assets/img/add-new-button.png"
                alt="Heirloom logo"
                height={30}
                width={30}
                // onClick={onPlusClick}
              />
            </div>
          </PopoverTrigger>
          <Portal>
            <PopoverContent className="w-96">
              <PopoverBody>
                <div className="font-sans font-semibold text-xl mb-2">Add a Memory</div>
                {OPTIONS.map((opt, index) => (
                  <div
                    className="flex p-2 hover:bg-outlineButtonHover cursor-pointer"
                    key={`${opt.option}-${index}`}
                    onClick={opt.onClick}
                  >
                    <img
                      className="mr-2"
                      src={opt.src}
                      alt={opt.option}
                      height={48}
                      width={48}
                    />
                    <div className="flex flex-col">
                      <p className="font-sans font-semibold">{opt.option}</p>
                      <p className="font-sans font-normal">{opt.detail}</p>
                    </div>
                  </div>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </div>
      <hr />
    </>
  );
}
