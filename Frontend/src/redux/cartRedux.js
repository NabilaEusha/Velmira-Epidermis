import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        products: [],
        quantity: 0,
        email: '',
        total: 0,
    },

    reducers: {

        addProduct: (state, action) => {
            const existingProductIndex = state.products.findIndex(product => product._id === action.payload._id);

            if (existingProductIndex !== -1) {
                // Product already exists, update quantity
                const existingProduct = state.products[existingProductIndex];
                const newQuantity = existingProduct.quantity + action.payload.quantity;

                state.products[existingProductIndex].quantity = newQuantity;
                state.total += action.payload.price * action.payload.quantity;
            } else {
                // New product, add to cart
                state.products.push(action.payload);
                state.email = action.payload.email;
                state.total += action.payload.price * action.payload.quantity;
            }

            // Count unique products (items) instead of total quantity
            state.quantity = state.products.length;
        },

        removeProduct: (state, action) => {
            const index = state.products.findIndex(product => product._id === action.payload._id);

            if (index !== -1) {
                state.total -= state.products[index].price * state.products[index].quantity;
                state.products.splice(index, 1);
            }

            // Count unique products (items) instead of total quantity
            state.quantity = state.products.length;
        },

        updateQuantity: (state, action) => {
            const { productId, newQuantity } = action.payload;
            const productIndex = state.products.findIndex(product => product._id === productId);

            if (productIndex !== -1) {
                const oldQuantity = state.products[productIndex].quantity;
                const price = state.products[productIndex].price;

                // Update the product quantity
                state.products[productIndex].quantity = newQuantity;

                // Recalculate total by subtracting old total and adding new total
                state.total -= price * oldQuantity;
                state.total += price * newQuantity;
            }

            // Count unique products (items) instead of total quantity
            state.quantity = state.products.length;
        },

        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },

        resetCart: (state) => {
            // Reset to initial state completely
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.email = '';
        }
    }
})


export const { addProduct, removeProduct, updateQuantity, clearCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer