const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')

module.exports = {
    plugins: [
        autoprefixer(),
        px2rem({
            remUnit: 46.875 // 640 => 40
        })
    ]
}
