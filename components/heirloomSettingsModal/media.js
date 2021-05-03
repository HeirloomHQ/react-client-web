import React from "react";
import Button from "../button";

/* requests is using current members' for some sample data,
 * expectation is that requests will contain every addMemorial request to the backend
 */
export default function MediaTab({requests, memorial}) {
  const role = "OWNER";
  const firstNameMemorial = memorial.firstName;

  return (
    <div className="flex-grow overflow-y-auto px-16">
      <div className="mt-8 mb-4">
        {requests.length ? (
          requests.map((req) => (
            <>
              <Requests
                firstName={req.firstName}
                lastName={req.lastName}
                imgSrc={req.profilePicture}
                memName={firstNameMemorial}
              />
              <div className="mb-4">
                <img
                  className="rounded-lg pt-2 pb-5"
                  src={"/assets/img/media-tab-example.png"}
                  width={320}
                  height={180}
                  alt="cover-photo"
                />
              </div>
              <hr />
            </>
          ))
        ) : (
          <p className="mt-4 text-gray-500 font-sans">
            Adding memoir requests will appear here. 
          </p>
        )}
      </div>
    </div>
  );
}

function Requests({firstName, lastName, imgSrc, memName}) {
  
    return (
      <div className="w-full h-full py-2 flex flex-start">
        <div className="w-12 h-12">
          <img
            className="rounded-full border border-gray-100 shadow-sm h-full object-cover"
            src={imgSrc || "https://i.stack.imgur.com/l60Hf.png"}
            alt="user image"
          />
        </div>
        <div className="ml-2 flex flex-col justify-center self-stretch">
                <div className="font-semibold">{`${firstName} ${lastName}` } 
                    <span className = "font-normal"> {` wants to add a photo to ${memName}'s Heirloom`}</span>
                </div>
                <div className="text-sm text-gray-500"> {"4 hours ago"}</div>
        </div>
        <Button className="ml-auto">
              Dismiss
        </Button>
        <Button variant="filled" className="ml-5">
              Add to Heirloom
        </Button>     
      </div>
    );
  }


