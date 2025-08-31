import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  userName: {
    type: String,
    required: function () {
      return !this.googleId && !this.twitterId;
    },
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.twitterId;
    }
  },
  role: {
    type:String,
    enum: ['user','doctor','seller','organizer'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false 
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  twitterId: {
    type: String,
    unique: true,
    sparse: true
  },
  wellbeingScore: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});


export const UserModel =  mongoose.models.User || mongoose.model('User', userSchema);
