import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/Global/VendorContext";
import { useSnackbar } from "../../Utils/SnackBar/Message";

const VendorLogin = () => {
    const { showSuccess, showError, SnackbarComponent } = useSnackbar();
    const { setAuthlogin } = useAuth()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await setAuthlogin(login.email, login.password)
            if (res.success) {
                showSuccess("Login Successful!");

                // Save token & vendor info
                // localStorage.setItem("vendorToken", res.data.token);
                // localStorage.setItem("vendorData", JSON.stringify(res.data.vendor));

                // Redirect after login
                setTimeout(() => navigate("/vendordashboard"), 1200);
            
            } else {
                showError(err.response?.data?.message || "Invalid login credentials");
            }
        } catch (error) {

        }
    }
    return (
        <>
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
                            className={`fa-solid ${showPass ? "fa-eye" : "fa-eye-slash"
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
                        //   onClick={() => setStep(1)}
                        >
                            {" "}
                            Create Vendor Profile
                        </span>
                    </p>
                </form>
            </div>
            {SnackbarComponent}
        </>
    )
}

export default VendorLogin;