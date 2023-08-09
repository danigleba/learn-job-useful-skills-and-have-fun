// pages/verify.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Rouge_Script } from 'next/font/google'

export default function Verify() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleVerify = async () => {
    const url = "/api/auth/checkCostumer?email="+email
    const response = await fetch(url)
        const data = await response.json()

      if (data.isStripeCustomer) {
        router.push("/")
      } else {
        router.push("/login")
      }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  )
}
