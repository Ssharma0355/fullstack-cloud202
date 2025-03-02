module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/basic-config",
        permanent: true, // Set to false for development testing
      },
    ];
  },
};
