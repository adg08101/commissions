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
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function BranchAdmin() {
  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    phone: "",
  });

  // Get current user
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await axios.get("http://192.168.1.40:4000/api/branches", {
        withCredentials: true,
      });
      setBranches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = (branch = null) => {
    // if (!isAdmin) return;
    if (branch) {
      setFormData({
        id: branch._id,
        name: branch.name,
        address: branch.address || "",
        phone: branch.phone || "",
      });
    } else {
      setFormData({ id: null, name: "", address: "", phone: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(
          `http://192.168.1.40:4000/api/branches/${formData.id}`,
          formData,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post("http://192.168.1.40:4000/api/branches", formData, {
          withCredentials: true,
        });
      }
      fetchBranches();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("Are you sure you want to delete this branch?")) return;

    try {
      await axios.delete(`http://192.168.1.40:4000/api/branches/${id}`, {
        withCredentials: true,
      });
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Branch Administration
      </Typography>

      {isAdmin && (
        <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
          Add Branch
        </Button>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch._id}>
                <TableCell onClick={() => handleOpen(branch)}>
                  {branch.name}
                </TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.phone}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(branch)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(branch._id)}
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
        <DialogTitle>{formData.id ? "Edit Branch" : "Add Branch"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isAdmin && (
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}
