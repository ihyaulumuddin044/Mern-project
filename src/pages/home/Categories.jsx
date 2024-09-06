import React from 'react'

const Categories = () => {
    const categoriesItems = [
      {id:1, title: "Main Dish", des:"(68 Dishes)", image: "images/category/img1.png"},
      {id:2, title: "Break fast", des:"(12 Break Fast)", image: "images/category/img2.png"},
      {id:3, title: "Dessert", des:"(48 Dessert)", image: "images/category/img3.png"},
      {id:4, title: "Browse All", des:"(225 items)", image: "images/category/img4.png"},
     
    ]

  return (
    <div className='section-container'>
        <div className='text-center'>
      <p className='subtitle'>Customers favorites</p>
      <h2 className='title'>Popular Catagories</h2>
        </div>
        {/* categories card */}
        <div className='flex flex-col md:flex-row flex-wrap gap-8 items-center justify-around mt-12'>
            {
                categoriesItems.map((item, index) => (
                    <div key={index} className='shadow-lg raunded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300'>
                        <div className='flex justify-center w-full mx-auto items-center'>
                        <img src={item.image} alt="" className='bg-[#c1f1c6] p-5 rounded-full w-28 h-28' />
                        </div>
                        <div className='mt-5 space-y-2'>
                            <h5>{item.title}</h5>
                            <p>{item.des}</p>
                        </div>
                    </div>
                    
                ))
            }
        </div>
    </div>
  )
}

export default Categories
