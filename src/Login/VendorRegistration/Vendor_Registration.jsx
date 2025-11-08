import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Poster from "/pos.png";
import { useNavigate } from "react-router-dom";

// Api router
import api from "../../Services/SalesPulse-backend";
export default function VendorForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // const [formData, setFormData] = useState({
  //   fullname: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   confirmPassword: "",
  //   storeName: "",
  //   storeCategory: "",
  //   storeDescription: "",
  //   storeAddress: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  //   businessRegNumber: "",
  //   gstId: "",
  //   businessLicense: null,
  //   idProof: null,
  // });

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    userName: "",
    fullName: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.userName ||
      !formData.fullName
    ) {
      setError("All required fields must be filled");
      return;
    }
    const data = new FormData();

    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("password", formData.password);
    data.append("userName", formData.userName);
    data.append("fullName", formData.fullName);

    if (profileImg) {
      data.append("profileImg", profileImg);
    }

    try {
      const res = await api.post("/api/vendor/createVendorProfile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("SUCCESS:", res.data);
    } catch (err) {
      console.error("ERROR:", err.response?.data);
    }
  };

  const slideVariants = {
    initial: { scale: 0.9, opacity: 0, y: 30 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: -30 },
  };

  return (
    <div className="flex flex-wrap  bg-gray-100 ">
      <div className="hidden xl:flex w-[40%] h-screen ">
        <img src={Poster} alt="POS Poster" className="w-full bg-amber-500" />
      </div>
      <div className="h-screen bg-gray-100 max-xl:w-full w-[60%]  relative z-0   ">
        <div className="fixed h-[4rem] bg-[#07575b] w-full px-10 py-2">
          <div>
            <div className="text-3xl font-bold text-left mb-2 text-white">
              <h2 className=" ">Vendor Registration_</h2>
            </div>
            <hr className="border-b-2 w-20 text-gray-400" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.1 }}
              className="py-2"
              style={{ marginTop: "90px", paddingInline: "2.5rem" }}
            >
              <h3 className="text-2xl py-5 ">Basic Information</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                  {/* this is Vendor Profile picture  */}
                  <div className="mt-4 flex flex-col items-center">
                    <div
                      className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer flex items-center justify-center p-2"
                      onClick={() =>
                        document.getElementById("profileImgInput").click()
                      }
                    >
                      {previewImg ? (
                        <img
                          src={previewImg}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fa-solid fa-image text-gray-400 text-4xl"></i>
                      )}
                    </div>

                    {/* Hidden File Input */}
                    <input
                      id="profileImgInput"
                      type="file"
                      name="profileImg"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="flex justify-between items-center border-b-2 border-gray-500 mb-4">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hello@vendor.com"
                      className="input border-none text-xl"
                    />
                    <span className="text-lg font-semibold text-gray-400">
                      EMAIL
                    </span>
                    <span className="text-red-700 font-bold text-2xl">*</span>
                  </div>

                  <div className="flex justify-between items-center border-b-2 border-gray-500 mb-4">
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 00000-00000"
                      className="input border-none text-xl"
                    />
                    <span className="w-50 text-right text-lg font-semibold text-gray-400">
                      PHONE NUMBER
                    </span>
                    <span className="text-red-700 font-bold text-2xl">*</span>
                  </div>

                  <div className="flex justify-between items-center border-b-2 border-gray-500 mb-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="password(#2@)er"
                      className="input border-none text-xl"
                    />
                    <div className="flex items-center gap-5">
                      <i className="fa-solid fa-eye-slash text-gray-500"></i>
                      <div className="flex items-center">
                        <span className="text-lg font-semibold text-gray-800">
                          PASSWORD
                        </span>
                        <span className="text-red-700 font-bold text-2xl">
                          *
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-b-2 border-gray-500">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="password(#2@)er"
                      className="input border-none text-xl"
                    />
                    <div className="flex place-items-center ">
                      <i className="fa-solid fa-eye-slash text-gray-500"></i>
                      <span className="w-50 text-right text-lg font-semibold text-gray-800">
                        CONFIRM PASSWORD
                      </span>
                      <span className="text-red-700 font-bold text-2xl">*</span>
                    </div>
                  </div>
                </div>

                {/* Other Details */}
                <div className="mt-5 flex justify-between">
                  <div className="border-b-2 border-gray-500 flex">
                    <input
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="username"
                      className="input border-none capitalize text-xl "
                    />
                    <span className="text-red-700 font-bold text-2xl  w-[150%]">
                      *
                    </span>
                  </div>

                  <div className="border-b-2 border-gray-500">
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="fullname"
                      className="input border-none capitalize text-xl "
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center py-10">
                  <div>
                    <span>
                      Already Registered in{" "}
                      <span className="text-lg text-blue-400 font-semibold">
                        SalesPulse
                      </span>
                      ?
                    </span>
                    <a href="" className="text-blue-700">
                      {" "}
                      Login
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#07575b] hover:bg-gray-300 hover:text-black px-10 py-2 text-white font-semibold text-xl rounded cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </form>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" className="input" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input" />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="input" />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="input" />
              </div> */}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.1 }}
              //  style={{marginTop: '100px'}}
              style={{ marginTop: "65px", paddingInline: "2.5rem" }}
            >
              <h3 className="text-base font-semibold mt-5 mb-3 text-gray-700 flex items-center gap-2">
                Store Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="relative">
                  <input
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Store Name"
                    className="input w-full"
                  />
                  <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">
                    *
                  </span>
                </div>

                <div className="relative">
                  <input
                    name="storeCategory"
                    value={formData.storeCategory}
                    onChange={handleChange}
                    placeholder="Store Category"
                    className="input w-full"
                  />
                  <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">
                    *
                  </span>
                </div>

                <div className="relative md:col-span-2">
                  <textarea
                    name="storeDescription"
                    value={formData.storeDescription}
                    onChange={handleChange}
                    placeholder="Store Description"
                    className="input w-full"
                  />
                </div>

                <div className="relative">
                  <input
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    placeholder="Store Address"
                    className="input w-full"
                  />
                  <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">
                    *
                  </span>
                </div>

                <div className="relative">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="input w-full"
                  />
                  <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">
                    *
                  </span>
                </div>

                <div className="relative">
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State/Region"
                    className="input w-full"
                  />
                  <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">
                    *
                  </span>
                </div>

                <div className="relative">
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode / Zip Code"
                    className="input w-full"
                  />
                  <span className="absolute right-2 top-2 text-red-700 font-bold text-lg">
                    *
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex  gap-0.5">
                  <p className="font-semibold text-gray-400">
                    Already have an account?
                  </p>
                  <a
                    href="#"
                    className="capitalize text-blue-400 font-semibold"
                  >
                    Sign In
                  </a>
                </div>
                <button onClick={nextStep} className="btn-primary">
                  Next
                </button>
              </div>
              <div class="text-gray-800  ">
                <div class="flex items-start gap-3">
                  <div>
                    <p class="mt-1 text-sm leading-relaxed underline font-semibold">
                      <span className="font-bold text-red-500">*Remember </span>
                      Please ensure all your business verification details and
                      documents are accurate and complete. Once you submit the
                      form, our POS admin team will review your application.
                    </p>
                  </div>
                </div>

                <div class="mt-4 flex items-start gap-3">
                  <p class="text-sm font-semibold">
                    Verification Time:{" "}
                    <span class="font-medium">Within 4 hours</span>, our team
                    will verify your business information.
                  </p>
                </div>

                <div class="mt-9 justify-self-center flex items-start gap-3">
                  <div className="bg-gray-200 p-1 rounded-md">
                    <h4 class="text-sm font-semibold">After approval</h4>
                    <ul class="mt-2 space-y-2 text-sm leading-snug list-inside">
                      <li class="flex items-start gap-2">
                        <span class="mt-0.5">🛍️</span>
                        <span>List your products on the POS platform</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="mt-0.5">📊</span>
                        <span>
                          Access your vendor dashboard for orders, stock, and
                          earnings
                        </span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="mt-0.5">💼</span>
                        <span>
                          Start selling directly to users through our POS system
                        </span>
                      </li>
                    </ul>

                    <p class="mt-3 text-xs text-gray-600">
                      You’ll receive a confirmation notification once your
                      vendor account is active.
                    </p>
                    <p class="mt-2 text-xs font-medium text-gray-700">
                      — POS Admin Team
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Business Verification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  name="businessRegNumber"
                  value={formData.businessRegNumber}
                  onChange={handleChange}
                  placeholder="Business Registration Number"
                  className="input"
                />
                <input
                  name="gstId"
                  value={formData.gstId}
                  onChange={handleChange}
                  placeholder="GST / Tax ID"
                  className="input"
                />
                <input
                  type="file"
                  name="businessLicense"
                  onChange={handleChange}
                  className="input md:col-span-2"
                />
                <input
                  type="file"
                  name="idProof"
                  onChange={handleChange}
                  className="input md:col-span-2"
                />
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-secondary">
                  Back
                </button>
                <button onClick={nextStep} className="btn-primary">
                  Preview
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="preview"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.1 }}
              style={{ marginTop: "70px", paddingInline: "2.5rem" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Review Your Information
              </h3>

              <div className="bg-gray-50 rounded-lg p-6 shadow-inner space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p>
                      <strong>Full Name:</strong> {formData.fullname || "-"}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email || "-"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phone || "-"}
                    </p>
                  </div>
                </div>

                {/* Store Details */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2">
                    Store Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p>
                      <strong>Store Name:</strong> {formData.storeName || "-"}
                    </p>
                    <p>
                      <strong>Category:</strong> {formData.storeCategory || "-"}
                    </p>
                    <p className="sm:col-span-2">
                      <strong>Description:</strong>{" "}
                      {formData.storeDescription || "-"}
                    </p>
                    <p>
                      <strong>Address:</strong> {formData.storeAddress || "-"}
                    </p>
                    <p>
                      <strong>City:</strong> {formData.city || "-"}
                    </p>
                    <p>
                      <strong>State/Region:</strong> {formData.state || "-"}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {formData.pincode || "-"}
                    </p>
                  </div>
                </div>

                {/* Business Verification */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-2">
                    Business Verification
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p>
                      <strong>Business Reg. No:</strong>{" "}
                      {formData.businessRegNumber || "-"}
                    </p>
                    <p>
                      <strong>GST / Tax ID:</strong> {formData.gstId || "-"}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.businessLicense && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Business License
                        </p>
                        <img
                          src={URL.createObjectURL(formData.businessLicense)}
                          alt="Business License"
                          className="w-full h-38 object-cover rounded-lg border"
                        />
                      </div>
                    )}

                    {formData.idProof && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          ID Proof
                        </p>
                        <img
                          src={URL.createObjectURL(formData.idProof)}
                          alt="ID Proof"
                          className="w-full h-38 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="btn-secondary">
                  Back
                </button>
                <button onClick={handleSubmit} className="btn-primary">
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-red-600 font-semibold text-lg">{error}</p>}
    </div>
  );
}
