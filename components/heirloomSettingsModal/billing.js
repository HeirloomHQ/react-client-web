import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react"

export default function PrivacyTab(price, expirationYear, cardType, cardNumber, BillingInfo) {
  const role = "OWNER";

  return (
    <div className="flex-grow overflow-y-auto px-16">
      <div className="mt-8 mb-4">
        {
            <>
              <Question 
                question={"Plan"}
                subtext={"Your Heirloom page membership costs N/A / year and will renew on N/A "}
                buttonText={"Change Plan"}
              />
            </>
          
        }
        <hr />
        {
            <>
              <Question 
                question={"Credit Card"}
                subtext={" N/A ending in N/A"}
                buttonText={"Update"}
              />
            </>
          
        }
        <hr />
        {
            <>
              <Question 
                question={"Billing Information"}
                subtext={"N/A"}
                buttonText={"Update"}
              />

            </>
          
        }
      </div>
    </div>
  );
}

function Question({question, subtext, buttonText }){
    return (
        <div className="w-full h-full py-9 flex flex-start">
            <div className="w-43 h-12">
                    <div className="ml-2 flex flex-col font-semibold justify-center self-stretch">
                        <div className="text-xl">{question}</div>
                        <div className=" font-medium text-sm text-gray-500 pb-5 pt-4">{subtext}</div>
                    </div>
            </div>
                <Button colorScheme="red" className="ml-auto" variant="ghost" >
                    {buttonText}
                </Button>
                 
            
        </div>
    );

}

