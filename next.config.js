// next-offline
// const withOffline = require('next-offline');
// module.exports = withOffline()

// next-pwa
const withPWA = require('next-pwa');

module.exports = withPWA({
    pwa: {
        dest: 'public'
      }
});