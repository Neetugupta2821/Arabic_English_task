import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Pagination, Box } from "@mui/material";
 

const products = [
   
   
  {
    "id": 1,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
     
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    
  },
  {
    "id": 2,
    "title": "Mens Casual Slim Fit",
    "price": 15.99,
    
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    
  },
  {
    "id": 3,
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
     
  },
  
  {
    "id": 4,
    "title": "White Gold Plated Princess",
    "price": 9.99,
    
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    
  },
  {
    "id": 5,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
     
  },
  
  {
    "id": 6,
    "title": "SanDisk SSD PLUS 1TB Internal SSD",
    "price": 109,
 
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  
  },
  {
    "id": 7,
    "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "price": 109,
     
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    
  },
  {
    "id": 8,
    "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "price": 114,
     
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
   
  },
];

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { t } = useTranslation();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
 
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, height: "100%", boxShadow: 3 }}>
              <CardMedia component="img" height="200" image={product.image} alt={t(product.title)} sx={{ objectFit: "contain", p: 2 }} />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {t(product.title)}
                </Typography>
                <Typography variant="body1">
                  {t("price")}: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination count={Math.ceil(filteredProducts.length / itemsPerPage)} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
    </>
     
  );
};

export default Home;
















