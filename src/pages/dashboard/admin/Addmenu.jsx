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
                <span className="label-text">Recepise Name*</span>
              </div>
              <input
                type="text"
                placeholder="Recepise Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </form>

        {/* 2nd row */}
        <div>
          {/* select item category */}
          <label className="form-control w-full  ">
            <div className="label">
              <span className="label-text">choose category</span>
            </div>
            <select className="select select-bordered">
              <option disabled selected>
                Select a category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
              <option value="popular">Popolar</option>
            </select>
          </label>

          {/* price */}

          <div>
            <form>
              <div className="form-control w-full my-6">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Recepise Name*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Recepise Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addmenu;
