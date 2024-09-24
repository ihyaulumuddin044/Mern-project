import React from "react";

const CardPage = () => {
  return (
    <div className="section-container">
      <div className="section-container bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-32 flex flex-col  justify-center items-center ">
          {/* text */}
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-3xl font-bold md:leading-snug leading-snug m-0 ">
              Items Added To Cart
              <span className="text-green"> Food</span>
            </h2>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
