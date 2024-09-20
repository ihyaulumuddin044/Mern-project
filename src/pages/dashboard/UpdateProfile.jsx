import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuntContext } from "../../context/AuntProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateProfileUser } = useContext(AuntContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateProfileUser(name, photoURL)
      .then(() => {
        // Profile updated!
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        console.error("Error updating profile:", error);

        // Optionally display a user-friendly error message
        if (error.code === "auth/network-request-failed") {
          alert("Network error, please try again later.");
        } else if (error.code === "auth/invalid-user-token") {
          alert("Session expired, please log in again.");
        } else {
          alert(
            "Failed to update profile. Please check your details and try again."
          );
        }
        console.log(photoURL)
        // ...
      });
  };
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h3 className='font-bold'>Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name", { required: "name is required" })} type="text" placeholder="your name" className="input input-bordered" required />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>

          <input type="text" {...register("photoURL", { required: "photo is required" })} placeholder="photoURL" className="input input-bordered" required />
          {errors.photoURL && <p className="text-red-500">{errors.name.message}</p>}
          {/* TODO: Uplodaing image will be later */}
          {/* <input type="file" className="file-input w-full max-w-xs" /> */}
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white">Update</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateProfile;
