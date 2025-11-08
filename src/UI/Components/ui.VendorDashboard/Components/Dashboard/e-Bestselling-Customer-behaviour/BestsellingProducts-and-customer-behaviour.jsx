import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
const profileImg =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

// ✅ Classification Logic
function classifyCustomer(customer) {
  if (customer.totalPurchases > 3) return "Premium";
  if (customer.visitsPerWeek >= 4) return "Regular";
  if (customer.visitsPerWeek >= 2) return "Risk";
  return "Lost";
}

// ✅ Example Customer Dataset
const customers = [
  {
    name: "Amit Sharma",
    age: 28,
    visitsPerWeek: 5,
    totalPurchases: 2,
    history: "Bought hair-care products & grooming combo last week.",
  },
  {
    name: "Riya Mehta",
    age: 32,
    visitsPerWeek: 3,
    totalPurchases: 1,
    history: "Purchased skincare essentials.",
  },
  {
    name: "Karan Patel",
    age: 24,
    visitsPerWeek: 1,
    totalPurchases: 0,
    history: "Browsed but made no purchase recently.",
  },
  {
    name: "Sarah Khan",
    age: 30,
    visitsPerWeek: 2,
    totalPurchases: 5,
    history: "Frequent high-value purchases. Loyal premium customer.",
  },
];
function CustomerBehaviourTable() {
  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2} textAlign={"center"}>
        Customer Behaviour Classification
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Profile</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Age</strong>
              </TableCell>
              <TableCell>
                <strong>Visits / Week</strong>
              </TableCell>
              <TableCell>
                <strong>Purchase History</strong>
              </TableCell>
              <TableCell>
                <strong>Behaviour</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((cust, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar src={profileImg} alt="profile" />
                </TableCell>

                <TableCell>{cust.name}</TableCell>

                <TableCell>{cust.age}</TableCell>

                <TableCell>{cust.visitsPerWeek}</TableCell>

                <TableCell>
                  <Typography variant="body2">{cust.history}</Typography>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      display: "inline-block",
                      color: "#fff",
                      backgroundColor:
                        classifyCustomer(cust) === "Premium"
                          ? "#9C27B0"
                          : classifyCustomer(cust) === "Regular"
                            ? "#2196F3"
                            : classifyCustomer(cust) === "Risk"
                              ? "#FF9800"
                              : "#F44336",
                    }}
                  >
                    {classifyCustomer(cust)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const BestSellerANDCusBehaviour = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        //   alignItems: "center",
          mb: 2,
          py: 5,
          gap: 5,
          
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            bgcolor:"#fff",
            padding: 2, 
            borderRadius: 4
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              py: 1, 
            //   bgcolor: '#333'
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  bgcolor: "info.light",
                  p: 1.2,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <i className="fa-solid fa-cart-shopping text-amber-300 text-lg"></i>
              </Box>
              <Typography variant="h6" fontWeight={700} color="primary">
                Best Selling Products
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                bgcolor: "#f5f5f5",
                px: 2,
                py: 0.6,
                borderRadius: 2,
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#e0e0e0",
                },
              }}
              color="info"
            >
              View All
            </Typography>
          </Box>
          <div className="text-black py-4 px-3 max-h-150 overflow-auto w-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-3 border-b-gray-400"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg"
                    alt=""
                    className="w-[4rem] rounded-lg"
                  />
                  <div className="">
                    <p className="text-lg">Charger Cable</p>
                    <div className="flex justify-between bg-gray-100 items-center gap-3 px-3 rounded-md">
                      <div>
                        <p className="text-sm flex items-center gap-1">₹ 345</p>
                      </div>
                      <span className="text-lg text-red-600">•</span>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-boxes-stacked text-amber-500"></i>
                        <div className="flex items-center gap-1">
                          <span>In Stock</span>
                          <span>300</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center px-2 py-0.5 rounded-lg ">
                    <p>500 left</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>

        <Box
        sx={{
            width: "50%",
            // display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            // flexDirection: "column",
          }}
        >
        
          <Box>
            <CustomerBehaviourTable/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BestSellerANDCusBehaviour;
