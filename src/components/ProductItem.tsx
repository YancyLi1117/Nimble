import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: number;
}

const ProductItem: React.FC<ProductProps> = ({ id, name, category, price }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography color="text.secondary">{category}</Typography>
          <Typography variant="h5" color="primary">${price.toFixed(2)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
