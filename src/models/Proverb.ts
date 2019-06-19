import { model, Schema } from "mongoose";

const proverbSchema = new Schema({
  lang: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  color: String
});

export default model("proverbs", proverbSchema);
