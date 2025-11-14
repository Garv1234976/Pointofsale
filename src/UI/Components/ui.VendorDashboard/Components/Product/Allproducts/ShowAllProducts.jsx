import { useEffect, useState } from "react";
import api from "../../../../../../Services/SalesPulse-backend";
import { useSnackbar } from "../../../../../../Utils/SnackBar/Message";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useAuth } from "../../../../../../Contexts/Global/VendorContext";
const GetAllProducts = () => {
  const {vendor} = useAuth();
  // console.log(vendor?._id)
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();
  const [products, setAllproducts] = useState([]);

 
  const getProducts = async () => {
    const res = await api.get("/api/product/getAllProducts", {
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      // showSuccess(res.data)
      console.log(res.data);
      showSuccess("Manage Products here !");
      setAllproducts(res.data.products);
    }
  };




  useEffect(() => {
    
    getProducts();
  }, []);
  return (
    <>
      <div className="p-4 space-y-6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">MRP</TableCell>
                <TableCell align="center">Discount</TableCell>
                <TableCell align="center">Landing</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">SKU</TableCell>
                <TableCell align="center">Unit Type</TableCell>
                <TableCell align="center">Weight Unit</TableCell>
                <TableCell align="center">Expire At</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((items) => (
                <TableRow key={items?._id}>
                  {items.image.map((img, index) => (
                    <TableCell align="center" key={index}>
                      <img src={`http://localhost:3000/uploads/${img}`} alt={`img-${items?.productName}`} />
                    </TableCell>
                  ))}
                  <TableCell align="center">{items?.productName}</TableCell>
                  <TableCell align="center">{items?.mrp}</TableCell>
                  <TableCell align="center">{items?.discountPrice}</TableCell>
                  <TableCell align="center">{items?.landingPrice}</TableCell>
                  <TableCell align="center">{items?.inStock}</TableCell>
                  <TableCell align="center">{items?.sku}</TableCell>
                  <TableCell align="center">{items?.unitType}</TableCell>
                  <TableCell align="center">{items?.weightUnit}</TableCell>
                  <TableCell align="center">{Date.now(items?.expireAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {SnackbarComponent}
    </>
  );
};

export default GetAllProducts;
