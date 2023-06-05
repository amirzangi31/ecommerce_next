/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dglh3bbsp/image/upload/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/products/**"
      },

    ]
  }
}

module.exports = nextConfig
