import Tickers from "./Tickers";
import {create} from "react-test-renderer";
import React from "react";
import {Provider} from "react-redux";
import store from "../../store/store";
import {render} from "@testing-library/react";

test('component should be render', () => {
    render(<Provider store={store}><Tickers/></Provider>);

});