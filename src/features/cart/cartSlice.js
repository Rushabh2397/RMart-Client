import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const addToCart = createAsyncThunk(
    'cart/addToCart', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/api/add_to_cart', value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserCart = createAsyncThunk(
    'cart/getUserCart', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:5000/v1/api/get_user_cart')
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateQty = createAsyncThunk(
    'cart/updateProductQty', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/api/update_qty',value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const moveToWishlist = createAsyncThunk(
    'cart/moveToWishlist', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/api/move_to_wishlist',value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const removeProduct = createAsyncThunk(
    'cart/removeProduct', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/api/remove_from_cart',value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        cartValue: 0,
        cartSize:0,
        error: null,
        loading: false
    },
    reducers: {
        emptyCart: (state, action) => {
            state.products = [];
        }
    },
    extraReducers: {
        [addToCart.pending]: (state, action) => {
            state.error = null
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products =  action.payload.data && action.payload.data.products ? action.payload.data.products : [];
            state.cartSize = action.payload.data.products_in_cart;
            state.cartValue = action.payload.data.total_cart_value;
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getUserCart.pending]: (state, action) => {
            state.error = null
        },
        [getUserCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products =  action.payload.data && action.payload.data.products ? action.payload.data.products : [];
            state.cartSize = action.payload.data.products_in_cart;
            state.cartValue = action.payload.data.total_cart_value;
        },
        [getUserCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [updateQty.pending]: (state, action) => {
            state.error = null
        },
        [updateQty.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products =  action.payload.data && action.payload.data.products ? action.payload.data.products : [];
            state.cartSize = action.payload.data.products_in_cart;
            state.cartValue = action.payload.data.total_cart_value;
        },
        [updateQty.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [removeProduct.pending]: (state, action) => {
            state.error = null
        },
        [removeProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products =  action.payload.data && action.payload.data.products ? action.payload.data.products : [];
            state.cartSize = action.payload.data.products_in_cart;
            state.cartValue = action.payload.data.total_cart_value;
        },
        [removeProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [moveToWishlist.pending]: (state, action) => {
            state.error = null
        },
        [moveToWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products =  action.payload.data && action.payload.data.products ? action.payload.data.products : [];
            state.cartSize = action.payload.data.products_in_cart;
            state.cartValue = action.payload.data.total_cart_value;
        },
        [moveToWishlist.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        
    }
})


export const { emptyCart } = cartSlice.actions;
export default cartSlice.reducer