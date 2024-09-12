import React, { useEffect, useState } from "react";
import Cards from "../../component/Cards";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filtereditems, setFiltereditems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // loading data
  useEffect(() => {
    // faetching data from backend
    const fetchData = async () => {
      try {
        const response = await fetch("/Menu.json");
        const data = await response.json();
        console.log(data);
        setMenu(data);
        setFiltereditems(data);
      } catch (error) {
        console.log("data not found", error);
      }
    };
    fetchData();
  }, []);

  // filtering data based on category
  const filteritems = (category) => {
    const filter =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFiltereditems(filter);
    setSelectedCategory(category);
  };

  // show all of the data
  const showAll = () => {
    setFiltereditems(menu);
    setSelectedCategory("all");
  };

  // shorting by a-z, z-a low-high pricing, high-low pricing
 const hendleShorChange = (option) => {
   setSortOption(option);

   let shortedItem = [...filtereditems];

  //  logic
  switch(option){
    case "A-Z":
      shortedItem.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Z-A":
      shortedItem.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "low-high":
      shortedItem.sort((a, b) => a.price - b.price);
      break;
    case "high-low":
      shortedItem.sort((a, b) => b.price - a.price);
      break;
    default:
      // code block
      // setFiltereditems(menu);
  }
  setFiltereditems(shortedItem);
 } 

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering and sorting section */}

          {/* All Category buttons */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          <button onClick={showAll}>All</button>
          <button onClick={() => filteritems("salad")}>Salad</button>
          <button onClick={() => filteritems("pizza")}>Pizza</button>
          <button onClick={() => filteritems("soup")}>Soups</button>
          <button onClick={() => filteritems("dessert")}>Desserts</button>
          <button onClick={() => filteritems("drinks")}>Drinks</button>

        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {filtereditems.map((item) => (
            <Cards key={item.id} item={item} />
          ))
        }
        </div>
        {/* cards products */}
      </div>
    </div>
  );
};

export default Menu;
