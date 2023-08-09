import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    const email = req.query.email;
    try {
      const customers = await stripe.customers.list({ email });
      
      if (customers.data.length > 0) {
        res.status(200).json({ isStripeCustomer: true });
      } else {
        res.status(200).json({ isStripeCustomer: false });
      }
    } catch (error) {
      console.error('Error querying Stripe:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

