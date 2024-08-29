'use strict';

const ASK_PRICE_PERCENTAGE = 5;
const BID_PRICE_PERCENTAGE = 5;

// 7 digits after comma
const FLOAT_PRECISION = 7;

const formatTradingInfo = (rawTradingInfo) => {
    const result = rawTradingInfo.map(({ price, time, ...info }) => {
        const askPrice = (price * (100 + ASK_PRICE_PERCENTAGE) / 100)
            .toPrecision(FLOAT_PRECISION);

        const bidPrice = (price * (100 - BID_PRICE_PERCENTAGE) / 100)
            .toPrecision(FLOAT_PRECISION);

        const formattedTime = (new Date(time)).toISOString();

        return { askPrice, bidPrice, time: formattedTime, ...info };
    });

    result.sort((a, b) => a.symbol.localeCompare(b.symbol));

    return result;
};

const groupByCriteria = (iterable, callback) => {
    const result = iterable.reduce((context, element) => {
        const key = callback(element);

        if (!context[key]) {
            context[key] = [];
        }

        context[key].push(element);
        return context;
    }, {});

    return result;
};

module.exports = {
    formatTradingInfo,
    groupByCriteria
};
