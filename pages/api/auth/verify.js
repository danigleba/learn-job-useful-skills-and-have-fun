import { stripePromise } from '@/stripe/index'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
   const { email } = req.body;

  try {

    const customers = await stripe.customers.list({email})

    if (customers.data.length > 0) {
      return res.status(200).json({ subscribed: true });
    } else {
      return res.status(200).json({ subscribed: false });
    }
  } catch (error) {
    console.error('Error checking customer:', error);
    return res.status(500).json({ error: 'An error occurred while checking customer' });
  }
}
