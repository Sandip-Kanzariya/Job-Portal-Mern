const mongoose =  require('mongoose');
const bcrypt  =   require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String, // Assuming 'status' is a string
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);


// Encrypt password using bcrypt
// userSchema.pre('save', async function (){
  
//     const salt = await bcrypt.genSalt(10);
//     this.password =  await bcrypt.hash(this.password, salt);

// });

// Login Check : 
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
