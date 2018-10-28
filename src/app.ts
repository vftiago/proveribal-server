import { config } from "dotenv";
import { connect } from "mongoose";
import * as express from "express";
import * as cors from "cors";
import auth from "./routes/auth";
import proverbs from "./routes/proverbs";

config(); // retrieve .env file

const env = process.env;

// mongoose connect
const mongoURI = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${
    env.DB_PORT
}/${env.DB_NAME}`;

connect(
    mongoURI,
    err => {
        if (err) throw err;
        app.emit("ready");
        console.log(
            `Connected to Database at ${new Date().getHours()}:${new Date().getMinutes()}`
        );
    }
);

// express app
const app = express();

// app middleware
app.use(
    cors({
        origin: env.ORIGIN.toString()
    })
);

app.use(express.json());

// app routes
app.use("/api/auth", auth);

app.use("/api/proverbs", proverbs);

// app ready
app.on("ready", () =>
    app.listen(env.PORT, () => console.log(`Listening on port ${env.PORT}`))
);
