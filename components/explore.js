import React from "react";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import companyData from "./companies";
import CompanyBubble from "./test";

export default function Explore(props) {
    const dummyColors = ["#F79256", "#FBD1A2", "#7DCFB6", "#00B2CA", "#1D4E89"];

    const getStockBubbles = () => {
        return companyData.slice(0, 20).map((company, i) => {
          return <CompanyBubble {...company} key={i} />;
        });
    };
    console.log("done")
    const stockBubbles = getStockBubbles();

    console.log(stockBubbles)
    const options = {
		size: 219,
		minSize: 31,
		gutter: 19,
		provideProps: false,
		numCols: 6,
		fringeWidth: 200,
		yRadius: 197,
		xRadius: 177,
		cornerRadius: 50,
		showGuides: false,
		compact: true,
		gravitation: 2
	}
   console.log("test")

const children = companyData.slice(0, 20).map((company, i) => {
        return <CompanyBubble {...company} key={i} />;
      });

    return (
        <div>hi
<BubbleUI options={options} className="bubbleUI">
		{children} hello
            </BubbleUI>
        </div>


        );
};
