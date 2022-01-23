import React from 'react'
import './checkout.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from "./StateProvider";
import Subtotal from './Subtotal';
import { useHistory } from 'react-router-dom';

function Checkout() {
    const history = useHistory();
    const [{ basket, user }] = useStateValue();


    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />

                {basket.length === 0 ? (

                    <>

                        <div className="cartEmpty_row">
                            <div className="cartEmpty">
                                <div className="cardEmpty_info">
                                    <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" alt="" />
                                    <h2 className="checkout_title">Your Shopping Basket is empty</h2>
                                </div>
                                <button className="signin_btn">Sign in to your account</button>
                                <button className="signup_btn">Sign up now</button>
                            </div>
                        </div>

                        <p><small>The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.
                            Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.</small></p>
                    </>


                ) : (
                    <>
                        {user === null ?
                            <>

                                {history.push("/login")}
                            </>
                            :
                            <div>
                                <h5>Hello, {user.email}</h5>
                                <h3 className="checkout_title">Your Shopping Basket</h3>

                                {basket.map(item => (
                                    <CheckoutProduct
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                    />
                                ))}

                            </div>
                        }


                    </>
                )}
            </div>
            {basket.length > 0 && (
                <div className="checkout_right">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout;
