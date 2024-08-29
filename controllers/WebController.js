'use strict';

const User = require('../models/user');
const crypto = require('node:crypto');

const tradingApi = require('../apiConnectors/tradingApi');
const utils = require('../utils');

const mainPage = async (req, res) => {
    const {sessionId} = req.cookies;

    if (!sessionId) {
        const newSessionId = crypto.randomUUID();
        res.cookie('sessionId', newSessionId, {
            httpOnly: true
        });
    }

    const user = await User.findOne({userId: sessionId});

    const rawTradingInfo = await tradingApi.getTradingInfo();
    const formattedTradingInfo = utils.formatTradingInfo(rawTradingInfo);

    const {favourites, tradingInfo} = utils.groupByCriteria(
        formattedTradingInfo,
        (element) => (user.favouriteSymbols.includes(element.symbol)) ? 'favourites' : 'tradingInfo'
    );

    res.render('home', {
        favourites,
        tradingInfo,
    });
};

module.exports = {
    mainPage
};
