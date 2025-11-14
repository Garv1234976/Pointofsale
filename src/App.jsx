import { BrowserRouter, Route, Routes } from "react-router-dom"
import VendorForm from "./Login/VendorRegistration/Vendor_Registration"
import DashboardLayoutBasic from "./Dashboard/VendorDashboard/Dashboard"
import ProtectedRoute from "./Routes/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<VendorForm/>}/>
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
