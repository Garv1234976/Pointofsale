import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import DefaultImage from "/default.png";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import api from "../../../../../../Services/SalesPulse-backend";
import { useSnackbar } from "../../../../../../Utils/SnackBar/Message";
import CustomSnackbar from "../../../../../../Utils/SnackBar/Product-Snackbar";

function ImportFromCsvORExcel({ onFileSelect }) {
  const [importType, setImportType] = useState("excel");
  return (
    <Box sx={{ width: 300, py: 2 }}>
      <FormControl>
        <Box
          sx={{ width: 300, display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ height: "32px" }}>
            <InputLabel
              sx={{ fontSize: 24 }}
              className="-my-5"
              variant="standard"
              htmlFor="uncontrolled-native"
            >
              Import From
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={(e) => setImportType(e.target.value)}
              sx={{ width: 200 }}
            >
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </NativeSelect>
          </Box>
          <button
            type="button"
            className="bg-blue-600 text-white px-2 py-0 rounded hover:bg-blue-500"
            onClick={() => {
              document.getElementById("hidden-import-file").click();
            }}
          >
            Import
          </button>
          <input
            id="hidden-import-file"
            type="file"
            accept={importType === "csv" ? ".csv" : ".xlsx, .xls"}
            style={{ display: "none" }}
            onChange={(e) => onFileSelect(importType, e.target.files[0])}
          />
        </Box>
      </FormControl>
    </Box>
  );
}

export default function VendorProductTable() {
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();
  const [fileType, setFileType] = useState("");
  const emptyRow = {
    vendorId: "",
    mrp: "",
    discountPrice: "",
    landingPrice: "",
    productName: "",
    desc: "",
    sku: "",
    inStock: "",
    expiredAt: "",
    unitType: "",
    weightUnit: "",
    image: null,
  };

  const [rows, setRows] = useState([emptyRow]);
  const [snackbarData, setSnackbarData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  //   console.log(rows)
  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
  };

  const MAX_ROWS = 10;

  const addRow = (index) => {
    if (rows.length >= MAX_ROWS) {
      showError(`You can only Add up to ${MAX_ROWS} products at a time.`);
      return;
    }
    const updated = [...rows];
    updated.splice(index + 1, 0, { ...emptyRow });
    setRows(updated);
  };

  const handleBulkSubmit = async () => {
    const formData = new FormData();

    // ✅ rows must contain min 10 entries
    if (rows.length < 0) {
      alert("Minimum 10 products required");
      return;
    }

    rows.forEach((row, index) => {
      formData.append(
        `products[${index}][vendorId]`,
        "6911be427ee3036c28901e93"
      );
      formData.append(`products[${index}][mrp]`, row.mrp);
      formData.append(`products[${index}][discountPrice]`, row.discountPrice);
      formData.append(`products[${index}][landingPrice]`, row.landingPrice);
      formData.append(`products[${index}][productName]`, row.productName);
      formData.append(`products[${index}][desc]`, row.desc);
      formData.append(`products[${index}][sku]`, row.sku);
      formData.append(`products[${index}][inStock]`, row.inStock);
      formData.append(`products[${index}][expiredAt]`, row.expiredAt);
      formData.append(`products[${index}][unitType]`, row.unitType);
      formData.append(`products[${index}][weightUnit]`, row.weightUnit);

      // ✅ attach image if exists
      if (row.image) {
        formData.append(`products[${index}][image]`, row.image);
      }
    });

    try {
      const res = await api.post("/api/product/createProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.failed >= 1) {
        showError(res.data.results[0].error);
      } else {
        showSuccess(
          `${res.data?.message}\n✅ ${res.data.saved} products saved\n❌ ${res.data.failed} failed `
        );
      }
      console.log("Bulk Success:", res.data?.failed);
    } catch (err) {
      showError(err.response?.data?.message);
      console.error("Bulk ERROR:", err.response?.data);
    }
  };

  const handleImport = async (type, file) => {
    if (!file) {
      showError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("vendorId", "6911be427ee3036c28901e93"); //  your vendorId
    formData.append(type === "csv" ? "csvFile" : "excelFile", file);

    try {
      const endpoint =
        type === "csv"
          ? "/api/csvParser/uploadCsv"
          : "/api/excelParser/uploadExcel";

      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Import Result:", res.data);

      // if (res.data.errors.length > 0) {

      // } else {
      //   showSuccess(
      //     `✅ Imported ${res.data.insertedCount} products successfully`
      //   );
      // }
      setSnackbarData({
        insertedCount: res.data.insertedCount,
        failedCount: res.data.failedCount,
        errors: res.data.errors,
      });
      setFileType(type);
      setOpenSnackbar(true);
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || "Import failed");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <ImportFromCsvORExcel onFileSelect={handleImport} />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ width: 300 }} align="center">
                Image
              </TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">MRP</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Landing</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">SKU</TableCell>
              <TableCell align="center">Unit Type</TableCell>
              <TableCell align="center">Weight Unit</TableCell>
              <TableCell align="center">Expire At</TableCell>
              <TableCell align="center">Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <EditableRow
                key={i}
                row={row}
                index={i}
                updateRow={updateRow}
                addRow={addRow}
                rowsLength={rows.length}
              />
            ))}
          </TableBody>
        </Table>

        {SnackbarComponent}
        <CustomSnackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          data={snackbarData}
          fileType={fileType}
        />
      </TableContainer>
      <button
        onClick={handleBulkSubmit}
        className="absolute bottom-3 right-10 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
      >
        Submit All Products
      </button>
    </div>
  );
}

