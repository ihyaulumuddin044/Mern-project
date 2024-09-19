import React from "react";

const UpdateProfile = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
            <h3 className="font-bold">Update your Profile!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload your photo</span>
            </label>
            <input type="file" className="file-input w-full max-w-xs mt-4" />
          </div>
          <div className="form-control mt-6">
            <button className="btn  bg-green text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
