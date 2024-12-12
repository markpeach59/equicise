import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   // Use the latest API version
});

export async function createPaymentIntent(amount: number, currency: string = 'gbp') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency,
      // Add any additional options here, such as:
      payment_method_types: ['card'],
      // metadata: { order_id: '6735' }
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    throw error;
  }
}