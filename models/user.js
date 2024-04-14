import mongoose from'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
    },
    birthday: {
        type: String,
    },
    hometown: {
        type: String,
    },
    nation: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
