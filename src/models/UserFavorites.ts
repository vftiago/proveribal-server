import { model, Schema } from "mongoose";

const userFavoriteSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  proverbId: {
    type: String,
    required: true
  }
});

export default model("userFavorites", userFavoriteSchema);
