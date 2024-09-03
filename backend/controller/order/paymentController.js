const stripe = require('../../config/stripe')

const paymentController = async(request,response)=> {
    try{
        const { cartItems } = request.body

        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                // {
                //     shipping_rate : 
                // }
            ]

        }

        const session = await stripe.checkout.sessions.create(params)

        response.status(303).json(session)
    }catch(error){
        response.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}