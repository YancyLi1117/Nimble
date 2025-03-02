import React from "react"; // ✅ Add this import

import Link from "next/link";
import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3">Welcome to Our Product Store</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        Browse our amazing products!
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} component={Link} href="/products">
        View Products
      </Button>
    </Container>
  );
}
