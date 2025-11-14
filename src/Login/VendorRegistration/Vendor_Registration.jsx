import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Poster from "/pos.png";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Utils/SnackBar/Message";

// Api router
import api from "../../Services/SalesPulse-backend";
import { useAuth } from "../../Contexts/Global/VendorContext";
export default function VendorForm() {
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();
  const { vendor } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userName: "",
    fullName: "",
  });

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

  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const [storeLogoPreview, setStoreLogoPreview] = useState(null);

  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
    userName: "",
    fullName: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);



  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Medium";
    if (strength >= 3) return "Strong";
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newErrors = { ...errors };

    // PHONE NUMBER VALIDATION
    if (name === "phoneNumber") {
      if (!/^[0-9]*$/.test(value)) {
        newErrors.phoneNumber = "Phone number must contain digits only";
      } else if (value.length > 10) {
        newErrors.phoneNumber = "Phone number cannot exceed 10 digits";
      } else {
        newErrors.phoneNumber = "";
      }
    }

    // PASSWORD VALIDATION
    if (name === "password") {
      newErrors.password =
        value.length < 8 ? "Password must be at least 8 characters" : "";
      setPasswordStrength(checkPasswordStrength(value));

      if (formData.confirmPassword && formData.confirmPassword !== value) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value !== formData.password ? "Passwords do not match" : "";
    }
    // USERNAME VALIDATION (alphabets only)
    if (name === "userName") {
      if (!/^[A-Za-z]*$/.test(value)) {
        newErrors.userName = "Username can contain alphabets only";
      } else {
        newErrors.userName = "";
      }
    }

    // FULL NAME VALIDATION (alphabets + space)
    if (name === "fullName") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        newErrors.fullName = "Full name must contain alphabets only";
      } else {
        newErrors.fullName = "";
      }
    }

    setErrors(newErrors);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

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

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const res = await api.post(
        "/api/vendor/login",
        {
          email: login.email,
          password: login.password,
        },
        { headers: { "Content-Type": "application/json" }, skipCsrf: true }
      );

      if (res.status === 200) {
        showSuccess("Login Successful!");

        // Save token & vendor info
        localStorage.setItem("vendorToken", res.data.token);
        localStorage.setItem("vendorData", JSON.stringify(res.data.vendor));

        // Redirect after login
        // setTimeout(() => navigate("/vendordashboard"), 1200);
        nextStep();
      }
    } catch (err) {
      console.log(err);
      showError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const completed = localStorage.getItem("vendorProfileCompleted") === "true";

    if (completed) {
      setStep(2);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        skipCsrf: true,
      });
      // window.location.reload();
      console.log("SUCCESS:", res);

      if (res.status === 201) {
        console.log(res);
        showSuccess(res.data?.message);
        localStorage.setItem("vendorProfileCompleted", "true");
        nextStep();
      }
    } catch (err) {
      console.log(err);
      showError(err.response?.data?.message);
      console.error("ERROR:", err.response?.data);
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
              <h2 className="">
                {step === 1 && "Vendor Register_"}
                {step === 2 && "Vendor Login_"}
                {step === 3 && "Create Store_"}
              </h2>
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
              className="mt-13 sm:mt-[90px] py-2"
              // 50
              style={{  paddingInline: "2.5rem" }}
            >
              <h3 className="text-2xl py-5">Basic Information</h3>
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
                      className="input border-none text-[1rem] sm:text-xl"
                      autoComplete="username"
                    />
                    <span className="text-[1rem] sm:text-lg font-semibold text-gray-400">
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
                      className="input border-none text-[1rem] sm:text-xl"
                    />
                    <span className="w-50 text-right text-[0.9rem]  sm:text-lg font-semibold text-gray-400">
                      PHONE NUMBER
                    </span>
                    <span className="text-red-700 font-bold text-2xl">*</span>
                  </div>

                  <div className="absolute -mt-3">
                    {errors.phoneNumber && (
                      <div className="bg-gray-200 px-3 py-2 rounded-lg">
                        <p className="text-red-600 text-sm">
                          {errors.phoneNumber}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center border-b-2 border-gray-500 mb-1">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="password(#2@)er"
                      className="input border-none text-[1rem] sm:text-xl max-w-80"
                      autoComplete="new-password"
                    />
                    <div className="flex items-center gap-5">
                      {passwordStrength && (
                        <p
                          className={`absolute left-8 mt-16 w-[12rem] sm:w-full sm:mt-0 sm:static text-[0.8rem] sm:text-sm  ${
                            passwordStrength === "Weak"
                              ? "text-red-500 bg-amber-200 px-2 text-center rounded-lg"
                              : passwordStrength === "Medium"
                                ? "text-black bg-amber-500 px-2 rounded-lg"
                                : "text-green-800 px-2 rounded-lg bg-green-200"
                          }`}
                        >
                          Password Strength: <b>{passwordStrength}</b>
                        </p>
                      )}
                      <i
                      className={`fa-solid ${
                        showPass ? "fa-eye" : "fa-eye-slash"
                      }  text-gray-500 cursor-pointer`}
                      onClick={() => setShowPass(!showPass)}
                    ></i>
                      <div className="flex items-center">
                        <span className="text-[0.9rem] sm:text-lg font-semibold text-gray-800">
                          PASSWORD
                        </span>
                        <span className="text-red-700 font-bold text-2xl">
                          *
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}

                  <div className="absolute">
                    {errors.password && (
                      <div className="bg-gray-200 px-3 py-2 rounded-lg">
                        <p className="text-red-600 text-sm">
                          {errors.password}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center border-b-2 border-gray-500">
                    <input
                      type={showPassConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="password(#2@)er"
                      className="input border-none text-[1rem] sm:text-xl"
                    />
                    <div className="flex place-items-center ">
                      <i
                      className={`fa-solid ${
                        showPassConfirm ? "fa-eye" : "fa-eye-slash"
                      }  text-gray-500 cursor-pointer`}
                      onClick={() => setShowPassConfirm(!showPassConfirm)}
                    ></i>
                      <span className="w-25 sm:w-50  text-right text-[0.9rem]  sm:text-lg font-semibold text-gray-800">
                        CONFIRM PASSWORD
                      </span>
                      <span className="text-red-700 font-bold text-2xl">*</span>
                    </div>
                  </div>
                </div>
                <div className="absolute">
                  {errors.confirmPassword && (
                    <div className="bg-gray-200 px-3 py-2 rounded-lg">
                      <p className="text-red-600 text-sm">
                        {errors.confirmPassword}
                      </p>
                    </div>
                  )}
                </div>

                {/* Other Details */}
                <div className="mt-5 block sm:flex justify-between">
                  <div className="border-b-2 border-gray-500 flex">
                    <input
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="username"
                      className="input border-none capitalize text-[1rem] sm:text-xl "
                    />
                    <span className="text-red-700 font-bold text-2xl  w-[150%]">
                      *
                    </span>
                  </div>
                  {errors.userName && (
                    <div className="absolute mt-12">
                      <div className="bg-gray-200 px-3 py-2 rounded-lg">
                        <p className="text-red-600 text-sm">
                          {errors.userName}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="border-b-2 border-gray-500">
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="fullname"
                      className="input border-none capitalize text-[1rem] sm:text-xl "
                    />
                  </div>
                  {errors.fullName && (
                    <div className="absolute mt-12 right-5">
                      <div className="bg-gray-200 px-3 py-2 rounded-lg">
                        <p className="text-red-600 text-sm">
                          {errors.fullName}
                        </p>
                      </div>
                    </div>
                  )}
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
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="preview"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.1 }}
              style={{ marginTop: "100px", paddingInline: "2.5rem" }}
            >
              <h3 className="text-2xl text-center font-semibold mb-6 text-gray-800">
                Login to your Vendor Account
              </h3>

              <div className="w-full flex justify-center items-center  h-[50vh] rounded-lg">
                <form
                  onSubmit={handleLogin}
                  className="bg-white p-6 rounded-xl shadow-md space-y-6 sm:w-full md:w-[70%]"
                >
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={login.email}
                      onChange={handleLoginChange}
                      placeholder="hello@vendor.com"
                      autoComplete="username"
                      className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col relative">
                    <label className="text-gray-600 font-medium mb-1">
                      Password
                    </label>

                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={login.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="border rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      required
                    />

                    <i
                      className={`fa-solid ${
                        showPass ? "fa-eye" : "fa-eye-slash"
                      } absolute right-3 top-11 text-gray-500 cursor-pointer`}
                      onClick={() => setShowPass(!showPass)}
                    ></i>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="bg-[#07575b] hover:bg-gray-200 hover:text-black text-white w-full py-2 rounded-lg text-lg font-semibold transition"
                  >
                    Login
                  </button>

                  <p className="text-center text-gray-600 text-sm mt-2">
                    Don't have an account?
                    <span
                      className="text-blue-600 font-semibold cursor-pointer"
                      onClick={() => setStep(1)}
                    >
                      {" "}
                      Create Vendor Profile
                    </span>
                  </p>
                </form>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.1 }}
              //  style={{marginTop: '100px'}}
              style={{ marginTop: "100px", paddingInline: "2.5rem",  }}
              className="bg-gray-100"
            >
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
    Register
  </button>
</div>
                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {SnackbarComponent}
    </div>
  );
}
