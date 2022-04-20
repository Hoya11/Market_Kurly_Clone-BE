const express = require('express');
const app = express();
const port = 3000; 
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const reviewRouter = require("./routes/review")
const cartRouter = require("./routes/cart")
const cors = require('cors')
const { User, Review } = require("./models")

User.hasMany(Review);
Review.belongsTo(User);


app.use(cors())
app.use(express.json());
app.use("/api", [userRouter, productRouter, reviewRouter, cartRouter]);



app.listen(port, () => {
    console.log(port, "서버가 연결되었습니다.")
})


