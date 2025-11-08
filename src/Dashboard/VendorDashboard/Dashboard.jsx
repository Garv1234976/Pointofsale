import * as React from "react";
import PropTypes, { element, func } from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Rating,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "/pos-logo.png";
import TopHero from "../../UI/Components/ui.VendorDashboard/Components/Dashboard/a-TopHero/Hero";
import { Account } from "@toolpad/core/Account";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "@mui/material/Link";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from '@mui/icons-material/Close';
import RateReviewIcon from '@mui/icons-material/RateReview';
 const ratingData = [
    { stars: 5, percent: 70 },
    { stars: 4, percent: 17 },
    { stars: 3, percent: 8 },
    { stars: 2, percent: 4 },
    { stars: 1, percent: 1 },
  ];
function NavigationSkeleton() {
  const theme = useTheme();

  const paperBgColor =
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.06)" // darker gray on dark mode
      : "rgba(0, 0, 0, 0.04)"; // light grayish on light mode

  const sectionBgColor =
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.04)"
      : "rgba(0, 0, 0, 0.02)";

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: paperBgColor,
          transition: "background-color 0.3s ease",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          <Skeleton variant="circular" width={32} height={32} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton
              variant="rectangular"
              width={60}
              height={24}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={90}
              height={24}
              sx={{ borderRadius: 1 }}
            />
          </Stack>
        </Stack>

        <Skeleton variant="circular" width={32} height={32} />
      </Paper>

      {/* Divider */}
      <Skeleton variant="rectangular" height={2} sx={{ borderRadius: 1 }} />

      {/* Content Area */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Sidebar */}
        <Paper
          elevation={0}
          sx={{
            width: "18%",
            p: 2,
            borderRadius: 2,
            bgcolor: sectionBgColor,
            transition: "background-color 0.3s ease",
          }}
        >
          <Stack spacing={1.5}>
            <Skeleton
              variant="rectangular"
              height={24}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              height={24}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              height={24}
              sx={{ borderRadius: 1 }}
            />
          </Stack>
        </Paper>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            p: 2,
            borderRadius: 2,
            bgcolor: sectionBgColor,
            transition: "background-color 0.3s ease",
          }}
        >
          <Stack spacing={2}>
            <Skeleton
              variant="rectangular"
              height={32}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ borderRadius: 2 }}
            />
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    element: <TopHero />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F9F9FE",
          paper: "#EEEEF9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#2A4364",
          paper: "#112E4D",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
function DemoPageContent({ pathname }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Dashboard content for {pathname}
          </Typography>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// AppTitle
const AppTitle = () => {
  return (
    <div className="flex items-end">
      <div className="">
        <img src={Logo} alt="" className="w-10 h-10" />
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "3px",
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: "700", color: "gray" }}>
          SalesPulse
        </Typography>
        <Typography className="">POS</Typography>
      </Box>
    </div>
  );
};

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

// ToolbarActions

function DashboardLayoutBasic() {
  const router = useDemoRouter("/dashboard");
  const [loading, setLoading] = useState(true);
  const [navData, setNavData] = useState([]);
  const [value, setValue] = React.useState(4);
  const [hover, setHover] = React.useState(-1);
  const [open, setOpen] = useState(false);
  const active = () => {
    setOpen(true);
  };
  const inActive = () => {
    setOpen(false);
  };
  const ToolbarActions = () => {
    return (
      <Stack
        direction="row"
        justifyContent={"space-between"}
        spacing={1.5}
        alignItems="center"
      >
        {/* Search Field */}
        <Box>
          <Tooltip title="Search" enterDelay={1000}>
            <div>
              <IconButton
                type="button"
                aria-label="search"
                sx={{ display: { xs: "inline", md: "none" } }}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </Tooltip>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton type="button" aria-label="search" size="small">
                    <SearchIcon />
                  </IconButton>
                ),
                sx: { pr: 0.5 },
              },
            }}
            sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box onClick={active} className="cursor-pointer">
          <RateReviewIcon />
          </Box>
          <Modal open={open} onClose={inActive}>
            <Box>
              <Box className="relative top-20 flex justify-end px-54">
               <Box bgcolor={'InfoBackground'} className="min-w-lg  p-4 rounded-lg flex flex-col">
               <Box className="flex justify-end -mt-12 cursor-pointer" onClick={inActive}>
                 <CloseIcon className="bg-red-500 rounded-full text-white"  />
               </Box>
                <Box>
                   <Box sx={{textAlign: 'center', mt:2 ,  px: 14}}>
                <Typography variant="h5" className="border-b-2" >Your Bussiness Rating </Typography>
               </Box>
               <Box sx={{ py: 4}}>
                   <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                 }}>
                  
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={4}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    readOnly
                  />
                 <Box className="">
                   {value !== null && (
                    <Box sx={{ ml: 2 , px: 2, borderRadius: 4}} className="bg-gray-200">
                      <Typography color="info">{labels[hover !== -1 ? hover : value]}</Typography>
                    </Box>
                  )}
                 </Box>
                   </Box>
                    <Box>
                      <Box>
                        <Typography>1,745 global ratings</Typography>
                      </Box>
                      <Box>
                      {ratingData.map((item) => (
                        <Box
                          key={item.stars}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          {/* Star Label */}
                          <Typography
                            
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              color: "primary.secondary",
                            }}
                          >
                            {item.stars} star
                          </Typography>

                          {/* Progress Bar Background */}
                          <Box
                            sx={{
                              width: "50%",
                              height: "20px",
                              mx: 2,
                              bgcolor: "grey.200",
                              borderRadius: "4px",
                              overflow: "hidden",
                              position: "relative",
                              "& .bar": {
                                position: "absolute",
                                height: "100%",
                                bgcolor: "warning.main",
                                width: `${item.percent}%`,
                                transition: "width 0.3s ease",
                              },
                            }}
                          >
                            <Box className="bar" />
                          </Box>

                          {/* Percentage Label */}
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: "text.secondary",
                            }}
                          >
                            {item.percent}%
                          </Typography>
                        </Box>
                      ))}
                      </Box>
                    </Box>
                </Box>
                </Box>
                
               </Box>
              </Box>
            </Box>
          </Modal>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton>
            <EmailIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <Account />
        </Box>
        <ThemeSwitcher />
      </Stack>
    );
  };
  const [session, setSession] = useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  useEffect(() => {
    // Simulate fetching navigation (e.g. from API)
    const timer = setTimeout(() => {
      setNavData(NAVIGATION);
      setLoading(false);
    }, 1500); // 1.5s skeleton delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <DemoProvider>
      {loading ? (
        <NavigationSkeleton />
      ) : (
        <AppProvider
          session={session}
          authentication={authentication}
          navigation={navData}
          router={router}
          theme={demoTheme}
        >
          <DashboardLayout
            slots={{
              appTitle: AppTitle,
              toolbarActions: ToolbarActions,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={router.pathname}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {router.pathname === "/dashboard" ? (
                  <TopHero />
                ) : (
                  <Box
                    sx={{
                      py: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Page content for {router.pathname}
                    </Typography>
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </DashboardLayout>
        </AppProvider>
      )}
    </DemoProvider>
  );
}

export default DashboardLayoutBasic;
