import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";

// ✅ Fake Expense Stats
const expenseStats = {
  today: "₹ 1,240",
  weekly: "₹ 8,920",
  monthly: "₹ 32,400",
};

// ✅ Sparkline Data (for style only)
const sparklineData = [500, 900, 1500, 1200, 2000, 1800, 2200];

export default function BusyHoursBarChart({ dataset }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const finalData = dataset || defaultDataset;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: isDark ? "#1f1f1f" : "#f4f4f4",
        p: 3,
        borderRadius: 3,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {/* ✅ LEFT: Busy Hours Chart */}
      <Box sx={{ flex: 1, minWidth: "350px" }}>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          textAlign="center"
          color={isDark ? "#fff" : "#111"}
        >
          Busy Hours Per Week
        </Typography>

        <BarChart
          height={300}
          dataset={finalData}
          borderRadius={50}
          xAxis={[
            {
              dataKey: "day",
              scaleType: "band",
              tickLabelStyle: { fill: isDark ? "#fff" : "#000" },
            },
          ]}
          yAxis={[
            {
              label: "Customer Visits",
              tickLabelStyle: { fill: isDark ? "#fff" : "#000" },
            },
          ]}
          series={[
            {
              dataKey: "busy",
              label: "Busy Hours",
              color: "#2b7fff",
            },
          ]}
          sx={{
            "& .MuiChartsAxis-root text": {
              fill: isDark ? "#fff" : "#000",
            },
          }}
        />
      </Box>

      {/* ✅ RIGHT: Track Expenses */}
      <Box
        sx={{
          flex: 0.8,
          minWidth: "260px",
          p: 3,
          borderRadius: 3,
          bgcolor: isDark ? "#222" : "#fff",
          boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
        }}
      >
        {/* Title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                bgcolor: "success.light",
                p: 1.2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fa-solid fa-money-bill-wave text-green-700 text-lg"></i>
            </Box>

            <Typography variant="h6" fontWeight={700} color="primary">
              Track Expenses
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              bgcolor: isDark ? "#333" : "#e9e9e9",
              px: 2,
              py: 0.6,
              borderRadius: 2,
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 600,
              "&:hover": {
                bgcolor: isDark ? "#444" : "#d6d6d6",
              },
            }}
          >
            View All
          </Typography>
        </Box>

        {/* ✅ Expense Summary Values */}
        <Box sx={{ mt: 2 }}>
          <Box className="flex justify-between py-2 border-b border-gray-300">
            <Typography color={isDark ? "#ddd" : "#444"}>Today</Typography>
            <Typography fontWeight={700}>{expenseStats.today}</Typography>
          </Box>

          <Box className="flex justify-between py-2 border-b border-gray-300">
            <Typography color={isDark ? "#ddd" : "#444"}>This Week</Typography>
            <Typography fontWeight={700}>{expenseStats.weekly}</Typography>
          </Box>

          <Box className="flex justify-between py-2">
            <Typography color={isDark ? "#ddd" : "#444"}>This Month</Typography>
            <Typography fontWeight={700}>{expenseStats.monthly}</Typography>
          </Box>
        </Box>

        {/* ✅ Mini Sparkline */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body2"
            mb={1}
            color={isDark ? "#ccc" : "#555"}
          >
            Expense Trend
          </Typography>

          <LineChart
            height={70}
            series={[
              {
                data: sparklineData,
                color: "#4CAF50",
              },
            ]}
            xAxis={[{ scaleType: "point", data: sparklineData.map((_, i) => i + 1) }]}
            sx={{
              "& .MuiChartsAxis-root": { display: "none" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
