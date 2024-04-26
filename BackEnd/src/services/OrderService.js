const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {
            statusOrder,
            paymentMethod,
            userId,
            productId
        } = newOrder
        try {
            const orderNew = await Order.create({
                statusOrder,
                paymentMethod,
                userId,
                productId
            })

            if (orderNew) {
                resolve({
                    status: 'OK',
                    message: 'Create order success',
                    data: orderNew
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrder,
}