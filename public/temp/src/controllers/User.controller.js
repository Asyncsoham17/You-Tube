import {asyncandler} from "../utils/asynhandler.js";

const registerUser = asyncandler(async(req,res) => {
res.status(200).json({
    Message : "ok"
}
) 
})


export {
    registerUser,
}

