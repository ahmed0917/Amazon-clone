import React, { useEffect, useState } from 'react';
import './payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrenyFormat from 'react-number-format';
import { getBasketTotal } from './reducer';
import axios from 'axios';

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, seterror] = useState(null);
    const [disabled, setdisabled] = useState(true);
    const [succeeded, setsucceeded] = useState(true);
    const [processing, setprocessing] = useState("");
    const [clientsecret, setclientsecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setclientsecret(response.data.clientsecret);
        }

        getClientSecret();
    }, [basket])

    console.log("THe secret is ", clientsecret)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setprocessing(true);

        const payLoad = await stripe.confirmAcssDebitPayment(clientsecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setsucceeded(true);
            seterror(null);
            setprocessing(false);

            history.replace('/orders')
        })

    };

    const handleChange = event => {
        setdisabled(event.empty);
        seterror(event.empty ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket.length}</Link> items
                    )
                </h1>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>Rose Villa,Malad West</p>
                        <p>Mumbai,400104</p>
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment_items">
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
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment_price">
                                <CurrenyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Subtotal ({basket.length} items): <strong>{value}</strong></h3>
                                        </>
                                    )}

                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing </p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
