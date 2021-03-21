import React from 'react';
import {render, screen} from '@testing-library/react';
import {App} from '../components/main/App';
import {Provider} from "react-redux";
import store from "../store";
import {BrowserRouter} from "react-router-dom";
import {enableFetchMocks} from 'jest-fetch-mock'
import fetchMock from "jest-fetch-mock"

enableFetchMocks();

describe("App component", () => {
    fetchMock.mockIf(/^https?:\/\/.*$/i, async req => {
        if (req.url.endsWith("/todos/")) {
            return "[{\n" +
                "        \"id\": \"1\",\n" +
                "        \"createdAt\": \"2021-03-07T12:29:07.934Z\",\n" +
                "        \"todo\": \"Sharable even-keeled middleware\",\n" +
                "        \"percent\": 68,\n" +
                "        \"isDone\": false,\n" +
                "        \"description\": \"Use the online RAM capacitor, then you can program the bluetooth application!\"\n" +
                "    }]"
        } else if (req.url.endsWith("/path2")) {
            return {
                body: "another response body",
                headers: {
                    "X-Some-Response-Header": "Some header value"
                }
            }
        } else {
            return {
                status: 404,
                body: "Not Found"
            }
        }
    })

    test("should render TODO App in header", () => {
        render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>);
        screen.getByText(/TODO App/i);
    });

    test("should render TODO name", () => {
        render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>);
        screen.getByText(/Sharable even-keeled middleware/i);
    });

    test("should render TODO percent", () => {
        render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>);
        screen.getByText(/68/i);
    });
});