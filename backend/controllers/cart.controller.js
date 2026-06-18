import userModel from "../models/userModel.js"

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, size } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: "Added to Cart" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, size, quantity } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: "Cart Updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.status(200).json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const addToWishList = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        let wishList = userData.wishList || {};

        wishList[itemId] = true;

        await userModel.findByIdAndUpdate(userId, { wishList });

        res.status(200).json({
            success: true,
            message: "Added to wishlist",
            wishList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFromWishList = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        let wishList = userData.wishList || {};

        delete wishList[itemId];

        await userModel.findByIdAndUpdate(userId, { wishList });

        res.status(200).json({
            success: true,
            message: "Removed from wishlist",
            wishList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getWishList = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId);
        let wishList = userData.wishList || {};
        res.status(200).json({ success: true, wishList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};