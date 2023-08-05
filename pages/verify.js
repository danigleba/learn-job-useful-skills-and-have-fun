// pages/verify.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Rouge_Script } from 'next/font/google'

export default function Verify() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState()
  const router = useRouter()

  const handleVerify = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data)
      if (data.subscribed == true) {
        router.push("/")
      } else {
        router.push("/login")
      }
    } catch (error) {
      console.error('Error checking email:', error);
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
