import React, { useEffect, useState } from "react";
import Cards from "../../component/Cards";
import { FaFilter } from "react-icons/fa";
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
    switch (option) {
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
  };

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
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* All Category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filteritems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filteritems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filteritems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filteritems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filteritems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>
          {/* shorting base filtering */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>
            {/* shorting option */}
            <select
              name="short"
              id="shor"
              onChange={(e) => hendleShorChange(e.target.value)}
              value={sortOption}
              className="bg-black py-2 px-1 text-white rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-high">Low-High</option>
              <option value="high-low">High-Low</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {filtereditems.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
        {/* cards products */}
      </div>
    </div>
  );
};

export default Menu;
