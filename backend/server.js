const express = require('express')
const cors = require('cors')
const checkDiskSpace = require('check-disk-space').default
const multer = require('multer')
const path = require('path')
const rimraf = require('rimraf')
const mime = require('mime');
const dirTree = require("directory-tree")
const formidable = require('formidable')
const fsalt = require('fs').promises
const fs = require('fs')
const mysql = require('mysql')
const { static } = require('express')
const app = express()
const axios = require('axios')
const { Stream } = require('stream')
const Sequelize = require('sequelize')
const { User, Config } = require('./models/ConfigTables')
const sequelize = require('./models/conection')
//URL dir actual from  query
var currentDir; 
app.use(cors())
app.use(express.json())


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

//STORAGE - UPLOAD FILES
var storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, path.resolve(__dirname,'../',currentDir))
        console.log(`filename: ` + file.fieldname)
    },
    filename: function(req, file, cd){
        const name = path.basename(file.originalname) //Name archive
        const extension = path.extname(file.originalname) //extension archive
        cd(null, path.basename(name, extension) + '-' + Date.now() + extension)
    }
})

var upload = multer({storage: storage})

app.post('/upload', upload.array('files'), async (req, res, next) => {
    const files = req.files

    if(!files){
        const error = new Error('Por favor escolha os arquivos')
        error.httpStatusCode = 400
        return next(error)
    }
    
    res.json(files)
})

//CREATE FOLDER FROM ACTUAL AREA
app.post('/createFolder', (req,res) => {
    const {name} = req.query
    console.log(name)
    if(!fs.existsSync(`../${currentDir}/${name}`)){
        //console.log("Pasta criada")
        fs.mkdirSync(`../${currentDir}/${name}`)
        updateArea(req, res) //Update Array Current Dir
    }else{
        //console.log("Erro ao criar pasta")
    }
})

//FILES - SHOW FILES IN DIRECTORY
app.get('/files', (req,res) => {
    updateArea(req, res)
})

function updateArea(req, res){
    const {dir} = req.query
    currentDir = dir;

    listFiles = async (diretorio, arquivos) =>{
        if(!arquivos){
            arquivos = [];
        }

        let listReadFiles = await fsalt.readdir(diretorio);
        for(let num in listReadFiles){
            let stat = await fsalt.stat(diretorio + '/' + listReadFiles[num])
            if(stat.isDirectory()){
                //await listFiles(diretorio + '/'+ listReadFiles[k], arquivos)
                arquivos.push({
                    name: listReadFiles[num],
                    type: 1, //pasta
                    extension: "pasta"
                })
            }else{ 
                const extFile = path.extname(listReadFiles[num]);
                const ext = extFile.replace(".",""); //get extension
                const base64 = fs.readFileSync(diretorio + '/' + listReadFiles[num], {encoding: 'base64'});
                
                if(ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "svg"){
                    arquivos.push({
                        name: path.basename(listReadFiles[num], extFile),
                        type: 0, //don't pasta
                        extension: extFile.replace(".",""),
                        blob: `data:image/${extFile.replace(".","")};base64,${base64}`
                    });
                }else if(ext === "mp3" || ext === "m4a" || ext === "wav" || ext === "aac"){
                    arquivos.push({
                        name: path.basename(listReadFiles[num], extFile),
                        type: 0, //don't pasta
                        extension: extFile.replace(".",""),
                        blob: `data:audio/${extFile.replace(".","")};base64,${base64}`
                    });
                }else{
                    arquivos.push({
                    name: path.basename(listReadFiles[num], extFile),
                    type: 0, //don't pasta
                    extension: "~/path/"+extFile.replace(".","")
                });
            }
                //arquivos.push(diretorio + '/' + listReadFiles[num])
            }
        }
        //console.log(arquivos)
        return arquivos
    }

    async function callFiles(){
        let arquivos = await listFiles(`../${dir}`);
        res.json(arquivos)
    } callFiles()
}

//DOWNLOAD FILE
app.get('/download', 
    cors({
        exposedHeaders: ['Content-Disposition']
    }),
    async (req, res) => {
        const {dir, fileName} = req.query
        try{
            const fileURL = `../${dir}`
            const mimetype = mime.lookup(fileURL)
            res.set({
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': mimetype,
            })

            const stream = fs.createReadStream(fileURL)
            stream.pipe(res)
        }catch (e){
            console.error(e)
            res.status(500).end()
        }
    }
)

//DELETE FILE
app.delete(`/delete`, (req,res) => {
    const {dir} = req.query
    const verifyExt = path.extname(`../${dir}`)

    if(verifyExt != ""){
        //console.log("é um arquivo")
        fs.unlinkSync(`../${dir}`);
    }else{
        //console.log("é uma pasta")
        rimraf(`../${dir}`, function () {
            console.log('pasta apagada!')
        })
    }
})

app.use(express.static('public'))
const server = app.listen(8080, () => {
    console.log(`Server port: ${server.address().port}`)
})