import React from "react";

const Benners = () => {
  return (
    <div className="section-container bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center ">
         {/* image */}
         <div className="w-1/2">
          <img src="../images/banner.png" alt="" />

          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="flex bg-white py-2 px-3 rounded-xl items-center gap-3 shadow-md w-[270px]">
              <img src="../images/b-food1.png" alt="" className="rounded-2xl" />
              <div>
                <h5 className="font-medium mb-1 ">spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                </div>
                <p className="text-red my-2">$15.00</p>
              </div>
            </div>
            <div className="md:flex hidden bg-white py-2 px-3 rounded-xl items-center gap-3 shadow-md w-[270px]">
              <img src="../images/b-food1.png" alt="" className="rounded-2xl" />
              <div>
                <h5 className="font-medium mb-1 ">spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                  />
                </div>
                <p className="text-red my-2">$15.00</p>
              </div>
            </div>
          </div>
        </div>
        {/* text */}
        <div className="w-1/2">
          <h2 className="md:text-5xl text-3xl font-bold md:leading-snug leading-snug m-0 ">
            Dive into Delights Of Delectable
            <span className="text-green"> food</span>
          </h2>
          <p className="text-xl text-[#4a4a4a] mt-4">

            Where Each Plate Weaves a Story of Culinary Mastery <br />
            and Passionate Craftsmanship
          </p>
          <button className="btn bg-green text-white px-8 py-4 rounded-full mt-8">
            Order Now
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default Benners;
