
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from '@stripe/stripe-js';
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import synctoDB from "../helper/synctodb";
import { useCartStore } from "../store/useCartStore";
import { Navigation } from "./Navigation";

export default function CartPage() {

    const { user } = useUser();
    const userId = user?.id;
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    const cartItems = useCartStore((state) => state.cart);
    const addtoCart = useCartStore((state) => state.addToCart);
    const decrement = useCartStore((state) => state.decrement);
    const removeitem = useCartStore((state) => state.removeitem);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const totalquantity = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(totalquantity);
    }, [cartItems]);

    function handledelete(item : any) {
        const updatedcart = removeitem(item);
        synctoDB(userId, updatedcart)
    }

    function increment(item : any) {
        const updatedcart = addtoCart(item);
        synctoDB(userId, updatedcart)
    }

    function handledecrement(item : any) {
        const updatedcart = decrement(item);
        synctoDB(userId, updatedcart)
    }

    async function handlecheckout() {
        const stripe = await loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY);

        const header = {
            "Content-Type": "application/json",
        };

        const response = await fetch("http://localhost:5000/api/checkout", {
            method: "POST",
            headers: header,
            body: JSON.stringify({
                buyer_id : userId,
                products : cartItems,
            }),
        });

        const data = await response.json();


        window.location.href = data.url;

        if (data?.error) {
            console.error(data.error.message);
        }

    }

    return (
        <div>
            <Navigation
                cartCount={0}
            />
            <div className="pt-5 bg-slate-50 font-sans  pb-28">


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <h1 className="font-serif text-2xl md:text-5xl font-bold text-slate-900 mb-10 relative inline-block">
                        Your Cart
                        <span className="absolute -bottom-2 left-0 w-full h-3 bg-pop-yellow/40 -z-10 rounded-full"></span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {cartItems.length > 0 ?
                                cartItems.map((item) => (
                                    <div key={item.id}
                                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-5 items-center">

                                        <img
                                            src={item.img_url}
                                            alt={item.title}
                                            className="w-28 h-28 rounded-xl object-cover shadow-sm"
                                        />

                                        <div className="flex flex-col flex-1">
                                            <h2 className="font-bold text-lg text-slate-800">
                                                {item.title}
                                            </h2>

                                            <p className="text-slate-500 text-sm">Size: {item.size}</p>

                                            <div className="mt-3 flex items-center gap-3">
                                                <button onClick={() => handledecrement(item)}
                                                    className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-700 hover:border-pop-pink hover:text-pop-pink transition">
                                                    -
                                                </button>

                                                <span className="text-slate-900 font-semibold">{item.quantity}</span>

                                                <button onClick={() => increment(item)}
                                                    className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-700 hover:border-pop-pink hover:text-pop-pink transition">
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <p className="text-lg font-bold text-slate-900">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </p>

                                            <button onClick={() => handledelete(item)}
                                                className="mt-3 text-red-500 hover:text-red-700 transition">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                                : <p>No Items in Cart</p>
                            }
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 h-fit sticky top-24">
                            <h2 className="font-bold text-xl text-slate-900 mb-4">Order Summary</h2>

                            <div className="flex justify-between text-slate-700 mb-2">
                                <p>Subtotal</p>
                                <p>₹{subtotal.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between text-slate-700 mb-2">
                                <p>Shipping</p>
                                <p className="font-medium text-green-600">Free</p>
                            </div>

                            <div className="border-t my-4"></div>

                            <div className="flex justify-between text-xl font-bold text-slate-900">
                                <p>Total</p>
                                <p>₹{subtotal.toFixed(2)}</p>
                            </div>

                            <button onClick={handlecheckout}
                                className="w-full mt-6 bg-pop-pink text-white py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-pop-pink/30 hover:scale-[1.02] transition">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
