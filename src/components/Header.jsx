import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useState } from "react";
import { Link } from 'react-router-dom';


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const { t, i18n } = useTranslation();

    const [select, setSelect] = useState(localStorage.getItem("language") || "SA");
    const onSelect = (code) => {

        const languageCode = code === "SA" ? "ar" : code;
        i18n.changeLanguage(languageCode); // Change language using i18n
        localStorage.setItem("language", languageCode);
        setSelect(code);

        // Set text direction correctly based on language
        if (languageCode === "ar") {
            document.documentElement.setAttribute("dir", "rtl");
            document.body.style.direction = "rtl"; // Ensure body also switches
        } else {
            document.documentElement.setAttribute("dir", "ltr");
            document.body.style.direction = "ltr";
        }

        console.log("Language changed to:", languageCode, "Dir:", document.documentElement.dir);
    };


    return (
        <>

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: "block", md: "none" } }}
                            >
                                {/* {pages.map((page) => ( */}
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: "center" }}>Home</Typography>
                                </MenuItem>
                                {/* ))} */}
                                <div>
                                    <ReactFlagsSelect
                                        className="countrybtn"

                                        selected={select}
                                        onSelect={onSelect}
                                        countries={["GB", "SA"]}  // GB for English, SA for Arabic
                                        customLabels={{ GB: "English", SA: "العربية" }}  // Arabic label
                                        placeholder={t("Select Language")}
                                    />

                                </div>
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            {t("LOGO")}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <Link to='/' style={{"textDecoration":"none"}}><Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {t('Home')}
                            </Button></Link>
                            <Link to="user" style={{"textDecoration":"none"}}><Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block"}}
                            >
                                {t("About")}
                            </Button></Link>
                            <Link to="Book" style={{"textDecoration":"none"}}><Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block"}}
                            >
                                {t("Book")}
                            </Button></Link>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '10px', color: "white" }}>
                                <ReactFlagsSelect
                                    className="custom-flags-dropdown countrybtn"
                                    selected={select}
                                    onSelect={onSelect}
                                    countries={["GB", "SA"]}
                                    customLabels={{ GB: "English", SA: "العربية" }}
                                    placeholder={t("Select Language")}
                                />
                            </div>

                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography sx={{ textAlign: "center" }}>
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;



















