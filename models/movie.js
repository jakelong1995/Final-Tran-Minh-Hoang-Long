import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  time: {
    type: String,
  },
  year: {
    type: String,
  },
  image: {
    type: String,
  },
  introduce: {
    type: String,
  },
});

const Movie = mongoose.models.movies || mongoose.model("movies", profileSchema);

export default Movie;