function EditableRow({ row, index, updateRow, addRow, rowsLength }) {
  const [open, setOpen] = useState(false);
  const imgSrc = row.image ? URL.createObjectURL(row.image) : DefaultImage;
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();
  const MAX_ROWS = 10;

  const handleKeyDown = (e, index, currentField) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const fieldsOrder = [
        "productName",
        "mrp",
        "discountPrice",
        "landingPrice",
        "inStock",
        "sku",
        "unitType",
        "weightUnit",
        "expiredAt",
      ];

      const currentIndex = fieldsOrder.indexOf(currentField);

      if (currentIndex !== -1 && currentIndex < fieldsOrder.length - 1) {
        const nextField = fieldsOrder[currentIndex + 1];
        const nextInput = document.querySelector(
          `[data-row="${index}"][data-field="${nextField}"]`
        );
        if (nextInput) nextInput.focus();
      } else {
        // Last field in the row
        if (index < MAX_ROWS - 1 && rowsLength.length < MAX_ROWS) {
          // Add new row automatically
          addRow(index);
          setTimeout(() => {
            const firstInput = document.querySelector(
              `[data-row="${index + 1}"][data-field="productName"]`
            );
            if (firstInput) firstInput.focus();
          }, 50);
        }
      }
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-2">
            <img
              src={imgSrc}
              alt="preview"
              className="w-10 h-10 object-cover rounded border-b-2 border-b-green-500 "
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const allowedTypes = [
                  "image/jpeg",
                  "image/png",
                  "image/webp",
                  "image/svg+xml",
                ];
                const maxSize = 5 * 1024 * 1024; // 5 MB

                // ✅ Type check
                if (!allowedTypes.includes(file.type)) {
                  showError(
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded text-red-800 shadow-sm text-sm">
                      <p className="font-bold text-red-600">
                        Invalid File Type
                      </p>
                      <p>Only JPG, PNG, WEBP, or SVG files are allowed.</p>
                    </div>
                  );
                  e.target.value = ""; // Reset file input
                  return;
                }

                // ✅ Size check
                if (file.size > maxSize) {
                  showError(
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded text-red-800 shadow-sm text-sm">
                      <p className="font-bold text-red-600">File Too Large</p>
                      <p>
                        {file.name} is {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB. Max allowed size is 5 MB.
                      </p>
                    </div>
                  );
                  e.target.value = ""; // Reset file input
                  return;
                }

                // ✅ Passed validation — update the state
                updateRow(index, "image", file);
              }}
              className="border p-1 rounded w-full"
            />
          </div>
        </TableCell>

        <TableCell>
          <input
            value={row.productName}
            onChange={(e) => updateRow(index, "productName", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "productName")}
            data-row={index}
            data-field="productName"
            className="border p-1 rounded w-full"
          />
        </TableCell>

        <TableCell align="center">
          <input
            value={row.mrp}
            onChange={(e) => updateRow(index, "mrp", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "mrp")}
            data-row={index}
            data-field="mrp"
            className="border p-1 rounded w-20 text-center"
          />
        </TableCell>

        <TableCell align="center">
          <input
            value={row.discountPrice}
            onChange={(e) => updateRow(index, "discountPrice", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "discountPrice")}
            data-row={index}
            data-field="discountPrice"
            className="border p-1 rounded w-20 text-center"
          />
        </TableCell>

        <TableCell align="center">
          <input
            value={row.landingPrice}
            onChange={(e) => updateRow(index, "landingPrice", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "landingPrice")}
            data-row={index}
            data-field="landingPrice"
            className="border p-1 rounded w-20 text-center"
          />
        </TableCell>

        <TableCell align="center">
          <input
            value={row.inStock}
            onChange={(e) => updateRow(index, "inStock", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "inStock")}
            data-row={index}
            data-field="inStock"
            className="border p-1 rounded w-20 text-center"
          />
        </TableCell>

        <TableCell align="center">
          <input
            value={row.sku}
            onChange={(e) => updateRow(index, "sku", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "sku")}
            data-row={index}
            data-field="sku"
            className="border p-1 rounded w-20 text-center"
          />
        </TableCell>

        <TableCell align="center">
          <select
            value={row.unitType}
            onChange={(e) => updateRow(index, "unitType", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "unitType")}
            data-row={index}
            data-field="unitType"
            className="border p-1 rounded w-24 text-center  focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select
            </option>
            {["piece", "kg", "gram", "litre", "packet", "box"].map((unit) => (
              <option key={unit} value={unit} className="text-black">
                {unit}
              </option>
            ))}
          </select>
        </TableCell>

        <TableCell align="center">
          <select
            value={row.weightUnit}
            onChange={(e) => updateRow(index, "weightUnit", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "weightUnit")}
            data-row={index}
            data-field="weightUnit"
            className="border p-1 rounded w-24 text-center  focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select
            </option>
            {["gram", "kg"].map((unit) => (
              <option key={unit} value={unit} className="text-black">
                {unit}
              </option>
            ))}
          </select>
        </TableCell>

        <TableCell align="center">
          <input
            value={row.expiredAt}
            onChange={(e) => updateRow(index, "expiredAt", e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index, "expiredAt")}
            data-row={index}
            data-field="expiredAt"
            className="border p-1 rounded w-20 text-center"
          />
        </TableCell>

        <TableCell align="center">
          {console.log(rowsLength)}
          {row.mrp === "" &&
          row.mrp === "" &&
          row.discountPrice === "" &&
          row.landingPrice === "" &&
          row.productName === "" &&
          row.sku === "" &&
          row.unitType === "" &&
          row.weightUnit === "" ? (
            <button
              disabled
              className="px-3 py-1 bg-gray-400 cursor-not-allowed"
            >
              +
            </button>
          ) : (
            <button
              onClick={() => addRow(index)}
              className="px-3 py-1 rounded text-white transition bg-blue-600 hover:bg-blue-500"
            >
              +
            </button>
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={12} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open}>
            <Box className="w-full flex justify-end ">
              <Box margin={2} width={"70%"}>
                <div className="text-lg font-semibold mb-3">
                  Product Summary
                </div>

                <div className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg">
                  <div className="w-full md:w-4/3 flex justify-start">
                    <img
                      src={imgSrc}
                      alt="preview"
                      className="w-25 h-25 object-cover rounded bg-gray-100 px-1.5 py-1.5"
                    />
                  </div>
                  <div className="w-full md:w-12/2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(row)
                      .filter(([k]) => k !== "image")
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className="flex flex-col   justify-between bg-gray-100 p-3 rounded"
                        >
                          <span className="text-sm font-semibold capitalize text-gray-600">
                            {key}
                          </span>
                          <div className="bg-gray-200 px-3 rounded-lg">
                            <span className="text-base text-gray-800">
                              {val || "-"}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {SnackbarComponent}
    </>
  );
}
