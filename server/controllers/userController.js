const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtKey, {expiresIn: "3d"});
}

const register = async (req, res)=> {
    try {
        const {name, email, password} = req.body
        let user = await userModel.findOne({email});
        if (user) 
            return res.status(400).json("Email already existed...");
        
        if (!name || !email || !password) 
            return res.status(400).json("All fields are required...");
        
        if (!validator.isEmail(email)) 
            return res.status(400).json("Email must be valid...");    

        // if (!validator.isStrongPassword(password)) 
        //     return res.status(400).json("Password must be strong password...");    

        user = new userModel({name, email, password});

        const hashPass = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, hashPass);

        await user.save();

        const token = createToken(user._id);

        return res.status(200).json({_id: user._id, name, email, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Internal Error");
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await userModel.findOne({email});
        if (!user) return res.status(400).json("Invalid email or password...");

        const isValidPassWord = await bcrypt.compare(password, user.password);
        if (!isValidPassWord) return res.status(400).json("Wrong password...");
        
        const token = createToken(user._id);
        return res.status(200).json({_id: user._id, name: user.name, email, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Internal Error");   
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Internal Error");   
    }
}
module.exports = {
    register,
    login,
    findUser
};