const { Query } = require('mongoose');
const {User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
//resolvers
const resolvers = {
    Query:{
        me:async(parent,args,context)=>{
            if(context.user){
                return User.findOne({_id:context.user._id}).populate('books')
            } 
            throw AuthenticationError;
        }
    },
    Mutation:{
        addUser:async()=>{
            let newUser = await User.create({username,email,password});
            let token = signToken(newUser);
            return {newUser, token}
        },
        login:async()=>{
            let userEmail = await User.findOne({email});
            let userPwd = await User.isCorrectPassword({password});
        if(userEmail !== true){
            throw AuthenticationError('either email or password are incorrect, please try again');
        }
        if(userPwd !== true){
            throw AuthenticationError('either email or password are incorrect, please try again');
        }
        const token = signToken(user);
        return{userEmail, token};
        },
        saveBook:async(parent,{BookAdded},context)=>{
            if(context.user === true){
                let userBook = await User.findByIdAndUpdate({_id:context.user._id},{$push:{savedBooks:BookAdded}},{new:true});
                return userBook;
            }else{
            throw AuthenticationError;
            }
        },
        removeBook:async(parent,{bookId},context)=>{
            if(context.user === true){
                let removeBook = await User.findByIdAndUpdate({_id:context.user._id},{$pull:{savedBooks:bookId}},{new:true});
                return removeBook;
            } else{
                throw AuthenticationError;
            }
        }
    }
}
module.exports = resolvers;