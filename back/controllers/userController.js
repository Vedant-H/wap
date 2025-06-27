import User from "../models/User.js";
const getUser = async (req , res)=>{

    const id = req.params.id;
    const result = await User.findOne({"_id":id});

    res.send(result);

}

export default  getUser;
