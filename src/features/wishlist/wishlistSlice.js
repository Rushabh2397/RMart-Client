import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}v1/api/add_to_wishlist`, value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserWishlist = createAsyncThunk(
    'wishlist/getUserWishlist', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}v1/api/get_user_wishlist`)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}v1/api/remove_from_wishlist`, value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const moveToCart = createAsyncThunk(
    'wishlist/moveToCart', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND}v1/api/move_to_cart`, value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        products: [],
        error: null,
        loading: false
    },
    reducers: {
        emptyWishlist: (state, action) => {
            state.products = [];
        }
    },
    extraReducers: {
        [addToWishlist.pending]: (state, action) => {
            state.error = null;
            state.loading = true;

        },
        [addToWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products =  action.payload.data ? action.payload.data.products : [];
        },
        [addToWishlist.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getUserWishlist.pending]: (state, action) => {
            state.error = null;
            state.loading = true;
        },
        [getUserWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload.data ? action.payload.data.products : [];
        },
        [getUserWishlist.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [removeFromWishlist.pending]: (state, action) => {
            state.error = null;
            state.loading = true;
        },
        [removeFromWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload.data ? action.payload.data.products : [];
        },
        [removeFromWishlist.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [moveToCart.pending]: (state, action) => {
            state.error = null;
            state.loading = true;
        },
        [moveToCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload.data ? action.payload.data.products : [];
        },
        [moveToCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        }
    }
})

// export const products = (state) => state.product.products
export const loadingStatus = (state) => state.wishlist.loading
export const { emptyWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer