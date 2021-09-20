import tickerReducer, {setUnWatchingTickerActionCreator, setTickersActionCreator} from "./ticker-reducer";


describe('SET_TICKERS', () => {
    test('new tickers should be added', () => {
        let state = {
            tickers: [],
            unWatchingGroup: []
        };
        let action = setTickersActionCreator([{ticker: 'AAPL'}, {ticker: 'GOOGL'}, {ticker: 'MSFT'}, {ticker: 'AMZN'}, {ticker: 'FB'}, {ticker: 'TSLA'}])
        let newState = tickerReducer(state, action);
        expect(newState.tickers.length).toBe(6);
    });

    test('new tickers data shouldn"t be updated', () => {
        let state = {
            tickers: [{ticker: 'AAPL', price: 3}, {ticker: 'MSFT', price: 5}, {ticker: 'AMZN', price: 10}],
            unWatchingGroup: ['MSFT']
        };
        let action = setTickersActionCreator([{ticker: 'AAPL', price: 30}, {ticker: 'MSFT', price: 50}, {ticker: 'AMZN', price: 100}])
        let newState = tickerReducer(state, action);
        expect(newState.tickers.filter(ticker => ticker === 'MSFT').price).toBe(state.tickers.filter(ticker => ticker === 'MSFT').price);
    });
});


describe('SET_UN_WATCHING_TICKER', () => {
    test('new unWatching ticker should be added', () => {
        let state = {
            tickers: [],
            unWatchingGroup: ['MSFT', 'TSLA', 'AMZN']
        };
        let action = setUnWatchingTickerActionCreator('FB')
        let newState = tickerReducer(state, action);
        expect(newState.unWatchingGroup.length).toBe(4);
        expect(newState.unWatchingGroup.some(unWatchingTicker => unWatchingTicker === 'FB')).toBeTruthy();
    });

    test('new unWatching ticker should be deleted', () => {
        let state = {
            tickers: [],
            unWatchingGroup: ['MSFT', 'TSLA', 'AMZN']
        };
        let action = setUnWatchingTickerActionCreator('TSLA')
        let newState = tickerReducer(state, action);
        expect(newState.unWatchingGroup.length).toBe(2);
        expect(newState.unWatchingGroup.filter(unWatchingTicker => unWatchingTicker === 'TSLA').length).toBe(0);
    });
});

test('should return previous state if was passed wrong action type', () => {
    let state = {
        tickers: [{ticker: 'AAPL'}, {ticker: 'MSFT'}, {ticker: 'AMZN'}],

    };
    let newState = tickerReducer(state, {type: 'some wrong action type'});
    expect(newState.tickers.length).toBe(newState.tickers.length);
    expect(newState.tickers[1].ticker).toBe(newState.tickers[1].ticker);
});