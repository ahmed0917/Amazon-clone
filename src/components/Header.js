import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function Header() {

    return (
        <div className="header">
            <img
                className="header_logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />

            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_option">
                <span className="header_LineOne">Hello</span>
                <span className="hLineTwo">Guest</span>
            </div>

            <div className="header_option">
                <span className="header_LineOne">Returns</span>
                <span className="header_LineTwo">& Orders</span>
            </div>


            <div className="header_option">
                <span className="header_LineOne">Your</span>
                <span className="header_LineTwo">Prime</span>
            </div>

            <div className="header_Basket">
            <ShoppingBasketIcon />
            </div>
        </div>
    );
}

export default Header;