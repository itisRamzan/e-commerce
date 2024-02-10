import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
    cart: [],
    showCart: false,
    subTotal: 0,
    setSubTotal: (subTotal) => set((state) => {
        return { subTotal }
    }),
    setShowCart: (cartView) => set((state) => {
        return { showCart: cartView }
    }),
    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.itemCode === item.itemCode);
        if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
                if (cartItem.itemCode === item.itemCode) {
                    return {
                        ...cartItem,
                        qty: cartItem.qty + 1
                    };
                }
                return cartItem;
            });
            state.saveCart(updatedCart);
            return { cart: updatedCart };
        } else {
            state.saveCart([...state.cart, { ...item, qty: 1 }]);
            return { cart: [...state.cart, { ...item, qty: 1 }] };
        }
    }),
    removeFromCart: (itemCode) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.itemCode === itemCode);
        if (existingItem.qty === 1) {
            const updatedCart = state.cart.filter((cartItem) => cartItem.itemCode !== itemCode);
            state.saveCart(updatedCart);
            return { cart: updatedCart };
        }
        else {
            const updatedCart = state.cart.map((cartItem) => {
                if (cartItem.itemCode === itemCode) {
                    return {
                        ...cartItem,
                        qty: cartItem.qty - 1
                    };
                }
                return cartItem;
            });
            state.saveCart(updatedCart);
            return { cart: updatedCart };
        }
    }),
    deleteFromCart: (itemCode) => set((state) => {
        const updatedCart = state.cart.filter((cartItem) => cartItem.itemCode !== itemCode);
        state.saveCart(updatedCart);
        return { cart: updatedCart };
    }),
    clearCart: () => set((state) => {
        return { cart: [], subTotal: 0 }
    }),
    buyNow: (item) => set((state) => {
        state.clearCart();
        let newCart = [item];
        state.saveCart(newCart);
        return { cart: newCart, showCart: false }
    }),
    saveCart: (cart) => set((state) => {
        let subT = 0;
        for (let item in cart) {
            subT += cart[item].qty * cart[item].price;
        }
        return { subTotal: subT }
    })
})

export const useUserStore = create(
    devtools(
        persist(
            userStore,
            {
                name: "user-storage"
            }
        )
    )
);