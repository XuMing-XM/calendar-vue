import path from 'path'

const MODULE_ID = 'vue'

const SRC_BASE_DIR = 'src/'

const ENTRY_HTML = 'src/index.html'

//获取月份文件夹
let now = new Date()
let getMonth = (now) => {
    let month = now.getMonth() + 1
    if (month < 10) {
        return '0' + month
    } else {
        return month
    }
}
const dateFile = now.getFullYear() + '' + getMonth(now)

//文件输出名称
let OUT_PUT_NAME = {
    development : {
        jsName : '[name].bundle.js',
        cssName : '[name].css',
        htmlName : 'index.html'
    },
    test : {
        jsName : '[name].bundle.[hash:8].js',
        cssName : '[name].[hash:8].css',
        htmlName : `../../pages/${MODULE_ID}/index.html`
    },
    preProduction : {
        jsName : '[name].bundle.[hash:8].js',
        cssName : '[name].[hash:8].css',
        htmlName : `../../../pages/${MODULE_ID}/index.html`

    },
    production : {
        jsName : '[name].bundle.[hash:8].js',
        cssName : '[name].[hash:8].css',
        htmlName : `../../../pages/${MODULE_ID}/index.html`

    }
}
//html压缩配置文件
let htmlConfig = {
    html5: true,
    minifyURLs: true,
    removeTagWhitespace: true,
    removeComments: true,
    removeEmptyElements: false,
    collapseWhitespace: false
}

const PUBLIC_PATH = {
    development: '/'+ MODULE_ID,
    test: `//s.daily.geilicdn.com/CPC/${MODULE_ID}`,
    preProduction: `//s.pre.geilicdn.com/CPC/${MODULE_ID}/${dateFile}`,
    production: `//s.geilicdn.com/CPC/${MODULE_ID}/${dateFile}`
}

const REPLACE = {
    development: {
        ENV: 'development',
        API_PROXY: '//gw.test.weidian.com/h5'

    },
    test: {
        ENV: 'test',
        API_PROXY: '//gw.test.weidian.com/h5'
    },
    preProduction: {
        ENV:'production',
        API_PROXY: '//gw-pre.test.weidian.com/h5'
    },
    production: {
        ENV: 'production',        
        API_PROXY: '//gwh5.api.weidian.com'
    }
}
export default function(env, testNum) {
    this.moduleId = MODULE_ID
    this.env = env
    this.replace = []
    for (let i in REPLACE[env]) {
        let replace = REPLACE[env]
        let query = {}
        query.search = new RegExp('_' + i + '_', 'g')
        query.replace = ((replace[i] + '').replace(/_TEST_NUM_/g, testNum))
        this.replace.push(query)
    }
    this.outputName = OUT_PUT_NAME[env]
    this.dateFile = dateFile
    this.publicPath = PUBLIC_PATH[env]
    this.srcBaseDir = SRC_BASE_DIR
    if(env == 'development'){
        this.buildBaseDir = 'build/'
    }else{
        this.buildBaseDir = 'build/static/'
        htmlConfig.collapseWhitespace = true
        
    }
    this.outputName.path = path.resolve(__dirname, '../' + this.buildBaseDir + this.moduleId)
    this.htmlConfig = htmlConfig
    this.entryHtml = ENTRY_HTML
}