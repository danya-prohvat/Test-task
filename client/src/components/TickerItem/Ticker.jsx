import React, {useEffect, useState} from 'react';
import styles from "./Ticker.module.css";
import classNames from 'classnames';
import arrowDown from "../../assets/images/arrowDown.svg"
import arrowTop from "../../assets/images/arrowTop.svg"

const Ticker = (props) => {
    const {ticker, price, change, change_percent} = props;
    const [animationClass, setAnimationClass] = useState([classNames(styles.imgShowUpFromTop), classNames(styles.imgShowUpFromBottom), classNames(styles.spanShowUpFromTop)])

    useEffect(() => {
        setAnimationClass([classNames(styles.imgShowUpFromTop), classNames(styles.imgShowUpFromBottom), classNames(styles.spanShowUpFromTop)])
        setTimeout(() => {
            setAnimationClass(['', '', ''])
        }, 1000)
    }, [props])


    return (<div className={classNames(styles.tickerItem)}>
        <div
            className={classNames(styles.tickerItem__img, change_percent > 0 ? styles.tickerItem__img_positive : styles.tickerItem__img_negative)}>
            {change_percent > 0 ? <img className={animationClass[1]} src={arrowTop} alt=""/> :
                <img className={animationClass[0]} src={arrowDown} alt=""/>}
        </div>
        <div className={classNames(styles.tickerItem__description)}>
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