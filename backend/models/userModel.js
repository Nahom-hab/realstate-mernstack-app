import mongoose from "mongoose"

const useSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }, email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"default"
    }
},{
    timestamps:true
})

const User=mongoose.model('User',useSchema)

export default User