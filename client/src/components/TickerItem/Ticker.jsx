import React from 'react';
import styles from "./Ticker.module.css";
import classNames from 'classnames';
import arrowDown from "../../assets/images/arrowDown.svg"
import arrowTop from "../../assets/images/arrowTop.svg"

const Ticker = ({ticker, price, change, change_percent}) => {

    return (<div className={classNames(styles.tickerItem)}>
        <div className={classNames(styles.tickerItem__img, change_percent > 0 ? styles.tickerItem__img_positive : styles.tickerItem__img_negative)}>
            <img src={change_percent > 0 ? arrowTop : arrowDown} alt=""/>
        </div>
        <div className={classNames(styles.tickerItem__description)}>
            <div className={classNames(styles.description__topLine)}>
                <span className={classNames(styles.description__ticker)}>{ticker}</span>
                <span
                    className={classNames(styles.description__changePercent, change_percent > 0 ? styles.positiveValue : styles.negativeValue)}>
                    {change_percent > 0 ? '+' + change_percent : change_percent}%
                </span>
            </div>
            <div className={classNames(styles.description__bottomLine)}>
                <span className={classNames(styles.description__price)}>{price}</span>
                <span
                    className={classNames(styles.description__change, change > 0 ? styles.positiveValue : styles.negativeValue)}>
                    {change > 0 ? '+' + change : change}
                </span>
            </div>
        </div>
    </div>);
}

export default Ticker;