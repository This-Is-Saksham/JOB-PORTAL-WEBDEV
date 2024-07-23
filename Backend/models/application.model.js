import mongoose from "mongoose";

// ye applicants ke liye hai ki kis company me apply kiya or kisne kiya
const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    } 
}, { timestamps: true });
export const Application = mongoose.model("Application", applicationSchema);
