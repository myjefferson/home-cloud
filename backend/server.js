const express = require('express')
const cors = require('cors')
const checkDiskSpace = require('check-disk-space').default
const multer = require('multer')
const path = require('path')
const rimraf = require('rimraf')
const mime = require('mime');
const dirTree = require("directory-tree")
const formidable = require('formidable')
const mysql = require('mysql')
const { static } = require('express')
const app = express()
const axios = require('axios')
const { Stream } = require('stream')
const Sequelize = require('sequelize')
const { User, Config } = require('./models/ConfigTables')
const sequelize = require('./models/conection')
const fsalt = require('fs').promises
const fs = require('fs')

const rotas = require("./routes");

//URL dir actual from  query
var currentDir;


app.use(cors())
app.use(express.json())
//Carrega as rotas
app.use(rotas)

app.get('/verifyInstall', (req,res) => {
    Config.findAll({
        raw: true,
        attributes: ['installed']
    }).then(installed => {
        return installed != undefined 
        ? res.json({installed: installed}) 
        : res.json({installed: false})
    })
})

//DATABASE
app.post('/installSystem', (req, res) =>{
    const { sizeStorage } = req.body
    console.log(sizeStorage)

    User.sync()
    Config.sync()

    Config.create({
        //name: "Jefferson",
        //email: "jcsjeffrey@gmail.com",
        //password: '12345678',
        installed: 1,
        diskSpace: sizeStorage
    })
})

app.post('/login', (req, res) => {
    
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


//DETECT CREATED PRINCIPAL PASTA
const pasta = "../cloud"
function Pasta(){
    if(!fs.existsSync(pasta)){
        fs.mkdirSync(pasta)
    }
}Pasta();

//CREATE FOLDER FROM ACTUAL AREA


//DOWNLOAD FILE
// app.get('/download', 
//     cors({
//         exposedHeaders: ['Content-Disposition']
//     }),
//     async (req, res) => {
//         const {dir, fileName} = req.query
//         try{
//             const fileURL = `../${dir}`
//             const mimetype = mime.lookup(fileURL)
//             res.set({
//                 'Content-Disposition': `attachment; filename="${fileName}"`,
//                 'Content-Type': mimetype,
//             })

//             const stream = fs.createReadStream(fileURL)
//             stream.pipe(res)
//         }catch (e){
//             console.error(e)
//             res.status(500).end()
//         }
//     }
// )

app.use(express.static('public'))

const server = app.listen(8080, () => {
    console.log(`Server port: ${server.address().port}`)
})