import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const { id_course } = router.query

    function goIndex() {
        router.push("/")
    }
  return (
    <>
      <Head>
        
          <title>Kualify App</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Kualify App" />
          <link rel="icon" href="/path/to/favicon.ico" />

          <link rel="canonical" href="https://app.kualify.es/" />

          <meta property="og:title" content="Kualify App" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
          
      </Head>

      <main className={`${inter.className}`}>
       <h1>Congrats, you finished the course</h1>
       <button className='bg-blue-400' onClick={goIndex}>Go to feed</button>
      </main>
      
    </>
  )
}
