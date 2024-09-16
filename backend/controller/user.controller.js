import User from "../models/userModel.js"
import { errorHandeler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import Listing from '../models/listingModel.js'

export const userdata = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.email }); // Replace with an actual email from your database
    console.log('Valid User:', validUser);
    if (validUser) {
      const { password, ...otheruserdata } = validUser._doc
      res.json(otheruserdata);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandeler(401, 'You can only update your own account'));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandeler(404, 'User not found'));
    }

    const { password, ...rest } = updatedUser.toObject();
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandeler(401, 'You can only update your own account'));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(errorHandeler(404, 'User not found'));
    }
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    next(error);
  }
}

export const getListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandeler(401, 'You can only get your own listings'));
  }
  else {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      if (!listings) {
        return next(errorHandeler(404, 'Listing not found'));
      }
      res.status(200).json(listings);

    } catch (error) {
      next(error);
    }
  }

}
