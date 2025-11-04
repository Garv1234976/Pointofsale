const Expenses = () => {
    return(
        <>
       <div className="py-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Card 1 */}
    <div className="bg-gray-200 text-black py-4 px-3 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b border-b-gray-400 pb-4">
        <div className="text-xl font-extrabold">
          <div className="flex items-center">
            <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
            <span>8,458,789</span>
          </div>
          <div>
            <span className="text-lg font-semibold">Profit</span>
          </div>
        </div>
        <div className="flex items-start bg-blue-300 p-3 rounded-lg">
          <i className="fa-solid fa-layer-group text-xl text-blue-800"></i>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-2 text-sm sm:text-base">
        <div>
          <span className="text-green-800 font-semibold">+35% </span>
          <span>vs Last Month</span>
        </div>
        <div>
          <span className="underline cursor-pointer">View All</span>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-200 text-black py-4 px-3 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b border-b-gray-400 pb-4">
        <div className="text-xl font-extrabold">
          <div className="flex items-center">
            <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
            <span>8,458,789</span>
          </div>
          <div>
            <span className="text-lg font-semibold">Invoice Due</span>
          </div>
        </div>
        <div className="flex items-start bg-blue-300 p-3 rounded-lg">
          <i className="fa-solid fa-chart-pie text-xl text-blue-800"></i>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-2 text-sm sm:text-base">
        <div>
          <span className="text-green-800 font-semibold">+46% </span>
          <span>vs Last Month</span>
        </div>
        <div>
          <span className="underline cursor-pointer">View All</span>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-200 text-black py-4 px-3 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b border-b-gray-400 pb-4">
        <div className="text-xl font-extrabold">
          <div className="flex items-center">
            <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
            <span>8,458,789</span>
          </div>
          <div>
            <span className="text-lg font-semibold">Total Expenses</span>
          </div>
        </div>
        <div className="flex items-start bg-blue-300 p-3 rounded-lg">
          <i className="fa-solid fa-bullseye text-xl text-blue-800"></i>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-2 text-sm sm:text-base">
        <div>
          <span className="text-green-800 font-semibold">+90% </span>
          <span>vs Last Month</span>
        </div>
        <div>
          <span className="underline cursor-pointer">View All</span>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-gray-200 text-black py-4 px-3 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b border-b-gray-400 pb-4">
        <div className="text-xl font-extrabold">
          <div className="flex items-center">
            <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
            <span>8,458,789</span>
          </div>
          <div>
            <span className="text-lg font-semibold">Total Payment Returns</span>
          </div>
        </div>
        <div className="flex items-start bg-blue-300 p-3 rounded-lg">
          <i className="fa-solid fa-hashtag text-xl text-blue-800"></i>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-2 text-sm sm:text-base">
        <div>
          <span className="text-red-800 font-semibold">-20% </span>
          <span>vs Last Month</span>
        </div>
        <div>
          <span className="underline cursor-pointer">View All</span>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )   
}

export default Expenses