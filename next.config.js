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
        protocol: "https",
        hostname: "matrixstore-zangiabadi.iran.liara.run",
        port: "",
        pathname: "/images/products/**"
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
