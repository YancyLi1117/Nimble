"use client"; 
import React from "react"; 
import Navbar from "../../components/Navbar";
import ProductList from "../../components/ProductList";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: 10 }}> {/* Ensure content starts below navbar */}
        <ProductList />
      </Container>
    </>
  );
}
