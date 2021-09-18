import * as io from "socket.io-client";

const SET_TICKERS = 'SET-TICKERS';
const SET_UN_WATCHING_TICKER = 'SET-UN-WATCHING-TICKER';


let initialState = {
    tickers: [],
    unWatchingGroup: []
};

const tickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKERS: {
            let tickers = action.tickers;
            state.unWatchingGroup.forEach(unWatchingTicker => {
                tickers = tickers.map((ticker, ind) => {
                    if (ticker.ticker === unWatchingTicker)
                        return state.tickers[ind]
                    return ticker
                })
            })
            return {
                ...state,
                tickers: tickers
            };
        }
        case SET_UN_WATCHING_TICKER: {
            let newUnWatchingGroup = state.unWatchingGroup;
            if (newUnWatchingGroup.some(ticker => ticker === action.ticker))
                newUnWatchingGroup = newUnWatchingGroup.filter(ticker => ticker !== action.ticker)
            else newUnWatchingGroup.push(action.ticker)
            return {
                ...state,
                unWatchingGroup: newUnWatchingGroup
            };
        }
        default:
            return state;
    }
}

export const setTickers = (tickers) => ({type: SET_TICKERS, tickers});
export const setUnWatchingTicker = (ticker) => ({type: SET_UN_WATCHING_TICKER, ticker});

export const requestTickers = () => async (dispatch) => {
    const socket = io('http://localhost:4000');
    socket.on("connect", () => {
        socket.on('ticker', response => {
            dispatch(setTickers(response))
        });
    });
}

export default tickerReducer;