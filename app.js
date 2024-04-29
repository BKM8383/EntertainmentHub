const express = require("express");
const User = require("./mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
    res.send("Hello, World!");
});

app.post("/", async (req, res) => {
    const { email } = req.body;

    try {
        const check = await User.findOne({ email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const data = {
        email,
        password
    };
    console.log(data);
    try {
        const check = await User.findOne({ email });

        if (check) {
            res.json("exist");
        } else {
            const newUser = await User.create(data);
            res.json({ "msg": "success", "NewUser": newUser });
        }
    } catch (e) {
        res.json("fail");
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});