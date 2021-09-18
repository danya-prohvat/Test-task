import React, {useEffect, useRef, useState} from 'react';
import styles from "./Ticker.module.css";
import classNames from 'classnames';
import arrowDown from "../../assets/images/arrowDown.svg"
import arrowTop from "../../assets/images/arrowTop.svg"

const Ticker = (props) => {
    const {ticker, price, change, change_percent, unWatchingMode, tickerOnClick} = props;
    const [animationClass, setAnimationClass] = useState([classNames(styles.imgShowUpFromTop), classNames(styles.imgShowUpFromBottom), classNames(styles.spanShowUpFromTop)])
    const prevProps = useRef(props);

    useEffect(() => {
        setTimeout(() => {
            setAnimationClass([])
        }, 1000)
    }, [])

    useEffect(() => {
        if (prevProps.current.price !== props.price) {
            setAnimationClass([classNames(styles.imgShowUpFromTop), classNames(styles.imgShowUpFromBottom), classNames(styles.spanShowUpFromTop)])
            setTimeout(() => {
                setAnimationClass([])
            }, 1000)
        }
        return () => (prevProps.current = props)
    }, [props])


    return (<div id={ticker} onClick={tickerOnClick} className={classNames(styles.ticker, {[styles.tickerDisables]: unWatchingMode})}>
        <div className={classNames(styles.ticker__img)}>
            {change_percent > 0 ? <img className={animationClass[1]} src={arrowTop} alt=""/> :
                <img className={animationClass[0]} src={arrowDown} alt=""/>}
        </div>
        <div className={classNames(styles.ticker__description)}>
            <div className={classNames(styles.description__topLine)}>
                <span className={classNames(styles.description__ticker)}>{ticker}</span>
                <span
                    className={classNames(styles.description__changePercent, change_percent > 0 ? styles.positiveValue : styles.negativeValue) + ' ' + animationClass[2]}>
                    {change_percent > 0 ? '+' + change_percent : change_percent}%
                </span>
            </div>
            <div className={classNames(styles.description__bottomLine)}>
                <span className={classNames(styles.description__price) + ' ' + animationClass[2]}>{price}</span>
                <span
                    className={classNames(styles.description__change, change > 0 ? styles.positiveValue : styles.negativeValue) + ' ' + animationClass[2]}>
                    {change > 0 ? '+' + change : change}
                </span>
            </div>
        </div>
    </div>);
}

export default Ticker;