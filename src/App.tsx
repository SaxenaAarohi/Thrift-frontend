
"use client"
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartPage from "./components/CartPage";
import CheckRole from "./components/CheckRole";
import Complete_profile from "./components/Complete-profile";
import Home from "./components/Home";
import Login from "./components/Login";
import PaymentCancelCard from "./components/PaymentCancelCard";
import PaymentSuccessCard from "./components/PaymentSuccessCard";
import SellerHome from "./components/SellerHome";
import Sign_up from "./components/Sign_up";
import synctoDB from "./helper/synctodb";
import { useCartStore } from "./store/useCartStore";


const App = () => {

  const { user } = useUser();
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);
  const clearcart = useCartStore((state) => state.clearcart);

  useEffect(() => {
    async function handlelogin() {
      const res = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/cart/${user?.id}`);
      const dbcart = await res.json();

      if (cart.length > 0 && dbcart.length === 0)
        synctoDB(user?.id, cart);

      else {
        const normalized = dbcart.map(item => ({
          ...item.product,
          quantity: item.quantity
        }));

        setCart(normalized);
      }
    }
    if (user) {
      handlelogin();
    }

  }, [user]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller" element={<SellerHome />} />
          <Route path="/checkrole" element={<CheckRole />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<Sign_up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<PaymentSuccessCard/>} />
          <Route path="/cancel" element={<PaymentCancelCard/>} />
          <Route path="/complete_profile" element={<Complete_profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
