/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // opcional: você pode restringir pathname se quiser
        // pathname: "/dclp9qfhg/**"
      },
    ],
  },
};

export default nextConfig;
