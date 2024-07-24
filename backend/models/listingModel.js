

import mongoose from "mongoose"

const listingSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
     },
     description:{                                          
        type:String,
        required:true,
    }, address:{
        type:String,
        required:true,
    },
    regularPrice:{
        type:String,
        required:true
     },
     discountedPrice:{
        type:String,
        required:true
     },
     bathrooms:{
        type:Number,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true
     },
     parking:{
        type:Boolean,
        required:true
     },
     type:{
        type:String,
        required:true
     },offer:{
        type:Boolean,
        required:true
     },
     imageURLs:{
        type:Array,
        required:true
     },
     userRef:{
        type:String,
        required:true
     }


},{
    timestamps:true
})

const Listing=mongoose.model('Listing',listingSchema)

export default Listing