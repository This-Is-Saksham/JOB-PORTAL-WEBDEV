import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async(req, res) => {
    try{
    const {fullname, email, phoneNumber, password, role} = req.body;

    if(!fullname || !email|| !phoneNumber || !password || !role || !profile) {
        return res.status(400).json({
            message : "field is missing in register",
            success : false
        })
    }

    const user = await User.findOne(email);
    if(user) {
        return res.status(400).json({
            message : "user already exist",
            success : false
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
        fullname,
        email,
        phoneNumber,
        password : hashPassword,
        role,
        //Profile aayegi
    })

    return res.status(200).json({
        message : "Registration Successful",
        success : true
    })
} catch(error) {
    console.log("User register failed", error);
    }
}

export const login = async(req, res) => {
    try {
        const {email, password, role} = req.body;

        if(!email || !password || !role) {
            res.status(400).json({
                message : "Field is missing",
                success : false
            })
        }
        let user = await User.findOne({email})
        if(user) {
            res.status(400).json({
                message : "user not exist",
                success : false
            })
        }

        const matchPassword = bcrypt.compare(password, user.password)
        if(!matchPassword) {
            res.status(400).json({
                message : "Password is invalid",
                success : false
            })
        }

        if(role !== user.role) {
            res.status(400).json({
                message : "Check the correct role",
                success : false
            })
        }

        const tokenData = {
            userId : user._id
        }
        const token = jwt.sign(token, process.env.SECRET_KEY, {expiresIn : '1d'})

        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        res.status(200).cookie("token", token, {maxAge : 1*24*60*60*1000, httpOnly:true, sameSite : 'strict'}).json({
            message: user.fullname,
            user,
            success : true
        })
        
    } catch (error) {
        console.log("Login error", error)
    }
}

export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge : 0}).json({
            message : "Logout Successful",
            success : true
        })
    } catch (error) {
        console.log("Logout Failed", error);
    }
}

export const updateProfile = async(req, res) => {
    const {fullname, email, phoneNumber, bio, skills} = req.body;
    const file = req.file;

    if(!fullname || !email || !phoneNumber || !bio || !skills) {
        res.status(400).json({
            message : "Required field not exist",
            success : false
        })
    }

    // cloudinary

    const skillsArray = skills.split(','); // skills string me hai usko array me convert kr rhe hai
    const userId = req.id; // middleware authentication
    let user = User.findById(userId);

    if(!user) {
        res.status(400).json({
            message : "No user exist",
            success : false
        })
    }

    // updating data of user
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    user.skills = skillsArray;

    // resume section here will be implemented here

    await user.save()

    user = {
        _id : user._id,
        fullname : user.fullname,
        email : user.email,
        phoneNumber : user.phoneNumber,
        role : user.role,
        profile : user.profile
    }

    return res.status(200).json({
        message : "User updated successfully",
        uesr,
        success : true
    })

}