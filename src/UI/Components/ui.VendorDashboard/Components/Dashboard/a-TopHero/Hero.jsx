import Expenses from "../b-Expenses/Expenses";
import Category from "../c-TopCategory/Category"
const TopHero = () => {
  return (
    <>

      {/* Top Content*/}
      <div className="px-10 py-5">
        {/* top section 1 */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-3xl ">Welcome, Admin</h1>
            <p className="text-sm">
              You have{" "}
              <span className="text-green-500 font-semibold text-lg">200+</span>{" "}
              Orders, <span>Today</span>
            </p>
          </div>
          <div className="">
            <div className="flex items-center bg-gray-300 py-1 px-2 rounded-2xl text-gray-600">
              <i className="fa-solid fa-calendar text-orange-600"></i>
              <p>11/29/2025-11/4/2025</p>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="py-3 px-4 bg-red-200 rounded-full">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <i className="fa-solid fa-circle-info text-sm text-red-700 rounded-full"></i>
                <p className="text-black">
                  Your Product{" "}
                  <span className="text-red-500">
                    Apple Ipone 15 is running low,
                  </span>{" "}
                  already below 5 Pcs.{" "}
                  <span className="text-red-500">Add stock</span>
                </p>
              </div>
              <i class="fa-solid fa-xmark text-black"></i>
            </div>
          </div>
        </div>

        {/* top section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="flex flex-col sm:flex-row bg-[#fe9f43] text-gray-600 p-5 gap-4 rounded-lg shadow-md items-center sm:items-center">
            <div className="py-3 px-4 bg-white flex items-center justify-center rounded-lg shrink-0">
              <i className="fa-solid fa-book text-amber-400 text-3xl"></i>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-white">Total Sales</p>

              <div className="flex md:flex-col items-center md:items-start gap-2 text-xl text-white font-semibold mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  <p className="ml-0 md:ml-1 mt-1 md:mt-0">48,300,008</p>
                </div>
                <div className="flex items-center bg-white py-0.5 px-3 text-green-500 rounded-xl text-sm">
                  <i className="fa-solid fa-angle-up mr-1"></i>
                  +22%
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col sm:flex-row bg-[#2666a2] text-gray-600 p-5 gap-4 rounded-lg shadow-md items-center sm:items-center">
            <div className="py-3 px-4 bg-white flex items-center justify-center rounded-lg shrink-0">
              <i className="fa-solid fa-repeat text-[#092c4c] text-3xl"></i>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-white">Sales Return</p>

              <div className="flex md:flex-col items-center md:items-start gap-2 text-xl text-white font-semibold mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-indian-rupee-sign "></i>
                  <p className="ml-0 md:ml-1 mt-1 md:mt-0">1,200,500</p>
                </div>
                <div className="flex items-center bg-white py-0.5 px-3 text-red-500 rounded-xl text-sm">
                  <i className="fa-solid fa-angle-down mr-1"></i>
                  -5%
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col sm:flex-row bg-green-500 text-gray-600 p-5 gap-4 rounded-lg shadow-md items-center sm:items-center">
            <div className="py-3 px-4 bg-white flex items-center justify-center rounded-lg shrink-0">
              <i className="fa-solid fa-gift text-green-600 text-3xl"></i>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-white">Total Orders</p>

              <div className="flex md:flex-col items-center md:items-start gap-2 text-xl text-white font-semibold mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-hashtag"></i>
                  <p className="ml-0 md:ml-1 mt-1 md:mt-0">9,540</p>
                </div>
                <div className="flex items-center bg-white py-0.5 px-3 text-green-500 rounded-xl text-sm">
                  <i className="fa-solid fa-angle-up mr-1"></i>
                  +10%
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col sm:flex-row bg-blue-500 text-gray-600 p-5 gap-4 rounded-lg shadow-md items-center sm:items-center">
            <div className="py-3 px-4 bg-white flex items-center justify-center rounded-lg shrink-0">
              <i className="fa-solid fa-users text-blue-800 text-3xl"></i>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-white">New Customers</p>

              <div className="flex md:flex-col items-center md:items-start gap-2 text-xl text-white font-semibold mt-1">
                <div className="flex items-center">
                  <i className="fa-solid fa-hashtag"></i>
                  <p className="ml-0 md:ml-1 mt-1 md:mt-0">2,180</p>
                </div>
                <div className="flex items-center bg-white py-0.5 px-3 text-green-500 rounded-xl text-sm">
                  <i className="fa-solid fa-angle-up mr-1"></i>
                  +18%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div>
          <Expenses/>
        </div>

        {/* Center-2 Content */}
        <div>
          <Category/> 
        </div>
      </div>
    </>
  );
};

export default TopHero;
