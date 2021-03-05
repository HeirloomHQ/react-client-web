import React from "react";

export default function ExampleMemorialCard({ outlined }) {
  return (
    <div className="rounded-2xl bg-white shadow-lg w-64 pb-6">
      <div
        className={`h-40 rounded-t-xl ${
          outlined === "photo" && "border-4 border-heirloomOrange"
        }`}
        style={{
          backgroundImage: `url(/assets/img/default_cover_photo.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="mt-8 px-2 md:px-8">
        <h1 className="font-bold text-xl text-gray-800">{"Kobe Bryant"}</h1>
      </div>
      <p className="mt-1 px-2 md:px-8 text-gray-500 text-xs">
        <span
          className={
            outlined === "description"
              ? "border-4 border-heirloomOrange rounded-lg p-1"
              : undefined
          }
        >
          In loving memory
        </span>
      </p>
    </div>
  );
}
