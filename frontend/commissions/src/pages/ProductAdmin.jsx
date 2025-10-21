import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    sku: "",
    name: "",
    price: "",
    commissionType: "flat",
    commissionValue: 0,
    active: true,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://192.168.1.40:4000/api/products", {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setFormData({
        id: product._id,
        sku: product.sku || "",
        name: product.name || "",
        price: product.price || "",
        commissionType: product.commissionType || "flat",
        commissionValue: product.commissionValue || 0,
        active: product.active ?? true,
      });
    } else {
      setFormData({
        id: null,
        sku: "",
        name: "",
        price: "",
        commissionType: "flat",
        commissionValue: 0,
        active: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(
          `http://192.168.1.40:4000/api/products/${formData.id}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://192.168.1.40:4000/api/products", formData, {
          withCredentials: true,
        });
      }
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://192.168.1.40:4000/api/products/${id}`, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Product Administration
      </Typography>

      {isAdmin && (
        <Button variant="contained" onClick={() => handleOpen()}>
          Add Product
        </Button>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Commission Type</TableCell>
              <TableCell>Commission Value</TableCell>
              <TableCell>Active</TableCell>
              {isAdmin && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.commissionType}</TableCell>
                <TableCell>{product.commissionValue}</TableCell>
                <TableCell>{product.active ? "Yes" : "No"}</TableCell>
                {isAdmin && (
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(product)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {formData.id ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="SKU"
            name="sku"
            fullWidth
            value={formData.sku}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={handleChange}
          />
          <Select
            fullWidth
            name="commissionType"
            value={formData.commissionType}
            onChange={handleChange}
            sx={{ mt: 2 }}
          >
            <MenuItem value="flat">Flat</MenuItem>
            <MenuItem value="percent">Percent</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label="Commission Value"
            name="commissionValue"
            type="number"
            fullWidth
            value={formData.commissionValue}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.active}
                onChange={handleChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
