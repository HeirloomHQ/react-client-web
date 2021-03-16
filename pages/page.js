import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Button from "../components/button";
import PageNavbar from "../components/pageNavbar";

import React from "react";
import BubbleElement, { defaultOptions } from "../lib/react-bubble-ui";
import companyData from "../components/companies";
import CompanyBubble from "../components/test";

export default function Home() {
	const router = useRouter();
	console.log(router.query.mem_id);
	const memorial_id = router.query.mem_id
	const firstname = router.query?.firstname
	const lastname = router.query?.lastname
  return (
    <>
      <Head>
        <title>{firstname}</title>
      </Head>
	  <PageNavbar />
      <div>
        <div className="landing bg-paper w-full h-full">
		  <div className="bubble-container">
				<BubbleElement options={defaultOptions} className="bubbleUI">
				{companyData.slice(0, 20).map((company, i) => (
					<CompanyBubble {...company} key={i} />
				))}
				</BubbleElement>
          </div>
        </div>
      </div>
    </>
  );
}