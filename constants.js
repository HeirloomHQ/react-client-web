module.exports = {
  API_HOST:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_API_HOST
      : process.env.DEV_API_HOST,
};
