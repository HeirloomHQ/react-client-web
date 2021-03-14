import React from "react";
import BubbleElement, { defaultOptions } from "../lib/react-bubble-ui";
import companyData from "../components/companies";
import CompanyBubble from "../components/test";
import Head from "next/head";

export default function Explore() {
  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div>
        <BubbleElement options={defaultOptions} className="bubbleUI">
          {companyData.slice(0, 20).map((company, i) => (
            <CompanyBubble {...company} key={i} />
          ))}
        </BubbleElement>
      </div>
    </>
  );
}
