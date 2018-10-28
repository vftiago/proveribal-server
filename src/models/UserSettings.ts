import { model, Schema } from "mongoose";

const userSettingsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    selectedLanguageId: {
        type: String,
        required: true
    }
});

export default model("userSettings", userSettingsSchema);
