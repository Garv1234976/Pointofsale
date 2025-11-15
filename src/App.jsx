import { BrowserRouter, Route, Routes } from "react-router-dom"
import VendorForm from "./Login/VendorRegistration/Vendor_Registration"
import DashboardLayoutBasic from "./Dashboard/VendorDashboard/Dashboard"
import ProtectedRoute from "./Routes/ProtectedRoute";
import AuthOnlyRoute from "./Routes/RedirectRoute"
import VendorLogin from "./Login/VendorLogin/Vendor_login"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthOnlyRoute>
            <VendorForm/>
          </AuthOnlyRoute>

          }/>
        <Route path="/vendorLogin" element={
          <AuthOnlyRoute>
            <VendorLogin/>
          </AuthOnlyRoute>

          }/>
        <Route path="/vendordashboard" element={
          <ProtectedRoute>
            <DashboardLayoutBasic/>
          </ProtectedRoute>
          }/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
