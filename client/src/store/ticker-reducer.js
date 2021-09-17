import * as io from "socket.io-client";

const SET_TICKERS = 'SET-TICKERS';


let initialState = {
    tickers: []
};

const tickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKERS: {
            return {
                ...state,
                tickers:action.tickers
            };
        }
        default:
            return state;
    }
}

export const setTickers = (tickers) => ({type: SET_TICKERS, tickers});

export const subscribeToTickerListener = () => async (dispatch) => {
    const socket = io.connect('http://localhost:4000');
    // socket.emit('start');
    socket.on('ticker', response => {
        dispatch(setTickers(response))
    });
}

export default tickerReducer;