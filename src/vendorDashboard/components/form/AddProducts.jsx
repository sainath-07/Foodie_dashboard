import React from 'react'

const AddProducts = () => {
    return (
        <div className="mt-8 mx-auto w-[550px] px-8 h-[550px]" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <form className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-center">Add Product</h2>
    
            <label htmlFor="productName" className="font-semibold">
            ProductName
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
              id="productName"
              name="productName"
              placeholder="ProductName"
            />
    
            <label htmlFor="price" className="font-semibold">
            Price
            </label>
            <input
              type="text"
              id="price"
              className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
              name="price"
              placeholder="Enter price"
            />
    
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <div className="flex gap-2 justify-center items-center">
              <div>
                <label htmlFor="Veg">Veg</label>
                <input
                  type="checkbox"
                  id="veg"
                  name="veg"
                  className="h-[25px] w-[25px] m-2"
                />
              </div>
              <div>
                <label htmlFor="Non-veg">Non-veg</label>
                <input
                  type="checkbox"
                  id="Non-veg"
                  name="Non-veg"
                  className="h-[25px] w-[25px] m-2"
                />
              </div>
            </div>
    
            <label htmlFor="bestSeller" className="font-semibold">
            BestSeller
            </label>
    
            <div className="flex justify-center items-center ">
           
              <div>
                <label htmlFor="yes">Yes</label>
                <input type="checkbox" id="yes" name="yes" className="h-[25px] w-[25px] m-2"/>
              </div>
              <div>
                <label htmlFor="no">No</label>
                <input type="checkbox" id="no" name="no" className="h-[25px] w-[25px] m-2"/>
              </div>
            </div>
    
            <label htmlFor="description" className="font-semibold">Description</label>
            <input type="text" id="description" className="border-2 h-12 border-gray-300 w-[90%] rounded text-xl pl-2"
            />
    
            <div className='mt-3'>
              <label htmlFor="ProductImage" className="font-semibold">
                ProductImage
              </label>
              <input type="file" />
            </div>
     
            <div className="text-center mt-2">
              <button type="submit" className="bg-black p-2 px-3 rounded text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}

export default AddProducts
