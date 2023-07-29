/** @type {import('next').NextConfig} */

/*
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}*/

//module.exports = nextConfig


const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({

  // next.js config
  //nextConfig
  
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  
})
