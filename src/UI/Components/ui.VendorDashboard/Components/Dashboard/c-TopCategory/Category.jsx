import TopCategoryChart from "../../../utils/GroupedChart";

const Category = () => {
  return (
    <>
      {/* Responsive grid wrapper */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* === Top Selling Products === */}
          <div className="bg-gray-200 rounded-lg">
            <div className="border-b-2 border-b-gray-500">
              <div className="text-black p-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-300 p-2 rounded-lg flex items-center">
                      <i className="fa-solid fa-cube text-2xl text-red-700"></i>
                    </div>
                    <p className="text-2xl">Top Selling Products</p>
                  </div>
                  <div className="flex items-center bg-gray-300 py-2 px-3 rounded-md">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-calendar-check text-blue-400"></i>
                      <p>Today</p>
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-black py-4 px-3">
              <div className="flex justify-between border-b py-3 border-b-gray-400">
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div>
                    <p className="text-lg">Charger Cable -Lighting</p>
                    <p className="text-sm">
                      ₹187 <span>•</span> 247+ Sales
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-1 border border-green-400 px-2 py-0.5 rounded-lg text-green-600">
                    <i className="fa-solid fa-arrow-up text-xs -rotate-45"></i>
                    <p>25%</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-b py-3 border-b-gray-400">
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div>
                    <p className="text-lg">Charger Cable -Lighting</p>
                    <p className="text-sm">
                      ₹187 <span>•</span> 247+ Sales
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-1 border border-red-400 px-2 py-0.5 rounded-lg text-red-600">
                    <i className="fa-solid fa-arrow-up text-xs -rotate-45"></i>
                    <p>25%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === Low Stock Products === */}
          <div className="bg-gray-200 rounded-lg">
            <div className="border-b-2 border-b-gray-500">
              <div className="text-black p-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-300 p-2 rounded-lg flex items-center">
                      <i className="fa-solid fa-triangle-exclamation text-2xl text-red-700"></i>
                    </div>
                    <p className="text-2xl">Low Stock Products</p>
                  </div>
                  <div className="flex items-center bg-gray-300 py-2 px-3 rounded-md">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-calendar-check text-blue-400"></i>
                      <p>Weekly</p>
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-black py-4 px-3">
              <div className="flex justify-between border-b py-3 border-b-gray-400">
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div>
                    <p className="text-lg">Charger Cable -Lighting</p>
                    <p className="text-sm">
                      ₹187 <span>•</span> 247+ Sales
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-2 py-0.5">
                  <p>Instock</p>
                  <p className="text-red-500">08</p>
                </div>
              </div>

              <div className="flex justify-between border-b py-3 border-b-gray-400">
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div>
                    <p className="text-lg">Charger Cable -Lighting</p>
                    <p className="text-sm">
                      ₹187 <span>•</span> 247+ Sales
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-2 py-0.5">
                  <p>Instock</p>
                  <p className="text-red-500">08</p>
                </div>
              </div>
            </div>
          </div>

          {/* === Recent sales === */}
          <div className="bg-gray-200 rounded-lg">
            <div className="border-b-2 border-b-gray-500">
              <div className="text-black p-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-300 p-2 rounded-lg flex items-center">
                      <i className="fa-solid fa-calendar text-2xl text-red-700"></i>
                    </div>
                    <p className="text-2xl">Recent Sales</p>
                  </div>
                  <div className="flex items-center bg-gray-300 py-2 px-3 rounded-md">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-calendar-check text-blue-400"></i>
                      <p>Weekly</p>
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-black py-4 px-3">
              <div className="flex justify-between border-b py-3 border-b-gray-400">
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div>
                    <p className="text-lg">Charger Cable -Lighting</p>
                    <p className="text-sm">
                      Electronics <span className="text-red-600 font-bold">•</span> ₹187
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-2 py-0.5">
                  <p>Today</p>
                   <div className="flex gap-1 bg-blue-700 px-3 rounded-lg font-semibold text-white">
                     <span>•</span>
                     <p>Processing</p>
                   </div>
                </div>
              </div>
              <div className="flex justify-between border-b py-3 border-b-gray-400">
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div>
                    <p className="text-lg">Charger Cable -Lighting</p>
                    <p className="text-sm">
                      Electronics <span className="text-red-600 font-bold">•</span> ₹187
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-2 py-0.5">
                  <p>Today</p>
                   <div className="flex gap-1 bg-green-500 px-3 rounded-lg font-semibold text-white">
                     <span>•</span>
                     <p>Completed</p>
                   </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>



        {/* === Recent Transaction === */}
        {/* <div className="py-4 flex">
              <div>
                <div className="bg-gray-200 rounded-lg">
            <div className="border-b-2 border-b-gray-400">
              <div className="text-black p-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-300 p-2 rounded-lg flex items-center">
                      <i className="fa-solid fa-flag text-2xl text-red-700"></i>
                    </div>
                    <p className="text-2xl">Recent Transaction</p>
                  </div>
                  <div className="flex items-center bg-gray-300 py-2 px-3 rounded-md">
                    <p className="underline">View All</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-black py-4 px-3">
              <nav className="px-12">
                <ul className="flex justify-between text-xl">
                  <li className="text-xl">Sale</li>
                  <li>Purchase</li>
                  <li>Quotation</li>
                  <li>Expenses</li>
                  <li>Invoices</li>
                </ul>
              </nav>

              <ul className="flex justify-between px-5 bg-gray-300 text-[18px] rounded">
                <li>Date</li>
                <li>Customer</li>
                <li>Status</li>
                <li>Total</li>
              </ul>

              <ul className="flex justify-between px-3 items-center py-3">
                <li>24 May 2004</li>
                <li>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                      alt=""
                      className="w-[3.5rem] rounded-lg"
                    />
                    <div>
                      <p>Andrea Willer</p>
                      <span>#123456</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-1 bg-red-500 px-3 rounded-lg font-semibold text-white">
                    <span>•</span>
                    <p>Draft</p>
                  </div>
                </li>
                <li>
                  <p>₹ 4,544</p>
                </li>
              </ul>

              <ul className="flex justify-between px-3 items-center py-3">
                <li>24 May 2004</li>
                <li>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                      alt=""
                      className="w-[3.5rem] rounded-lg"
                    />
                    <div>
                      <p>Andrea Willer</p>
                      <span>#123456</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-1 bg-green-500 px-3 rounded-lg font-semibold text-white">
                    <span>•</span>
                    <p>Completed</p>
                  </div>
                </li>
                <li>
                  <p>₹ 4,544</p>
                </li>
              </ul>
            </div>
          </div>
              </div>

              <div className="w-full">
                <TopCategoryChart/>
              </div>
        </div> */}
        <TopCategoryChart/>

      </div>
    </>
  );
};

export default Category;