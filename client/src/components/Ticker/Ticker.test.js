import {create} from "react-test-renderer";
import React from "react";
import {render} from "@testing-library/react";
import Ticker from "./Ticker";

test('component should be render', () => {
    render(<Ticker/>);

});