import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"
import "../../images/bookkeeplogo.png"
import SearchIcon from '@mui/icons-material/Search';
import { Button, Chip, Menu, MenuItem } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';


export const NavBar = ({ currentUser }) => {

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navbar-container">
            <ul className="navbar-left">
                <li className="navbar-item navbar-item-left">
                    <Link to="/thekeep" className="navbar-link"><Button className="library-icon" sx={{ color: "white", fontWeight: 600, fontSize: "19px" }} label='Keep' startIcon={<AccountBalanceIcon color="white" />}>Keep</Button></Link>
                </li>
                {/* <li className="navbar-item navbar-item-left">
                    <Link to="/posts/newpost" className="navbar-link">Books</Link>
                </li> */}
                <li className="navbar-item navbar-item-left">
                    <Link to="/library" className="navbar-link"><Button className="library-icon" sx={{ color: "white", fontWeight: 600, fontSize: "19px" }} label='Library' startIcon={<BookIcon color="white" />}>Library</Button></Link>
                </li>
                <li className="navbar-item navbar-item-left">
                    <Link to="/search" className="navbar-link"><Button className="search-icon" sx={{ color: "white", fontWeight: 600, fontSize: "19px" }} label='Search' startIcon={<SearchIcon color="whitesmoke" />}>Search</Button></Link>
                </li>
            </ul>
            <ul className="navbar-right">


                <div>
                    <Button
                        sx={{color: 'white'}}
                        size="large"
                        variant="text"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon sx={{fontSize: 40}} color="white"/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}><Link className="link" to={`/profile/${currentUser.id}`}>Profile</Link></MenuItem>
                        {localStorage.getItem("bookkeep_user") ? (
                            <MenuItem onClick={handleClose}>
                                <Link
                                    className="link"
                                    to=""
                                    onClick={() => {
                                        localStorage.removeItem("bookkeep_user")
                                        navigate("/login", { replace: true })
                                    }}
                                >
                                    Logout
                                </Link>
                            </MenuItem>
                        ) : (
                            "???"
                        )}
                        
                    </Menu>
                </div>
            </ul>
        </div>
    )
}