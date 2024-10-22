import React from "react";

const Addmenu = () => {
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A <span className="text-green"> New Menu </span>
      </h2>

      {/* form here */}
      <div>
        <form>
          <div className="form-control w-full my-6">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">What is your name?</span>
                <span className="label-text-alt">Top Right label</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addmenu;
