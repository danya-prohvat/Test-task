import React, {useEffect} from 'react';
import styles from "./Tickers.module.css";
import classNames from 'classnames';
import Ticker from "../Ticker/Ticker";
import {useDispatch, useSelector} from "react-redux";
import {setUnWatchingTicker, requestTickers} from "../../store/ticker-reducer";

const Tickers = () => {
    const {tickers, unWatchingGroup} = useSelector(state => state.tickerReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestTickers())
    }, [])

    const tickerOnClick = (event) => {
        dispatch(setUnWatchingTicker(event.currentTarget.id))
    }

    return (<div className={classNames(styles.tickers)}>
            {tickers.map(ticker => <Ticker key={ticker.ticker} ticker={ticker.ticker} price={ticker.price}
                                           change_percent={ticker.change_percent} change={ticker.change}
                                           unWatchingMode={unWatchingGroup.some(unWatchTicker => unWatchTicker === ticker.ticker)}
                                           tickerOnClick={tickerOnClick}/>)}
        </div>
    );
}

export default Tickers;