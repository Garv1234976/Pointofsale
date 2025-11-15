import { useState, useEffect } from "react";
import { useAuth } from "../../../../../../Contexts/Global/VendorContext";
import { useSnackbar } from "../../../../../../Utils/SnackBar/Message";
import api from "../../../../../../Services/SalesPulse-backend";

export default function UpdateVendorStore() {
  const { vendor, refreshVendor } = useAuth();
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

  const store = vendor?.storeId;

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

  useEffect(() => {
    if (store) {
      setStoreData({
        storeName: store.storeName || "",
        storeCategory: store.storeCategory || "",
        companyName: store.companyName || "",
        gstNumber: store.gstNumber || "",
        vendorId: vendor?._id,
        storeLogo: null, // keep null until user uploads a new logo
        storeAddress: store.storeAddress?.length
          ? store.storeAddress
          : [{ localArea: "", city: "", state: "", pincode: "" }],
      });

      if (store.storeLogo) {
        setStoreLogoPreview(`http://localhost:3000/uploads/${store.storeLogo}`);
      }
    }
  }, [store, vendor]);

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
      setStoreLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const data = new FormData();

      data.append("storeName", storeData.storeName);
      data.append("storeCategory", storeData.storeCategory);
      data.append("companyName", storeData.companyName);
      data.append("gstNumber", storeData.gstNumber);
    //   data.append("vendorId", storeData.vendorId);
      if (storeData.storeLogo) {
        data.append("storeLogo", storeData.storeLogo);
      }
      const cleanedAddress = storeData.storeAddress.map(({ _id, ...rest }) => rest);
    data.append("storeAddress", JSON.stringify(cleanedAddress));

    //   data.append("storeAddress", JSON.stringify(storeData.storeAddress));

      const res = await api.put(
        `/api/vendorStore/vendorStoreCrud/${store._id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showSuccess("Store updated successfully!");
      await refreshVendor();
    } catch (err) {
      console.error("UPDATE FAILED →", err.response?.data);
      showError(err.response?.data?.message || "Update failed");
    }
  };

  if (!store) return <h3>No store found!</h3>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Update Store</h2>

      {/* Logo Preview */}
      {storeLogoPreview && (
        <div className="mt-4 flex justify-center">
          <img
            src={storeLogoPreview}
            alt="Store Logo"
            className="w-32 h-32 rounded-full object-cover border shadow"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleStoreLogo}
        className="mt-3"
      />

      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <input
            name="storeName"
            value={storeData.storeName}
            onChange={handleStoreChange}
            className="input"
            placeholder="Store Name"
          />
          <select
            name="storeCategory"
            value={storeData.storeCategory}
            onChange={handleStoreChange}
            className="input"
          >
            <option value="">Select Category</option>
            <option value="grocery">Grocery</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="restaurant">Restaurant</option>
            <option value="pharmacy">Pharmacy</option>
          </select>

          <input
            name="companyName"
            value={storeData.companyName}
            onChange={handleStoreChange}
            className="input"
            placeholder="Company Name"
          />

          <input
            name="gstNumber"
            value={storeData.gstNumber}
            onChange={handleStoreChange}
            className="input"
            placeholder="GST Number"
          />
        </div>

        {/* Address */}
        <div className="mt-4">
          <h4 className="text-gray-700 font-semibold mb-2">Store Address</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="localArea"
              value={storeData.storeAddress[0].localArea}
              onChange={(e) => handleAddressChange(e, 0)}
              className="input"
              placeholder="Local Area"
            />
            <input
              name="city"
              value={storeData.storeAddress[0].city}
              onChange={(e) => handleAddressChange(e, 0)}
              className="input"
              placeholder="City"
            />
            <input
              name="state"
              value={storeData.storeAddress[0].state}
              onChange={(e) => handleAddressChange(e, 0)}
              className="input"
              placeholder="State"
            />
            <input
              name="pincode"
              value={storeData.storeAddress[0].pincode}
              onChange={(e) => handleAddressChange(e, 0)}
              className="input"
              placeholder="Pincode"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md"
          onClick={handleUpdate} 
        >
          Update Store
        </button>
      </form>

      {SnackbarComponent}
    </div>
  );
}
