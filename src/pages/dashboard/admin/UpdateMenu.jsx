import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import "/src/App.css";

const UpdateMenu = () => {
  const item = useLoaderData();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // loading hendler
  const [isloading, setIsLoading] = useState(false);

  // image hosting key
  const image_hosting_key = import.meta.env.VITE_hosting_image_API;
  // console.log(image_hosting_key);

  const image_upload = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit =  async (data) => {
    setIsLoading(true); // Set loading saat mulai proses
    try {
      const imageFile = { image: data.image[0] };
      const hostingImg = await axiosPublic.post(image_upload, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (hostingImg.data.success) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: hostingImg.data.data.display_url,
        };

        // Proses update menu di server
        await axiosSecure.patch(`/menu/${item._id}`, menuItem);
        
        reset(); // Reset form setelah sukses
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Item is updated successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/manage-items");
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false); // Kembali ke false setelah selesai
    }
  };
    // const imageFile = { image: data.image[0] };
    // const hostingImg = await axiosPublic.post(image_upload, imageFile, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // console.log(hostingImg);
    // if (hostingImg.data.success) {
    //   const menuItem = {
    //     name: data.name,
    //     category: data.category,
    //     price: parseFloat(data.price), 
    //     recipe: data.recipe,
    //     image: hostingImg.data.data.display_url
    //   };

    //   // console.log(menuItem);
    //   const postMenuItem = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
    //   if(postMenuItem){
    //     reset()
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Your Item is updated successfully!",
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   }
    // }
    
    
  // }

  console.log(item);


  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update This  <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={item.name}
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                defaultValue={item.price}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              defaultValue={item.recipe}
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your recipe"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6" disabled={isloading}>
            {isloading ? (
              <div className="spinner border-4 border-t-transparent border-white rounded-full w-5 h-5 mr-2"></div>
            ) : "Update"}<FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
