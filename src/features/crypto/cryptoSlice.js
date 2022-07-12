import { createSlice } from "@reduxjs/toolkit";



export const initialState = {
    loading: false,
    hasErrors: false,
    coins: []
}
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_COINGECKO_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_COINGECKO_RAPIDAPI_HOST
    }
};

// Asynchronous thunk action
export const fetchCoins = () => {
    return async dispatch => {
        dispatch(getCoins())

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc`, options)
            const data = await response.json()

            dispatch(getCoinsSuccess(data))
        } catch (error) {
            dispatch(getCoinsFailure())
        }
    }
}

const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        getCoins: state => {
            state.loading = true
        },
        getCoinsSuccess: (state, { payload }) => {
            state.coins = payload
            state.loading = false
            state.hasErrors = false
        },
        getCoinsFailure: state => {
            state.loading = false
            state.hasErrors = true
        }
    }
})

// Export actions
export const { getCoins, getCoinsSuccess, getCoinsFailure } = coinsSlice.actions

// selector 
export const coinsSelector = state => state.coins

export default coinsSlice.reducer