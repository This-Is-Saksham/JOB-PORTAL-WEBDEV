import mongoose from "mongoose";

// recruiter lo btana hoga ki kis company ke liye job post kr rhe hai isliye company ki details ke liye ye company ka schema
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String
    }, // URL to company logo
    userId:{ // kis recruiter ne company register ki hai uski id save krenge track ke liye
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, { timestamps: true });
export const Company = mongoose.model("Company", companySchema);