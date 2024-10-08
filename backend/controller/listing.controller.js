import Listing from "../models/listingModel.js"


export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {

    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandeler(404, 'listing  not found'));
        }
        else {
            if (req.user.id === listing.userRef) {
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



export const editListing = async (req, res, next) => {

    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandeler(404, 'listing  not found'));
        }
        else {
            if (req.user.id === listing.userRef) {
                try {
                    const updatedListng = await Listing.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        { new: true }
                    );

                    if (!updatedListng) {
                        return next(errorHandeler(404, 'User not found'));
                    } else {
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

export const getlisting = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return res.json('no listing found')
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}
export const searchListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        let furnished = req.query.furnished;
        let parking = req.query.parking;
        let type = req.query.type;

        if (offer === undefined) {
            offer = { $in: [false, true] };
        } if (offer === 'true') {
            offer = true;
        }
        if (offer === 'false') {
            offer = false
        }

        if (furnished === undefined) {
            furnished = { $in: [false, true] };
        } if (furnished === 'true') {
            furnished = true;
        }
        if (furnished === 'false') {
            furnished = false
        }


        if (parking === undefined) {
            parking = { $in: [false, true] };
        } if (parking === 'true') {
            parking = true;
        }
        if (parking === 'false') {
            parking = false
        }

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt'; // Field to sort by
        const order = req.query.order || 'desc';     // Sort direction

        // Construct sort object
        const sortObject = {};
        sortObject[sort] = order === 'desc' ? -1 : 1;


        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
            .sort(sortObject)
            .limit(limit)
            .skip(startIndex);

        res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
