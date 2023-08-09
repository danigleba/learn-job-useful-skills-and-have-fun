import Stripe from 'stripe'
import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const secret = process.env.FIREBASE_KEY;

export default async function handler(req, res) {
  const token = parse(req.headers.cookie).kualifyApp
  if (token) {
    const decoded = verify(token, secret)
    const email = decoded.email

    try {
      const customer = await stripe.customers.list({
        email: email,
        limit: 1,
      })
  
      if (customer.data.length === 0) {
        return res.status(200).json({ subscribed: false })
      }
  
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.data[0].id,
      })
  
      const isSubscribed = subscriptions.data.length > 0
      
      return res.status(200).json({ subscribed: isSubscribed })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'An error occurred' })
    }
  } else {
      return res.status(401).json({ message: "Cookie not found." })

  }
  
}
  