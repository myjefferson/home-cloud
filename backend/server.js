const express = require('express')
const cors = require('cors')
const checkDiskSpace = require('check-disk-space').default
const dirTree = require("directory-tree")
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')


app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Carrega as rotas
//app.use(rotas)(app)


app.get('/verifyInstall', (req,res) => {
    // Config.findAll({
    //     raw: true,
    //     attributes: ['installed']
    // }).then(installed => {
    //     return installed != undefined 
    //     ? res.json({installed: installed}) 
    //     : res.json({installed: false})
    // })
})

/*(async () =>{
    const db = require("./db/conection");
    console.log("começou")
    console.log("SELECT * FROM config;")
    const config = await db.selectInstalled()
    console.log(config)
})();*/


//VERIFICA O ARMAZENAMENTO
app.get('/diskspace', (req,res) => {
    checkDiskSpace(__dirname + '/cloud').then((diskSpace) => {
        res.json(diskSpace)
    })
})

app.get('/video/:video', (req,res) => {
    const { video } = req.params
    const stream = fs.createReadStream(__dirname + '../../cloud/' + video);
        
    res.set('Content-Type', 'video/mp4')

    stream.pipe(res)
})

//DETECT CREATED PRINCIPAL PASTA
const pasta = "../cloud"
function Pasta(){
    if(!fs.existsSync(pasta)){
        fs.mkdirSync(pasta)
    }
}Pasta();

//Routes
require("./routes")(app);

const server = app.listen(8080, () => {
    console.log(`Running Server File Manager in Port: ${server.address().port}`);
})