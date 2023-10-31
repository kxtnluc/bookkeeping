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
                    <Link to="/thekeep" className="navbar-link"><Chip className="library-icon" sx={{ color: "white", fontWeight: 600, fontSize: "19px" }} label='Keep' icon={<AccountBalanceIcon color="white" />} /></Link>
                </li>
                {/* <li className="navbar-item navbar-item-left">
                    <Link to="/posts/newpost" className="navbar-link">Books</Link>
                </li> */}
                <li className="navbar-item navbar-item-left">
                    <Link to="/library" className="navbar-link"><Chip className="library-icon" sx={{ color: "white", fontWeight: 600, fontSize: "19px" }} label='Library' icon={<BookIcon color="white" />} /></Link>
                </li>
                <li className="navbar-item navbar-item-left">
                    <Link to="/search" className="navbar-link"><Chip className="search-icon" sx={{ color: "white", fontWeight: 600, fontSize: "19px" }} label='Search' icon={<SearchIcon color="whitesmoke" />} /></Link>
                </li>
            </ul>
            <div className="nav-icon">
                <div className="title">
                    BooKKeeping
                </div>
                {/* <img src="../images/bookkeeplogo.png" alt="" ></img> */}
            </div>
            <ul className="navbar-right">


                <div>
                    <Button
                        sx={{color: 'white'}}
                        variant="text"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon color="white"/>
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