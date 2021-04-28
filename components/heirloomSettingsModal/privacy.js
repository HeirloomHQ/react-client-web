import React, { useState, useEffect } from "react";

export default function PrivacyTab() {
  const role = "OWNER";

  return (
    <div className="flex-grow overflow-y-auto px-16">
      <div className="mt-8 mb-4">
        {
            <>
              <Question 
                question={"Invited members can post content without approval"}
                subtext={"ewfwe"}
              />
            </>
          
        }
        {
            <>
              <Question 
                question={"Disable page visitors from submitting content"}
                subtext={"wefwefwe"}
              />
            </>
          
        }
        {
            <>
              <Question 
                question={"Disable content export"}
                subtext={"This will prevent anyone from downloading photos and videos"}
              />

            </>
          
        }
      </div>
    </div>
  );
}

function Question({question, subtext}){
    return (
        <div className="w-full h-full py-2 flex flex-start">
            <div className="w-50 h-12">
                    <div className="ml-2 flex flex-col font-medium justify-center self-stretch">
                        <div>{question}</div>
                        <div className="text-sm text-gray-500">{subtext}</div>
                    </div>
            </div>
            <div class="onoffswitch ml-auto">
                <input type="checkbox"  />
            </div>
        </div>
    );

}

