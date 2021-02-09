module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.REST_API_HOST}/:path*`,
      },
    ];
  },
};
