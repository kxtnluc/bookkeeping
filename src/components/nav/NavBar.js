import {useNavigate, Link} from "react-router-dom"
import "./NavBar.css"
import "../../images/bookkeeplogo.png"


export const NavBar = ({currentUser}) => {

    const navigate = useNavigate()

    return (
        <div className="navbar-container">
            <ul className="navbar-left">
                <li className="navbar-item navbar-item-left">
                    <Link to="/thekeep" className="navbar-link">Keep</Link>
                </li>
                {/* <li className="navbar-item navbar-item-left">
                    <Link to="/posts/newpost" className="navbar-link">Books</Link>
                </li> */}
                <li className="navbar-item navbar-item-left">
                    <Link to="/library" className="navbar-link">Library</Link>
                </li>
            </ul>
            <div className="nav-icon">
                <div className="title">
                    BooKKeeping
                </div>
                {/* <img src="../images/bookkeeplogo.png" alt="" ></img> */}
            </div>
            <ul className="navbar-right">
                {/* <li className="navbar-item navbar-item-right">
                    <Link to="/library" className="navbar-link">Readlist</Link>
                </li> */}
                <li className="navbar-item navbar-item-right">
                    <Link to={`/profile/${currentUser.id}`} className="navbar-link">Profile</Link>
                </li>
                {localStorage.getItem("bookkeep_user") ? (
                <li className="navbar-item">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("bookkeep_user")
                            navigate("/login", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                "???"
            )}
            </ul>
        </div>
    )
}