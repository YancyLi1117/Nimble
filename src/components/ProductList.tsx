"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");

  const fetchProducts = async (selectedCategory: string) => {
    const url = selectedCategory ? `/api/products?category=${selectedCategory}` : "/api/products";
    console.log("🌍 请求 API:", url); // 👈 这里加 log 看看请求的 URL 是否变化
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]); // 👈 监听 category 变化，确保每次选择都会请求 API

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

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

      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductItem {...product} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No products found
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
