const { Query } = require('mongoose');
const {User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
//resolvers
const resolvers = {
    Query:{
        users: async()=>{
            return await User.find().populate('books')
        },
        user: async(parent,{username})=>{
            return User.findOne({username}).populate('book')
        },
        books:async(parent,{username})=>{
           const params = username?{username}:{} 
           return User.find(params).sort({savedBooks})
        },
        book:async(parent,{username})=>{

        },
        me:async(parent,args,context)=>{
            if(context.user){
                
            }
        }
    },
    Mutation:{
        login:async()=>{

        },
        addUser:async()=>{

        },
        saveBook:async()=>{

        },
        removeBook:async()=>{

        }
    }
}
module.exports = resolvers;