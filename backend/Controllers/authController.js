import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = user => {
    return jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" } );
}   

export const register = async(req, res) => {
    const { name, email, password, role, photo, gender } = req.body;
    console.log(req.body,"User dtaaa")
    try{
        let user=null;
        if(role === "patient") {
            user = await User.findOne({ email });
        }
        else if(role === "doctor") {
            user = await Doctor.findOne({ email });
        }
        // check if user exists
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        if(role==='patient'){
            user=new User({
                name,
                email,
                password: hashedPassword,
                
                photo,
                gender,
                role
        });

    }
    if(role==='doctor'){
        user=new Doctor({
            name,
            email,
            password:hashedPassword,
            photo,
            gender,
            role
        })
    }

    await user.save();

    return res.status(200).json({success:true, message: "User created successfully" });
}
    catch(error) {
        console.error("Error registering user:", error);
        return res.status(500).json({success:false, message: "Something went wrong" });
    }
}
export const login = async(req, res) => {
    const {email} = req.body;

    try{
        let user=null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        // check if user exists
        if(patient) {
            user = patient;
        }
        if(doctor) {
            user = doctor;
        }
        // check if user exists
        if(!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        // check if password is correct
        if(!isPasswordMatch) {
            return res.status(400).json({status:false, message: "Invalid credentials" });
        }
        // create token
        const token = generateToken(user);


        const {password, role, appointments, ...rest} = user._doc;


        res.status(200).json({status:true,message:"Successfully login", token,data:{...rest},role});    

    }

    catch(error) {
        console.log(error);
        res.status(500).json({status:false, message: "Failed to login" });
    }
}
