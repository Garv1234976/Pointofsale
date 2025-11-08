import GroupIcon from "@mui/icons-material/Group";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";

/**
 *
 * @param {*} name
 * @param {*} amount
 * @param {*} code
 * @param {*} validity
 * @param {*} onUpto
 * @param {*} status
 * @param {*} issuedBy
 * @returns
 */
function createData(name, amount, code, validity, onUpto, status, issuedBy) {
  return { name, amount, code, validity, onUpto, status, issuedBy };
}

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];

const beforeCoupons = [200, 240, 180, 260, 220, 300];
const afterCoupons = [300, 280, 350, 400, 370, 450];

const columns = [
  { field: "name", headerName: "Coupon Name" },
  { field: "amount", headerName: "Amount" },
  {
    field: "code",
    headerName: "Code",
    flex: 1,
    renderCell: (params) => {
      const code = (params || "").replace(/\s+/g, "");
      return (
        <Typography
          variant=""
          className="border-2 border-dashed rounded px-2 py-0.5 border-green-400 bg-green-300 text-green-900 uppercase"
        >
          {code}
        </Typography>
      );
    },
  },
  { field: "validity", headerName: "Validity" },
  { field: "onUpto", headerName: "On Upto" },

  {
    field: "status",
    headerName: "Status",
    renderCell: (value) => {
      const status = value.toLowerCase();

      const colorMap = {
        scheduled: "text-yellow-500",
        expired: "text-red-500",
        active: "text-green-500",
      };

      const label =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      return (
        <Box className="flex items-center gap-1">
          <span className={`${colorMap[status] || "text-gray-500"} text-lg`}>
            •
          </span>
          <Typography>{label}</Typography>
        </Box>
      );
    },
  },

  {
    field: "issuedBy",
    headerName: "Issued By",
    renderCell: (params) => {
      const issueBy = params.toLowerCase();

      const dramaUrgency = {
        admin: "text-red-500 bg-red-200 px-2 py-1 rounded",
        you: "text-gray-500",
      };
      return (
        <span
          className={`${dramaUrgency[issueBy] || "text-shadow-fuchsia-700"}`}
        >
          {params}
        </span>
      );
    },
  },
];
// this is for action button Edit and delete
columns.push({
  field: "actions",
  headerName: "Actions",
  renderCell: () => null, 
});



const rows = [
  createData(
    "Frozen yoghurt",
    159,
    "CODEXPROMAX",
    "20-11-25",
    500,
    "scheduled",
    "Admin"
  ),
  createData("Ice Cream", 854, "k icream", "5-5-25", 900, "active", "You"),
];
const TopCutomerANDCoupons = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <div className="py-5 grid grid-cols-1 xl:grid-cols-[35%_65%] gap-6 bg-green-100 rounded-lg mt-5">
      <div className=" bg-blue-100 rounded-lg ml-3 ">
        <div className="border-b-2 border-b-gray-500">
          <div className="text-black p-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-red-300 p-2 rounded-lg flex items-center">
                  <i className="fa-solid fa-users text-2xl text-red-700"></i>
                </div>
                <p className="text-2xl">Top Customers</p>
              </div>
              <div className="flex items-center bg-gray-300 py-2 px-3 rounded-md">
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-calendar-check text-blue-400"></i>
                  <p>Today</p>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-black py-4 px-3 max-h-150 overflow-auto">
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
                <div>
                  <p className="text-lg">John Doe</p>
                  <p className="text-sm">
                    35 orders <span>•</span>
                    <i className="fa-solid fa-location-dot text-gray-500"></i>
                    <span> Punjab</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center px-2 py-0.5 rounded-lg font-semibold">
                  <i className="fa-solid fa-indian-rupee text-xs"></i>
                  <p>5,5456</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        {/* Coupons and sales over coupon graph  */}
        <Box sx={{ px: 4 }}>
          <Box className="bg-blue-100 rounded-t-lg">
            <div className="border-b-2 border-b-gray-500">
              <div className="text-black p-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-300 p-2 rounded-lg flex items-center">
                      <i className="fa-solid fa-receipt text-2xl text-red-700"></i>
                    </div>
                    <p className="text-2xl">Sales Over Coupons</p>
                  </div>
                  <div className="flex items-center bg-gray-300 py-2 px-3 rounded-md">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-calendar-check text-blue-400"></i>
                      <p>Today</p>
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TableContainer
              component={Paper}
              sx={{ overflow: "auto", maxHeight: "250px", bgcolor: "#dbeafe" }}
            >
              <Table sx={{ minWidth: 900 }} aria-label="simple table">
                <TableHead
                  sx={{ position: "sticky", top: 0, bgcolor: "#c0ddff" }}
                >
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col.field}
                        sx={{ color: "#333", fontWeight: "600" }}
                        align="center"
                      >
                        {col.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow 
  key={i}
  className="group hover:bg-gray-100 transition-all"
>
  {columns.map((col) => {
    const value = row[col.field];

    // ✅ If this is the actions column → render buttons
    if (col.field === "actions") {
      return (
        <TableCell
          key={col.field}
          align="center"
          className="hidden group-hover:table-cell"
        >
          <div className="flex items-center justify-center gap-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </TableCell>
      );
    }

    return (
      <TableCell
        key={col.field}
        sx={{ color: "#333", fontWeight: "600" }}
        align="center"
      >
        {col.renderCell ? col.renderCell(value) : value}
      </TableCell>
    );
  })}
</TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Box sx={{ height: "350px", py: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
                color={isDark ? "#fff" : "#111"}
                textAlign="center"
              >
                Sales Over Weeks - Before & After Coupons
              </Typography>
              <Box
                sx={{
                  backgroundColor: isDark ? "red" : "#a7e9c5",
                  borderRadius: 2,
                }}
              >
                <LineChart
                  // width={900}
                  height={260}
                  xAxis={[
                    {
                      scaleType: "point",
                      data: weeks,
                      label: "Weeks",
                      tickLabelStyle: { fill: isDark ? "#fff" : "#000" },
                    },
                  ]}
                  yAxis={[
                    {
                      label: "Sales (₹)",
                      tickLabelStyle: { fill: isDark ? "#fff" : "#000" },
                    },
                  ]}
                  series={[
                    {
                      id: "before",
                      label: "Sales Before Coupons",
                      data: beforeCoupons,
                      color: "#FF9800",
                      curve: "monotone",
                    },
                    {
                      id: "after",
                      label: "Sales After Coupons",
                      data: afterCoupons,
                      color: "#4CAF50",
                      curve: "monotone",
                    },
                  ]}
                  slotProps={{
                    legend: {
                      position: "bottom",
                      direction: "row",
                    },
                  }}
                  sx={{
                    "& .MuiChartsLegend-label": {
                      fill: isDark ? "#fff" : "#000",
                      fontWeight: 600,
                    },
                    "& .MuiChartsAxis-root text": {
                      fill: isDark ? "#fff" : "#000",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default TopCutomerANDCoupons;
