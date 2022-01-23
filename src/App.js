import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout';
import Login from './components/Login';
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from './components/StateProvider';
import { auth } from "./components/firebase";

const promise = loadStripe("pk_test_51KHwCDSAXF7IBgAwQdLJYXYMfRD4ym9tom758J4GRu4Hqw1K2vJUyX7bMZPjxkRSr4o3dMAJdrtT6dlosw5KBH5U00eyvLHTpa");

function App() {
  const [, dispatch] = useStateValue();
  const [, setuser] = useState("");
  useEffect(() => {
    const unSubs = onAuthStateChanged(auth, currentUser => {
      setuser(currentUser);
      // console.log("USER is", currentUser)
      if (currentUser) {
        dispatch({
          type: "SET_USER",
          user: currentUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    })

    return () => {
      unSubs();
    }

  }, [])

  return (
    <>
      <Router>
        <Switch>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </Router>
    </>
  )
}

export default App;
