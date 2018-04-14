import { connect } from "mongoose";
import * as express from "express";
import Proverb from "./models/proverb";

const app = express();
const port = 5000;

connect("mongodb://localhost/proverbial", err => {
    if (err) throw err;
    app.emit("ready");
    console.log("Connected to Database");
});

app.get("/api/proverbs", async (req, res) => {
    const proverbs = await Proverb.find();
    res.send(proverbs);
});

app.on("ready", function() {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
