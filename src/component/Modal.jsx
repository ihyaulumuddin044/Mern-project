import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuntContext } from "../context/AuntProvider";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sighUpWithGmail, login } = useContext(AuntContext);

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    login(email, password)
      .then((result) => {
        const user = result.user;
        alert("login successfully!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("provide a correct email and password");
      });
  };

  // google login
  const hendleLogin = () => {
    sighUpWithGmail()
      .then((result) => {
        const user = result.user;
        alert("login successfully!");
      })
      .catch((error) => console.log("login failed", error));
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login Please!</h3>

          {/* email */}
          <div className="modal-action flex flex-col justify-center mt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
              method="dialog"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
                />
              </div>

              {/* password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                />
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {/* error */}
                {
                  errorMessage? <p className="text-red text-xl italic">{errorMessage}</p> : " "
                }
              {/* login button */}
              <div className="form-control mt-6">
                <input type="submit" value={"Login"} className="btn bg-green" />
              </div>
              <p className="text-center my-2">
                don't have an account?{" "}
                <Link to="/signup" className="underline text-red ml-1">
                  Signup Now
                </Link>
              </p>
              <button
                htmlFor="my_modal_5"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            {/* social login */}
            <div className="text-center space-x-3 mb-7">
              <button
                className="btn btn-circle hover:bg-green hover:text-white"
                onClick={hendleLogin}
              >
                <FaGoogle />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaFacebookF />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaGithub />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
