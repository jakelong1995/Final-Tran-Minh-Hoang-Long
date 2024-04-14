import mongoose from "mongoose";
import User from "../models/user.js";
import Profile from "../models/profile.js";

export const getProfiles = async (req, res) => {
    try {
        
        const profiles = await Profile.find();
        return res.status(200).json({
            msg: 'Get profiles successfully!',
            data: profiles
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}

export const createProfile = async (req, res) => {
    try {
        const { userId, skills=[], hobbies=[], targets=[] } = req.body; // c1
        
        // 1. Validation
        if (!userId) {
            return res.status(400).json({
                msg: 'userId is required!'
            });
        }

        if (skills && !Array.isArray(skills)) {
            console.log(Array.isArray([]));
            return res.status(400).json({
                msg: 'Skills is not array!'
            })
        }

        if (hobbies && !Array.isArray(hobbies)) {
            return res.status(400).json({
                msg: 'Hobbies is not array!'
            })
        }

        if (targets && !Array.isArray(targets)) {
            return res.status(400).json({
                msg: 'Targets is not array!'
            })
        }
        // 2. Check if user is existed
        const user = await User.findOne({_id: userId}); // c1
        if (!user) {
            return res.status(401).json({
                msg: 'User is not found!'
            });
        }

        // 3. Create profile
        const profile = new Profile({
            userId: userId,
            skills,
            hobbies,
            targets
        });
        await profile.save();

        return res.status(201).json({
            msg: 'Create profile successfully!',
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}
/**
 * c1: check người call api có phải là người sở hửu profile cần update hay không? => check xem profile với ủeId có tồn tại hay không?
 * c2: check profile có tồn tại hay không? => check xem người call api có id giống với ủeId của profile cần update hay không?
 */
export const updateProfile = async (req, res) => {
    try {
        const { userId, skills=[], hobbies=[], targets=[] } = req.body; // c1
        const { _id: requestUserId } = req.user;
        // c2: const {profileId} = req.params; /:profileId
        
        // 0. Check owner
        console.log(requestUserId, userId);
        if (userId !== requestUserId.toString()) {
            return res.status(401).json({
                msg: 'You are not owner of this profile!'
            });
        }
        // 1. Validation
        if (!userId) {
            return res.status(400).json({
                msg: 'userId is required!'
            });
        }

        if (skills && !Array.isArray(skills)) {
            return res.status(400).json({
                msg: 'Skills is not array!'
            })
        }

        if (hobbies && !Array.isArray(hobbies)) {
            return res.status(400).json({
                msg: 'Hobbies is not array!'
            })
        }

        if (targets && !Array.isArray(targets)) {
            return res.status(400).json({
                msg: 'Targets is not array!'
            })
        }

        // 2. Check if user is existed
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                msg: 'User is not found!'
            });
        }
        const profile = await Profile.findOne({ userId }); // c1
        // c2: const profile = await Profile.findById(profileId); // c2
        if (!profile) {
            return res.status(401).json({
                msg: 'Profile is not found!'
            });
        }
        // if (profile.userId!== requestUserId) {
        // 3. Update profile, do not update userId
        profile.skills = skills;
        profile.hobbies = hobbies;
        profile.targets = targets;

        const updatedProfile = await profile.save();
        // upsert

        return res.status(200).json({
            msg: 'Update profile successfully!',
            data: updatedProfile
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const { _id: requestUserId } = req.user;
        // c2: const {profileId} = req.params; /:profileId
        
        // 0. Check owner
        if (userId !== requestUserId.toString()) {
            return res.status(401).json({
                msg: 'You are not owner of this profile!'
            });
        }
        // 1. Validation
        if (!userId) {
            return res.status(400).json({
                msg: 'userId is required!'
            });
        }
        // 2. Check if user is existed
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                msg: 'User is not found!'
            });
        }
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(401).json({
                msg: 'Profile is not found!'
            });
        }
        // 3. Delete profile
        await Profile.findOneAndDelete({ _id: profile._id }); // c1
        return res.status(200).json({
            msg: 'Delete profile successfully!'
        });
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}