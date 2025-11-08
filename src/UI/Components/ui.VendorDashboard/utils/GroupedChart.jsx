import * as React from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PieChart } from "@mui/x-charts/PieChart";
import { PieArcLabel } from '@mui/x-charts';

// 🧾 Sample transaction data grouped by type
const transactionData = {
  Sale: [
    {
      id: 1,
      date: "2025-11-03",
      customer: "Andrea Willer",
      orderId: "#123456",
      status: "Draft",
      total: 4544,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
    {
      id: 2,
      date: "2025-11-04",
      customer: "John Doe",
      orderId: "#789012",
      status: "Completed",
      total: 9820,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
    {
      id: 3,
      date: "2025-11-03",
      customer: "Andrea Willer",
      orderId: "#123456",
      status: "Draft",
      total: 4544,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
    {
      id: 4,
      date: "2025-11-04",
      customer: "John Doe",
      orderId: "#789012",
      status: "Completed",
      total: 9820,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
    {
      id: 5,
      date: "2025-11-04",
      customer: "John Doe",
      orderId: "#789012",
      status: "Completed",
      total: 9820,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
    {
      id: 6,
      date: "2025-11-04",
      customer: "John Doe",
      orderId: "#789012",
      status: "Completed",
      total: 9820,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
    {
      id: 7,
      date: "2025-11-04",
      customer: "John Doe",
      orderId: "#789012",
      status: "Completed",
      total: 9820,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
  ],
  Purchase: [
    {
      id: 3,
      date: "2025-11-05",
      customer: "Supplier Hub",
      orderId: "#345678",
      status: "Completed",
      total: 15000,
      avatar:
        "https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/product-01.jpg",
    },
  ],
  Quotation: [],
  Expenses: [],
  Invoices: [],
};

// 📊 Define columns for the DataGrid
const columns = [
  { field: "date", headerName: "Date",  },
  {
    field: "customer",
    headerName: "Customer",
    flex: 2,
    minWidth: 100,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
        <img
          src={params.row.avatar}
          alt={params.value}
          style={{ width: 40, height: 40, borderRadius: "8px" }}
        />
        <Box>
          <Typography variant="body1" fontWeight="500">
            {params.value}
          </Typography>
          <Typography variant="body2" color="info">
            {params.row.orderId}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 130,
    renderCell: (params) => {
      const colorMap = {
        Draft: "error.main",
        Completed: "success.main",
        Pending: "warning.main",
      };
      return (
        <Box sx={{}}>
          <Typography
          sx={{
            bgcolor: colorMap[params.value] || "grey.400",
            color: 'white',
            px: 1,
            py: 0.5,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10
          }}
        >
          {params.value}
        </Typography>
        </Box>
      );
    },
  },
  {
    field: "total",
    headerName: "Total (₹)",
    flex: 1,
    minWidth: 120,
    valueFormatter: (params) => {
      const value = Number(params) || 0;
      return `₹ ${value.toLocaleString("en-IN")}`;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.5,
    sortable: false,
    renderCell: () => (
      <Tooltip title="View Details">
        <IconButton size="small">
          <VisibilityIcon fontSize="small" color="info"/>
        </IconButton>
      </Tooltip>
    ),
  },
];

// 🍰 Charts Section (2×2 grid)
function DashboardChartGrid() {
  const theme = useTheme();
// const isDarkMode = theme.palette.mode === "dark";
const isDarkMode = theme.palette.mode === 'dark'
  const charts = [
    {
      title: "Sales Overview",
      data: [
        { id: 0, label: "Sales", value: 65, color: "#4CAF50" },
        { id: 1, label: "Purchases", value: 25, color: "#2196F3" },
        { id: 2, label: "Returns", value: 10, color: "#FF9800" },
      ],
      innerRadius: 60,
      outerRadius: 100,
      bg: "#E8F5E9", // light green
    },
    {
      title: "Top Selling Products",
      data: [
        { id: 0, value: 30, label: "Charger", color: "#8E24AA" },
        { id: 1, value: 25, label: "Mouse", color: "#03A9F4" },
        { id: 2, value: 20, label: "Laptop", color: "#FFC107" },
        { id: 3, value: 15, label: "Toothpaste", color: "#4CAF50" },
      ],
      innerRadius: 0,
      outerRadius: 90,
      bg: "#F3E5F5", // light purple
    },
    {
      title: "Top Category Sales",
      data: [
        { id: 0, value: 40, label: "Food", color: "#F44336" },
        { id: 1, value: 25, label: "Pharma", color: "#FF9800" },
        { id: 2, value: 20, label: "Electronics", color: "#009688" },
        { id: 3, value: 15, label: "Other", color: "#9C27B0" },
      ],
      innerRadius: 40,
      outerRadius: 100,
      bg: "#FFF3E0", // light orange
    },
    {
      title: "Recent Sales Status",
      data: [
        { id: 0, value: 40, label: "Completed", color: "#4CAF50" },
        { id: 1, value: 30, label: "Processing", color: "#2196F3" },
        { id: 2, value: 15, label: "Draft", color: "#FFC107" },
        { id: 3, value: 15, label: "Cancelled", color: "#F44336" },
      ],
      innerRadius: 50,
      outerRadius: 90,
      bg: "#E3F2FD", // light blue
    },
  ];

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 400,
        borderRadius: 3,
        p: 2,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 3,
        bgcolor: "background.paper",
        
      }}
    >
      {charts.map((chart) => (
        <Box
          key={chart.title}
          sx={{
            textAlign: "center",
            p: 2,
            borderRadius: 3,
            bgcolor: chart.bg,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          color={'GrayText'}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {chart.title}
          </Typography>

<PieChart
  series={[
    {
      data: chart.data,
      innerRadius: chart.innerRadius,
      outerRadius: chart.outerRadius,
      cornerRadius: 5,
      label: ({ label, value }) => `${label}: ${value}%`,
      labelPosition: "outside",
      arcLabelRadius: "70%",
    },
  ]}
  height={220}
  width={220}
  slotProps={{
    legend: { hidden: false, direction: "horizontal" },
  }}
  sx={{
    "& .MuiChartsLabel-root": {
      fontSize: 12,
      fontWeight: 600,
      color: isDarkMode ? "#333" : "#333", // Labels on chart slices
       
    },
    "& .MuiChartsLegend-label": {
      color: isDarkMode ? "#333" : "#333", // Legend text color 🎨
      fontWeight: 600,
    },
    "& .MuiChartsLegend-root": {
      justifyContent: "center",
      mt: 1,
    },
  }}
/>

        </Box>
      ))}
    </Box>
  );
}

// 🧩 Combined Layout
export default function RecentTransactionsWithChart() {
  const [activeTab, setActiveTab] = React.useState("Sale");
  const [pageSize, setPageSize] = React.useState(5);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 3,
        flexWrap: "wrap",
        justifyContent: "center",
        // alignItems: 'center'
      }}
    >
      {/* Left: Transactions */}
      <Box
  sx={{
    flex: 1,
    minWidth: 550,
    p: 3,
    borderRadius: 4,
    bgcolor: "#fafafa",
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  {/* Header */}
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
      py: 1,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          bgcolor: "error.light",
          p: 1.2,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <i className="fa-solid fa-flag text-red-700 text-lg"></i>
      </Box>
      <Typography variant="h6" fontWeight={700} color="primary">
        Recent Transactions
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

  {/* ✅ Navigation Tabs */}
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      mb: 2,
      bgcolor: "#f9f9f9",
      borderRadius: 3,
      py: 1,
    }}
  >
    <ul className="flex justify-around w-full max-w-[500px] text-lg font-medium">
      {["Sale", "Purchase", "Quotation", "Expenses", "Invoices"].map((item) => (
        <li
          key={item}
          onClick={() => setActiveTab(item)}
          className={`cursor-pointer transition-all ${
            activeTab === item
              ? "border-b-[3px] border-orange-500 text-[18px] font-semibold text-black"
              : "text-gray-600 hover:text-black text-[18px]"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  </Box>

  {/* DataGrid */}
  <Box
    sx={{
      width: "100%",
      height: "auto",
      bgcolor: "white",
      borderRadius: 3,
      p: 1,
      border: "1px solid #eee",
    }}
  >
    <DataGrid
  rows={transactionData[activeTab] || []}
  columns={columns}
  pagination
  paginationModel={{ pageSize }}
  onPaginationModelChange={(model) => setPageSize(model.pageSize)}
  pageSizeOptions={[5, 10]}
  disableRowSelectionOnClick
  sx={{
    border: "none",
    borderRadius: 3,
    overflow: "hidden",
    bgcolor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    "& .MuiDataGrid-columnHeaders": {
      bgcolor: "#f5f5f5",
      // color: "",
      fontWeight: 600,
      fontSize: "0.95rem",
      textAlign: "center",
      borderBottom: "1px solid #e0e0e0",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
      textAlign: "center",
      width: "100%",
      justifyContent: "center",
      display: "flex",
    },
    "& .MuiDataGrid-cell": {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      fontSize: "0.9rem",
      color: "#333",
      borderBottom: "1px solid #f0f0f0",
      py: 1,
    },
    "& .MuiDataGrid-row": {
      transition: "all 0.2s ease",
      "&:hover": {
        bgcolor: "#fafafa",
        transform: "scale(1.01)",
      },
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "1px solid #e0e0e0",
      bgcolor: "#f9f9f9",
      justifyContent: "center",
      fontWeight: 500,
      color: "#555",
    },
    "& .MuiTablePagination-root": {
      fontWeight: 500,
      color: "#555",
    },
  }}
  
  getRowHeight={() => 70}
/>

  </Box>
      </Box>


      {/* Right: Chart Grid */}
      <DashboardChartGrid />
    </Box>
  );
}
