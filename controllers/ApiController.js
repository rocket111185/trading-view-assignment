'use strict';

const User = require('../models/user');

const recordUserFavourite = async (req, res) => {
    const { sessionId } = req.cookies;

    try {
        const existingUser = await User.findOne({ userId: sessionId });
        const { symbol } = req.body;

        if (existingUser) {
            await existingUser.updateOne({
                $push: {
                    favouriteSymbols: symbol
                }
            }).exec();
        } else {
            const user = new User({ userId: sessionId, favouriteSymbols: [symbol] });
            await user.save();
        }
    } catch (error) {
        console.error(error);
        res.status(500);
        return res.json({
            error: true,
            message: 'The server could not process the request correctly. Please, try again later'
        });
    }

    res.json({
        success: true,
        message: 'The symbol was added'
    });
};

const removeUserFavourite = async (req, res) => {
    const { sessionId } = req.cookies;

    const existingUser = await User.findOne({ userId: sessionId });

    if (!existingUser) {
        res.status(404);
        return res.json({
            error: true,
            message: 'The user does not exist'
        });
    }

    const { symbol } = req.body;

    try {
        await existingUser.updateOne({
            $pull: {
                favouriteSymbols: symbol
            }
        }).exec();
    } catch (error) {
        console.error(error);
        res.status(500);
        return res.json({
            error: true,
            message: 'The server could not process the request correctly. Please, try again later'
        });
    }

    res.json({
        success: true,
        message: 'The symbol was removed'
    });
}

module.exports = {
    recordUserFavourite,
    removeUserFavourite
};
