import React from 'react'
import './subtotal.css'
import CurrenyFormat from 'react-number-format'
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

const Subtotal = () => {
    const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrenyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* Part of the homework */}
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}

                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button onClick={e => history.push("/payment")}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
