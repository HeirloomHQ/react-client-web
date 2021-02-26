import React, { Component } from "react";
import CreateIcon from "@material-ui/icons/Create";
export default function MemorialCard(person) {
  const dummyperson = {
    firstName: "Jimmy",
    lastName: "John",
  };
  const canEdit = true;

  return (
    <div className="h-72 rounded-2xl border-black border-2">
      <div
        className="h-40 rounded-t-xl"
        style={{
          backgroundImage:
            "url(" +
            "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {canEdit ? (
          <button
            className="h-12 w-auto rounded-md float-right m-4 px-2 py-0  "
            style={{
              color: "white",
              backgroundColor: `rgb(0,0,0, 0.4)`,
            }}
          >
            <span>
              <CreateIcon className="float-left mr-2" />
              Edit{" "}
            </span>
          </button>
        ) : null}
      </div>
      <div className="px-2 py-3 md:px-8">
        <span className=" text-sm"># new memories</span>
      </div>
      <div className="px-2  md:px-8">
        <h1 className="font-bold text-lg">
          {dummyperson.firstName} {dummyperson.lastName}
        </h1>
      </div>
      <div className="px-2 py-0 md:px-8">
        <span className=" text-md">pageDescription</span>
      </div>
    </div>
  );
}
