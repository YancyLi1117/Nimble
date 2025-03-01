import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface ProductProps {
  name: string;
  category: string;
  price: number;
}

const ProductItem: React.FC<ProductProps> = ({ name, category, price }) => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">{category}</Typography>
        <Typography variant="h5" color="primary">
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
