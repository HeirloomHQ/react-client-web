const { API_HOST } = require("./constants");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_HOST}/:path*`,
      },
    ];
  },
};
