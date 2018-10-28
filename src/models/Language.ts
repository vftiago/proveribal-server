import { model, Schema } from "mongoose";

const languageSchema = new Schema({
    label: {
        type: String,
        required: true
    }
});

export default model("languages", languageSchema);
