import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function CustomSnackbar({ open, onClose, data, fileType }) {
  if (!data) return null;

  const { insertedCount = 0, failedCount = 0, errors = [] } = data;
  const firstError = errors.length > 0 ? errors[0] : null;

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      autoHideDuration={520000}
    >
      <SnackbarContent
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        message={
          <div className="bg-gray-100 rounded-lg shadow-lg w-[600px] border border-gray-300">
            {/* Title */}
            <div>
              <p className="text-center font-semibold text-black border-b-2 border-b-gray-300 py-0.5">
                {fileType?.toUpperCase() || "CSV"} Processed
              </p>
            </div>

            {/* Summary Blocks */}
            <div className="flex justify-between">
              {/* ✅ Success Section */}
              <div className="w-full bg-green-100 text-black shadow-md">
                <span className="block text-center border-b-2 text-green-500 font-semibold">
                  Success
                </span>
                <div className="px-3 py-1">
                  <div className="flex justify-between gap-2 items-center h-20 font-semibold text-sm">
                    <p className="bg-green-200 px-2 rounded-lg text-green-700">
                      Upload Count : {insertedCount}
                    </p>
                    <p className="bg-red-200 rounded-lg px-2 text-red-500">
                      Failed Count : {failedCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* ❌ Failed Section */}
              <div className="w-full border-l-2 border-l-gray-400 bg-red-100 text-black shadow-md">
                <span className="block text-center border-b-2 text-red-500 font-semibold">
                  Failed
                </span>
                <div className="px-3 py-1">
                  {failedCount > 0 && firstError ? (
                    <>
                      <p className="font-bold text-red-600">
                        ❌ Upload Failed
                      </p>
                      <p className="mt-1 flex justify-between">
                        <span className="font-semibold">
                          At line: {firstError.line}
                        </span>
                        <span className="bg-gray-100 px-2 rounded-lg text-xs font-semibold flex items-center">
                          Failed Upload: {failedCount}
                        </span>
                      </p>
                      <p className="mt-1 text-orange-400">
                        <span className="font-semibold">Error: {firstError.error}</span>{" "}
                        
                      </p>
                      <p className="mt-1">
                        Please check row{" "}
                        <span className="font-semibold">{firstError.line}</span>{" "}
                        in your <span className="text-lg capitalize">{fileType} file</span>.
                      </p>
                    </>
                  ) : (
                    <p className="flex items-center justify-center font-semibold h-20 text-gray-500 py-4">
                      ✅ No errors found!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </Snackbar>
  );
}

export default CustomSnackbar;
