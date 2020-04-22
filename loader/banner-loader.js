// function loader(source){
//     const time = new Date().toLocaleString()
//     const { author = '' } = this.query || {}
//     console.log(time,author)
//     return `
//     /**
//      ** @author ${author}
//      ** @time ${time}
//      **/
//     console.log(1)
//     ${source}
// `
// }

function loader(source){
    const callback = this.async();
    const time = new Date().toLocaleString()
    const { author = '' } = this.query || {}
    const ret = `
            /**
             ** @author ${author}
             ** @time ${time}
             **/
            console.log(1)
            ${source}
        `
    callback(null,ret)
}

module.exports = loader;