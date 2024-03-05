import express, { Request, Response} from "express";
import { check, validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user";
import { validateToken } from '../middleware/auth';

const router = express.Router();

router.post('/login', 
[check('email', 'Email is required').isEmail(),
 check('password', 'Password is required').isEmpty()], 
 async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    return res.status(400).send({ message: errors.array()})
  }

  try {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if(!user) {
      return res.status(400).json({ message: "Invalid credentials"})
   }
   const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials'})
   }

   const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d'});
   res.cookie('auth_token', token, { httpOnly: true, secure: true, maxAge: 86400000, sameSite: 'none'});
   res.status(200).json({ userId: user._id});
  } catch (error) {
   console.log("error")
   res.status(500).json({ message: 'something went wrong'})   
  }
 }
);


router.get('/validate-token', [validateToken], (req: Request, res: Response) => {
  return res.status(200).send({ userId: req.userId})  
})

router.get('/logout', (req, res) => {
  res.cookie('auth_token', "", {
    expires: new Date(0)
  });
  res.send();
})

export default router;