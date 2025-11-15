import { useState } from "react";
import { useAuth } from "../../../../../../Contexts/Global/VendorContext";
import { useSnackbar } from "../../../../../../Utils/SnackBar/Message";
import { useNavigate } from "react-router-dom";
import api from "../../../../../../Services/SalesPulse-backend";

const AddVendorStore = () => {
    const { vendor } = useAuth();
    const navigate = useNavigate();
    const { showSuccess, showError, SnackbarComponent } = useSnackbar();

    const [storeData, setStoreData] = useState({
        storeName: "",
        storeCategory: "",
        companyName: "",
        gstNumber: "",
        vendorId: vendor?._id,

        storeLogo: null,

        storeAddress: [
            {
                localArea: "",
                city: "",
                state: "",
                pincode: "",
            },
        ],
    });
    const [storeLogoPreview, setStoreLogoPreview] = useState(null);



    const handleStoreChange = (e) => {
        setStoreData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const handleAddressChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAddress = [...storeData.storeAddress];
        updatedAddress[index][name] = value;

        setStoreData((prev) => ({
            ...prev,
            storeAddress: updatedAddress,
        }));
    };

    const handleStoreLogo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStoreData((prev) => ({
                ...prev,
                storeLogo: file,
            }));
            const imageUrl = URL.createObjectURL(file);
            setStoreLogoPreview(imageUrl);
        }
    };

    const handleStoreSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("storeName", storeData.storeName);
        data.append("storeCategory", storeData.storeCategory);
        data.append("companyName", storeData.companyName);
        data.append("gstNumber", storeData.gstNumber);
        data.append("vendorId", storeData.vendorId);
        data.append("storeLogo", storeData.storeLogo);
        data.append("storeAddress", JSON.stringify(storeData.storeAddress));
        try {
            const res = await api.post("/api/vendorStore/createVendorStore", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("success", res);

            if (res.status === 201) {
                console.log(res);
                showSuccess(res?.data?.message);

                setTimeout(() => {
                    navigate("/vendordashboard");
                }, 2500);
            }
        } catch (err) {
            console.log(err);
            showError(err.response?.data?.message);
            console.error("ERROR:", err.response?.data);
        }
    };
    return (
        <>
            <div className="text-gray-800  ">
                <div className="flex items-start gap-3">
                    <div className=" bg-gray-200 px-3 py-1 rounded">
                        <p className="mt-1 text-xs md:text-sm leading-relaxed underline font-semibold">
                            <span className="font-bold text-red-500">*Remember </span>
                            Please ensure all your business verification details and
                            documents are accurate and complete. Once you submit the
                            form, our POS admin team will review your application.
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-3">
                    <p className="text-xs md:text-sm font-semibold">
                        Verification Time:{" "}
                        <span className="font-medium">Within 4 hours</span>, our
                        team will verify your business information.
                    </p>
                </div>


            </div>
            <h3 className="text-base font-semibold mt-5 mb-3 text-gray-700 flex items-center gap-2">
                Store Details
            </h3>

            <form onSubmit={handleStoreSubmit} encType="multipart/form-data">
                {/* Store Logo */}
                <div className="h-[80vh] overflow-y-auto pr-2 md:max-h-none md:overflow-visible">
                    <div className="">
                        {storeLogoPreview && (
                            <div className="mt-3 flex justify-center">
                                <img
                                    src={storeLogoPreview}
                                    alt="Store Logo Preview"
                                    className="w-32 h-32 rounded-full object-cover shadow-md border"
                                />
                            </div>
                        )}
                        <label className="text-gray-700 font-semibold">
                            Store Logo
                        </label>

                        <input
                            type="file"
                            name="storeLogo"
                            accept="image/*"
                            onChange={handleStoreLogo}
                            className="input w-full mt-1 mb-4"
                        />
                    </div>
                    <div className="grid   md:grid-cols-2 gap-4">
                        {/* Store Name */}
                        <div className="">
                            <input
                                name="storeName"
                                value={storeData.storeName}
                                onChange={handleStoreChange}
                                placeholder="Store Name"
                                className="input w-full"
                            />
                        </div>

                        {/* Store Category */}
                        <div className="">
                            <select
                                name="storeCategory"
                                value={storeData.storeCategory}
                                onChange={handleStoreChange}
                                className="input w-full"
                            >
                                <option value="">Select Category</option>
                                <option value="grocery">Grocery</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="pharmacy">Pharmacy</option>
                                <option value="hardware">Hardware</option>
                                <option value="books">Books</option>
                                <option value="cosmetics">Cosmetics</option>
                                <option value="others">Others</option>
                            </select>
                            {/* <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">*</span> */}
                        </div>

                        {/* Company Name */}
                        <div className="">
                            <input
                                name="companyName"
                                value={storeData.companyName}
                                onChange={handleStoreChange}
                                placeholder="Company Name / Business Name"
                                className="input w-full"
                            />
                        </div>

                        {/* GST Number */}
                        <div className="">
                            <input
                                name="gstNumber"
                                value={storeData.gstNumber}
                                onChange={handleStoreChange}
                                placeholder="GST Number"
                                className="input w-full"
                            />
                        </div>

                        {/* ADDRESS */}
                        <div className="md:col-span-2">
                            <h4 className="text-gray-700 font-semibold mt-3 mb-1">
                                Store Address
                            </h4>

                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <input
                                    name="localArea"
                                    value={storeData.storeAddress[0].localArea}
                                    onChange={(e) => handleAddressChange(e, 0)}
                                    placeholder="Local Area"
                                    className="input w-full"
                                />

                                <input
                                    name="city"
                                    value={storeData.storeAddress[0].city}
                                    onChange={(e) => handleAddressChange(e, 0)}
                                    placeholder="City"
                                    className="input w-full"
                                />

                                <input
                                    name="state"
                                    value={storeData.storeAddress[0].state}
                                    onChange={(e) => handleAddressChange(e, 0)}
                                    placeholder="State"
                                    className="input w-full"
                                />

                                <input
                                    name="pincode"
                                    value={storeData.storeAddress[0].pincode}
                                    onChange={(e) => handleAddressChange(e, 0)}
                                    placeholder="Pincode"
                                    className="input w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div
                        className="
                        w-full 
                        flex justify-center 
                        md:justify-end   
                        fixed bottom-0 left-0 z-10 
                        md:static md:bg-transparent
                        p-3
                    "
                    >
                        <button
                            type="submit"
                            className="bg-[#07575b] hover:bg-gray-300 hover:text-black px-10 py-2 text-white font-semibold text-xl rounded cursor-pointer"
                        >
                            Create Store
                        </button>
                    </div>
                </div>

            </form>
            {SnackbarComponent}
        </>
    )
}

export default AddVendorStore;