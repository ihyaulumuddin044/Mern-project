import React, { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuntContext } from "../context/AuntProvider";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, sighUpWithGmail, updateProfileUser } = useContext(AuntContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password).then((result) => {
      // Signed up 
      const user = result.user;
      updateProfileUser(data.name, data.photoURL).then(()=> {
        const userInfo = {
          name: data.name,
          email: data.email,
        }
        axios.post("http://localhost:6001/user", userInfo)
        .then((response) => {
          alert("signup successfully done!");
          navigate
        })
      }) 
      alert("Account creation successfully done!")
      document.getElementById("my_modal_5").close()
      navigate(from, {replace: true})
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })
  }
  
  // login with Gmail
  const handleRegister = () => {
    sighUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    <div className="mb-5">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Please Create An Account!</h3>
        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            placeholder="Your name"
            className="input input-bordered"
            {...register("name")}
          />
        </div>

        {/* email */}
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover mt-2">
              Forgot password?
            </a>
          </label>
        </div>

        {/* error message */}
        <p>{errors.message}</p>

        {/* submit btn */}
        <div className="form-control mt-6">
          <input
            type="submit"
            className="btn bg-green text-white"
            value="Sign up"
          />
        </div>

        <div className="text-center my-2">
          Have an account?
          <Link to="/login">
            <button className="ml-2 underline">Login here</button>
          </Link>
        </div>
      </form>
      <div className="text-center space-x-3">
        <button
          onClick={handleRegister}
          className="btn btn-circle hover:bg-green hover:text-white"
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
);
};

export default Signup;
