import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const proverbSchema = new Schema({
    lang: String,
    text: String
});

export default mongoose.model("proverbs", proverbSchema);
