import React, { useState, useEffect } from "react";
import SettingLabel from "./settingsLabel";

export default function DonationsTab() {
  const role = "OWNER";

  return (
    <div className="flex-grow overflow-y-auto px-16">
      <div className="mt-8 mb-4">
        {
            <>
              <Question 
                question={"Want to collect donations on this Heirloom page?"}
              />
            </>
          
        }
      </div>
    </div>
  );
}

function Question({question}){
    return (
        <div className="w-full h-full py-2 flex flex-start">
            <div className="w-50 h-12">
                    <div className="ml-2 flex flex-col justify-center self-stretch font-semibold">
                        <SettingLabel help="Collect monetary donations?" >
                            {question}
                        </SettingLabel>
                    </div>
            </div>
        </div>
    );

}

