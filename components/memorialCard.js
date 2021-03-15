import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import { useRouter } from "next/router";
import NavLink from "./navLink";

export default function MemorialCard({ memorial, role, onOpenSettings }) {
  const router = useRouter();
  const canEdit = !!role && ["OWNER", "MANAGER"].includes(role);

  return (
    <div className="rounded-2xl bg-white shadow-lg">
      <div
        className="h-40 rounded-t-xl "
        style={{
          backgroundImage: `url(${memorial.coverPhoto})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {canEdit ? (
          <button
            className="flex items-center rounded-md float-right m-3 px-2 py-2 bg-black bg-opacity-40 text-white hover:bg-opacity-70 transition-all duration-150 focus:outline-none"
            onClick={onOpenSettings}
          >
            <CreateIcon className="float-left mr-1 my-auto" fontSize="small" />
            <span className="my-auto">Edit</span>
          </button>
        ) : null}
      </div>
      <div className="mt-4 px-2 md:px-8 text-gray-500 text-xs">
        <span className=" text-sm"># new memories</span>
      </div>
      <NavLink  onClick={() => router.push({
        pathname: "/page",
        query: {
          mem_id: memorial.id, 
          firstname: memorial.firstName,
          lastname: memorial.lastName},
      })}>
      <div className="px-2  md:px-8">
        <h1 className="font-bold text-lg" >
          {memorial.firstName} {memorial.lastName}
        </h1> 
      </div>
      </NavLink>
      <p className="mt-1 mb-6 px-2 md:px-8 text-gray-500 text-xs">
        {memorial.description}
      </p>
    </div>
  );
}
