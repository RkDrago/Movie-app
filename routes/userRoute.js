import express from 'express';
import { connectToDatabase } from '../lib/mongodb.js';
import User from '../models/User.js';
import { generateToken, jwtAuthMiddleware } from '../jwt.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// // POST create a user
// router.post("/signup", async (req, res) => {
//   try {
//     await connectToDatabase();
//     const data = req.body;
//     const newUser = new User(data);
//     const response = await newUser.save();
//     console.log("data saved")
    
//     const payload = {
//       id: response.id
//     }
    
//     const token = generateToken(payload)
//     console.log("token is : ", token)
    
//     res.status(201).json({ response: response, token: token });
    
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    await connectToDatabase();
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" })
    }
    //generate Token
    const payload = {
      role: user.role,
      id: user.id
    }

    const token = generateToken(payload)
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//profile route
router.get('/dashboard', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user
      const userId = userData.id
      const user = await User.findById(userId)
      res.status(200).json({user})

  }catch(error){
      console.error(error)
      res.status(500).json({error: "Internal server error"})
  }
})

// put method
router.put('/change-password', jwtAuthMiddleware, async (req, res) => {
  try {
      const userId = req.user.id //extract the id from the token
      const {currentPassword, newPassword} = req.body //extract the current and new password from requrest body
      
      //Find the user by userId
      const user = await User.findById(userId);

      // if password does not match, return error
      if(!(await user.comparePassword(currentPassword))){
          return res.status(401).json({error: 'current password did not matched !'});
      }
      //Update the user's password
      user.password = newPassword;
      await user.save();

      console.log("Password updated!")
      res.status(200).json({message: "Password updated"})
  } catch (err) {
      console.log(err)
      res.status(500).json("Internal server Error!")
  }
})


export default router;
