import jwt from 'jsonwebtoken'

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token; // cookies me se token nikalenge 
        if(!token) {
            return res.status(404).json({
                message : "user Not Found",
                success : false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY); // apne secret key se match krenge ki ye apni website ka token hai ya nhi
        if(!decode) {
            return res.status(404).json({
                message : "Invalid Token",
                success : false
            })
        }
        req.id = decode.userId;  // agar shi token usa to usme se user id nikal lenge
        next(); // sab shi hai to next middleware pe bhej denge
    } catch (error) {
        console.log("authentication error", error);
    }
}

export default isAuthenticated;