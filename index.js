const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faqRouter } = require('./routes/faq');
const { redisClient } = require('./utils/redis');

dotenv.config();


const app = express();

app.use(express.json());

app.use("/api/faqs", faqRouter);

async function main() {
    app.listen(3000, (req, res)=> {
        console.log("Server started on port 3000");
    })
    await mongoose.connect(process.env.MONGO_URL);
    await redisClient.connect()
}

main();