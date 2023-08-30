import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    const email = req.query.email

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
}
  