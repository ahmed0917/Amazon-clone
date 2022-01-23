import React from "react";
import "./header.css";
import { Link } from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
// import { Auth } from 'aws-amplify';

function Header() {
    const [{ basket,user }] = useStateValue();
    // console.log(basket)

    const handleAuthentication = () =>{
        if (user){
            auth.signOut({ global: true });
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" />
            </Link>

            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"} className="header_link">
                    <div onClick={handleAuthentication} className="header_option">
                        <span className="header_LineOne">Hello {!user ? 'Guest' : user.email}</span>
                        <span className="header_LineTwo">{user?'Sign Out':'Sign In'}</span>
                    </div>
                </Link>

                <Link to="/" className="header_link">
                    <div className="header_option">
                        <span className="header_LineOne">Returns</span>
                        <span className="header_LineTwo">& Orders</span>
                    </div>
                </Link>

                <Link to="/" className="header_link">
                    <div className="header_option">
                        <span className="header_LineOne">Your</span>
                        <span className="header_LineTwo">Prime</span>
                    </div>
                </Link>
            </div>

            <Link to="/checkout">
                <div className="header_Basket">
                    <ShoppingBasketIcon />
                    <span className="header_LineTwo header_basketCount">{basket.length}</span>
                </div>
            </Link>
        </div>
    );
}

export default Header;