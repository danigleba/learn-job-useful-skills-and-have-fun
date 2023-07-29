import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/kualify-icon.png" />
      </Head>
      <body className='bg-[#F4F4F5]'>
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
// <link rel="manifest" href="/manifest.json" />
