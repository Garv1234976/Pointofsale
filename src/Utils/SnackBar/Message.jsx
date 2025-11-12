import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

// A reusable hook for success and failure snackbars using only SlideTransition
export function useSnackbar() {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success", // not shown directly but can be used if styling needed
  });

  const showSuccess = (msg) => {
    setSnackbar({ open: true, message: msg, severity: "success" });
  };

  const showError = (msg) => {
    setSnackbar({ open: true, message: msg, severity: "error" });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const SnackbarComponent = (
    <Snackbar
      open={snackbar.open}
      onClose={handleClose}
      autoHideDuration={9000}
      slots={{ transition: SlideTransition }}
      key={"SlideTransition"}
    >
      <SnackbarContent
        message={snackbar.message}
        action={
          <p className=" mr-10 flex items-center">
            {snackbar.severity === "success" ? (
              <i className="fas fa-check-circle" style={{ fontSize: 20 }}></i>
            ) : (
              <i className="fas fa-times-circle" style={{ fontSize: 20 }}></i>
            )}
          </p>
        }
        sx={{
          bgcolor: snackbar.severity === "success" ? "#4caf50" : "#f44336",
          color: "white",
          fontWeight: 600,
        }}
      />
    </Snackbar>
  );

  return { showSuccess, showError, SnackbarComponent };
}

// Example usage component (triggered only by API state)
export default function Example({ apiStatus }) {
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

  React.useEffect(() => {
    if (apiStatus === "success") showSuccess("Success!");
    if (apiStatus === "error") showError("Failed.");
  }, [apiStatus]);

  return <>{SnackbarComponent}</>;
}
