import React, {useEffect} from 'react';
import styles from "./Tickers.module.css";
import classNames from 'classnames';
import Ticker from "../TickerItem/Ticker";
import {useDispatch, useSelector} from "react-redux";
import {subscribeToTickerListener} from "../../store/ticker-reducer";

const Tickers = () => {
    const {tickers} = useSelector(state => state.tickerReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeToTickerListener())
    }, [])

    return (<div className={classNames(styles.ticker)}>
            {tickers.map(ticker => <Ticker key={ticker.ticker} ticker={ticker.ticker} price={ticker.price}
                                               change_percent={ticker.change_percent} change={ticker.change}/>)}
        </div>
    );
}

export default Tickers;