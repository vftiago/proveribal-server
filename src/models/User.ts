import { model, Schema } from "mongoose";

const userSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    imageURL: String
});

export default model("users", userSchema);
