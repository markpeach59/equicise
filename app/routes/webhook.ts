async function getStripeEvent(request: Request){
    const signature = request.headers.get('Stripe-Signature');
    const payload =  await request.text();
    
    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_ENDPOINT,


    )
    return event

}

export async function action({request}:ActionFunctionArgs){
    const event = await getStripeEvent(request)

    if (event.type == 'checkout.session.completed'){
        const session = event.data.Object;
        const customer = session.customer;
        const subscription = session.subscription

        // should store in db 
        
        return new Response(null)

    }
    return new Response(null)

}