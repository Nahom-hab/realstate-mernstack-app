import Listing from "../models/listingModel.js"


export const createListing=async (req,res,next)=>{
    try {
        const listing=await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing= async (req,res,next) => {

    try {
      const listing = await Listing.findById(req.params.id);
      if(!listing){
        return next(errorHandeler(404, 'listing  not found'));
      }
      else{
          if(req.user.id===listing.userRef){
            try {
              const delListing = await Listing.findByIdAndDelete(req.params.id);
              res.status(200).json('listing deleted succsusfully')
            } catch (error) {
              next(error);
            }
          }  
      }
    } catch (error) {
      next(error);
    }
}



export const editListing= async (req,res,next) => {

    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandeler(404, 'listing  not found'));
        }
        else{
            if(req.user.id===listing.userRef){
                try {
                    const updatedListng = await Listing.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                    { new: true }
                    );
                
                    if (!updatedListng) {
                    return next(errorHandeler(404, 'User not found'));
                    }else{
                    res.status(200).json(updatedListng)
                    }
                
                } catch (error) {
                next(error);
                }
            }  
        }
        } catch (error) {
        next(error);
    }
}

export const getlisting= async (req,res,next)=>{
    try {
        const listing=await Listing.findById(req.params.id)
        if(!listing){
            return  res.json('no listing found')
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}



