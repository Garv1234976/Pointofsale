import * as React from 'react';
import PropTypes, { element } from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { motion, AnimatePresence } from "framer-motion";
import { Paper, Skeleton, Stack, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import TopHero from '../../UI/Components/ui.VendorDashboard/Components/Dashboard/a-TopHero/Hero';


function NavigationSkeleton() {
 const theme = useTheme();

  const paperBgColor = theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.06)' // darker gray on dark mode
    : 'rgba(0, 0, 0, 0.04)';      // light grayish on light mode

  const sectionBgColor = theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.04)'
    : 'rgba(0, 0, 0, 0.02)';

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: paperBgColor,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          <Skeleton variant="circular" width={32} height={32} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={90} height={24} sx={{ borderRadius: 1 }} />
          </Stack>
        </Stack>

        <Skeleton variant="circular" width={32} height={32} />
      </Paper>

      {/* Divider */}
      <Skeleton variant="rectangular" height={2} sx={{ borderRadius: 1 }} />

      {/* Content Area */}
      <Box sx={{ display: 'flex', gap: 2,  }}>
        {/* Sidebar */}
        <Paper
          elevation={0}
          sx={{
            width: '18%',
            p: 2,
            borderRadius: 2,
            bgcolor: sectionBgColor,
            transition: 'background-color 0.3s ease',
          }}
        >
          <Stack spacing={1.5}>
            <Skeleton variant="rectangular" height={24} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={24} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={24} sx={{ borderRadius: 1 }} />
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
            transition: 'background-color 0.3s ease',
          }}
        >
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={32} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    element: <TopHero/>
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
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
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F9F9FE',
          paper: '#EEEEF9',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#2A4364',
          paper: '#112E4D',
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

function DashboardLayoutBasic() {
  const router = useDemoRouter('/dashboard');
  const [loading, setLoading] = useState(true);
  const [navData, setNavData] = useState([]);

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
          navigation={navData}
          router={router}
          theme={demoTheme}
          branding={{
            title: "POS",
            homeUrl: "/vendordashboard",
          }}
        >
          <DashboardLayout>
            <AnimatePresence mode="wait">
              <motion.div
                key={router.pathname}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {router.pathname === '/dashboard' ? (
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