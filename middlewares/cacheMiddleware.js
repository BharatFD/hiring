const { redisClient } = require("../utils/redis");

function cacheMiddleware(key) {
    return async (req, res, next) => {
        const lang = req.query.lang || 'en';
        const cachedKey = `${key}:${lang}`;

        try {
            const data = await redisClient.get(cachedKey);
            if (data) {
                console.log("got data from redis");
                res.status(200).json({
                    data: JSON.parse(data),
                })
                return
            }
            next();
        } catch (e) {
            res.status(500).json({
                message: "Caching error"
            });
            next();

        }
    }
}

module.exports = {
    cacheMiddleware
}