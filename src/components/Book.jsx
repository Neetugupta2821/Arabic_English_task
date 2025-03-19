import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Container, Grid, Card, CardContent, Typography, Pagination, Box, CircularProgress, CardMedia, Drawer, List, ListItem,
  ListItemText, Divider, TextField, IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";

const Book = () => {

  const [originalBooks, setOriginalBooks] = useState([]);
  const [translatedBooks, setTranslatedBooks] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);  
  const [translatedCategories, setTranslatedCategories] = useState([]);  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://schedule.msarii.com/library/published-books/?page=${page}`);
      if (response.status === 200 && response.data.books) {
        setOriginalBooks(response.data.books);
        setTotalPages(response.data.total_pages);

    
        const extractedCategories = response.data.books.flatMap((book) => book.category);
        const uniqueCategories = Object.values(
          extractedCategories.reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
          }, {})
        );

        setOriginalCategories(uniqueCategories);  
      } else {
        console.error("Failed to fetch books:", response.data.message);
        setOriginalBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setOriginalBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

 
  const translateText = async (text) => {
    try {
      const response = await axios.post("https://translate.googleapis.com/translate_a/single", null, {
        params: {
          client: "gtx",
          sl: "auto",  
          tl: i18n.language,  
          dt: "t",
          q: text,
        },
      });
      return response.data[0][0][0];  
    } catch (error) {
      console.error("Translation error:", error);
      return text;  
    }
  };

  
  useEffect(() => {
    const translateBooks = async () => {
      if (originalBooks.length > 0) {
        const translated = await Promise.all(
          originalBooks.map(async (book) => ({
            ...book,
            title: await translateText(book.title),
            author: await translateText(book.author?.name || "Unknown"),
          }))
        );
        setTranslatedBooks(translated);
      }
    };
    translateBooks();
  }, [originalBooks, i18n.language]);

  
  useEffect(() => {
    const translateCategories = async () => {
      if (originalCategories.length > 0) {
        const translated = await Promise.all(
          originalCategories.map(async (category) => ({
            ...category,
            name: await translateText(category.name),
          }))
        );
        setTranslatedCategories(translated);
      }
    };
    translateCategories();
  }, [originalCategories, i18n.language]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "white",
          },
        }}
        anchor={i18n.language === "ar" ? "right" : "left"} // Set the sidebar position based on language
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >


        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t("Filter Books")}
          </Typography>

          {/* Category List */}
          <Typography variant="subtitle1">{t("Categories")}</Typography>
          <List>
            <ListItem button onClick={() => setTranslatedCategories([])}>
              <ListItemText primary={t("All Categories")} />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            {translatedCategories.map((category) => (
              <ListItem key={category.id}>
                <ListItemText primary={`${category.name} (${category.book_count})`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <IconButton
          color="primary"
          onClick={() => setDrawerOpen(true)}
          sx={{ backgroundColor: "#fff", borderRadius: 2 }}
        >
          <FilterListIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <TextField
            label="Search Book"
            variant="outlined"
            sx={{
              maxWidth: "400px",
              backgroundColor: "#fff",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {translatedBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="220"
                image={book.bookCover
                  ? `https://schedule.msarii.com${book.bookCover}`
                  : "https://i.pinimg.com/originals/12/8e/d9/128ed9aedd1fef8a9838f4e9b3b28a28.png"}
                alt={book.title}
                sx={{ objectFit: "cover", p: 1, borderRadius: 1 }}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {t("Author")}: {book.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
      </Box>
    </Container>
  );
};

export default Book;
