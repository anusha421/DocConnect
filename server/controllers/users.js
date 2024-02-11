import UserModel from "../models/userModel.js";
import PostMessage from "../models/postModel.js";

export const getUser = async (req, res) => {
    const { username } = req.params;
    console.log(username);
    
    try {
        const user = await UserModel.find({ username: username });
        return res.status(200).json(user);
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    const { username, post_id } = req.params;
    
    try {
        const user = await PostMessage.find({"username": username, '_id': post_id});
        return res.status(200).json(user);
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const editUserProfile = async (req, res) => {
    
}

export const deleteUserProfile = async (req, res) => {

}