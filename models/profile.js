import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    skills: [
        {
            type: String,
        }
    ],
    hobbies: [
        {   
            type: String,
        }
    ],
    targets: [
        {   
            type: String,
        }
    ]
})

const Profile = mongoose.models.profiles || mongoose.model("profiles", profileSchema);

export default Profile;