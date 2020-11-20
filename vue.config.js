module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ub-pub/' : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}