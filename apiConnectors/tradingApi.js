'use strict';

// Initialize environmental variables
require('dotenv').config();

const API_URL = process.env.TRADING_API_URL;

const getTradingInfo = async () => {
    const requestUrl = `${API_URL}/ticker/price`;

    const response = await fetch(requestUrl);
    const responseBody = await response.json();

    const result = [];

    for (const symbolInfo of responseBody) {
        const {price, ...rest} = symbolInfo;
        const numberPrice = parseFloat(price);

        if (!Number.isNaN(numberPrice)) {
            const currentRecord = {price: numberPrice, ...rest};
            result.push(currentRecord);
        }
    }

    return result;
};

module.exports = {
    getTradingInfo,
};
