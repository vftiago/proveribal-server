import { model, Schema } from "mongoose";

const languageSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

export default model("language", languageSchema);
