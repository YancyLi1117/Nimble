"use client"; 
import React from "react"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Button } from "@mui/material";
import { products } from "@prisma/client";
import { fetchProductById } from "../../lib/api"; 

export default function ProductDetail() {
  const [product, setProduct] = useState<products | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams(); // ✅ Unwrap params properly
  const productId = params.id as string; // ✅ Ensure it's a string

  useEffect(() => {
    if (!productId) return;

    fetchProductById(productId)
      .then(setProduct)
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("❌ Error fetching product:", error.message);
        } else {
          console.error("❌ Unknown error:", error);
        }
      })
      .finally(() => setLoading(false));
      
  }, [productId]);

  if (loading) return <CircularProgress />;
  if (!product) return <Typography variant="h6" color="error">Product not found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        {product.imageurl && (
          <CardMedia component="img" height="300" image={product.imageurl} alt={product.name} />
        )}
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6" color="text.secondary">{product.category}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }} color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.history.back()}>
            Back to List
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}