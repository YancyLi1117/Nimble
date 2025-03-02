"use client"; // ✅ Ensure this component runs on the client side

import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from "../app/lib/api";
import ProductItem from "./ProductItem";
import { Box, MenuItem, Select, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

// ✅ Use a normal function instead of assigning to `const`
function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(category);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("⚠️ Unexpected API response:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]); // ✅ Fetch products only when the category changes

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Product List</Typography>

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="laptop">Laptop</MenuItem>
        <MenuItem value="desktop">Desktop</MenuItem>
        <MenuItem value="server">Server</MenuItem>
      </Select>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", mb: 2 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} key={product.id}>
                <ProductItem {...product} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">No products found</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}

export default ProductList;
