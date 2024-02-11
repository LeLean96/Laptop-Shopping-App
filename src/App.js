import React, { useEffect } from "react";
import "./App.css";
// import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    const sendRequest = async () => {
      const res = await fetch("https://redux-http-c7955-default-rtdb.firebaseio.com/cartItems.json",
      {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      const data = await res.json();
    };
    sendRequest();
  }, [cart]);
  return (
    <div className="App">
      {/* <Auth /> */}
       <Layout />
    </div>
  );
}

export default App;
