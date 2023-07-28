import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <>

    <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-KEX3WW33WC"
        strategy="afterInteractive"
    />

    <Script id="google-analytics" strategy="afterInteractive" 
        dangerouslySetInnerHTML={{__html:
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-KEX3WW33WC');
            `
        }}
    />

    <Script
        dangerouslySetInnerHTML={{__html:
            `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "i69056j6s8");
            `
        }}

    />
    <Component {...pageProps} />
    
  </>
  )
}
