const express = require('express');
const app = express();
const connect = require('./src/config/db');

const PORT = 4001;

app.use(express.json());

const {signup, signin} = require('./src/controllers/auth.controllers');
const userController = require('./src/controllers/user.controller');
const postController = require('./src/controllers/post.controllers')
app.post("/signup",signup);
app.post("/signin",signin);

app.use("/users",userController);

app.use("/posts",postController);

const start = async () => {
    await connect();

    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    });
}

module.exports = start;