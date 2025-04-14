import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Use hashing for security
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;

    //hash the password only if the password has been changed or the user is new
    if (!user.isModified('password')) return next();
    try {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    } catch (error) {
        return false;
    }
}

// 🚨 Pre-save Hook to ensure only ONE admin exists
userSchema.pre('save', async function (next) {
    const User = mongoose.model('User', userSchema);
  
    // If current user is not being saved as admin, proceed
    if (this.role !== 'admin') {
      return next();
    }
  
    // Check if another admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
  
    // If there's already an admin and this is a new document OR this document is being changed from non-admin to admin
    if (existingAdmin && (this.isNew || this.role !== this._originalRole)) {
      const isSameUser = this._id?.equals(existingAdmin._id);
  
      // Allow if updating the same existing admin user
      if (!isSameUser) {
        return next(new Error('Only one admin user is allowed.'));
      }
    }
  
    next();
  });

const User = mongoose.model("User", userSchema);
export default User;