import { BrowserRouter, Route, Routes } from "react-router-dom"
import VendorForm from "./Login/VendorRegistration/Vendor_Registration"
import DashboardLayoutBasic from "./Dashboard/VendorDashboard/Dashboard"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<VendorForm/>}/>
        <Route path="/vendordashboard" element={<DashboardLayoutBasic/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
