import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
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
    imageURL: String,
    settings: {
      selectedLanguages: [
        {
          type: Schema.Types.ObjectId,
          ref: "language"
        }
      ]
    }
  },
  { _id: false }
);

export default model("users", userSchema);
