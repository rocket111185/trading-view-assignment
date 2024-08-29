'use strict';

const sessionGuard = (req, res, next) => {
    const { sessionId } = req.cookies;

    if (!sessionId) {
        res.status(400);
        return res.json({
            error: true,
            message: 'The session was not registered. Please, try again'
        });
    }

    next();
};

module.exports = sessionGuard;
