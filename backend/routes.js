const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer')

router.use(cors())
router.use(express.json())

//Controllers
const { UploadController } = require("./controllers/UploadController")
const { ShowFilesController } = require("./controllers/ShowFilesController")
const { DeleteFilesController } = require('./controllers/DeleteFilesController')
const { DownloadFilesController } = require('./controllers/DownloadFilesController')
const { CreateFolderController } = require('./controllers/CreateFolderController')

//RouterShowFiles
router.get('/files', (req, res) => { ShowFilesController(req, res) })


//RouterCreateFolder
router.post('/createFolder', (req, res) => { CreateFolderController(req, res) })

//RouterUpload
const upload =  multer({ storage: UploadController})
router.post( '/upload', upload.array('files'), async (req, res, next) => { /*return json(files)*/  });

//RouterDownloadFile
router.get('/download', (req,res) =>
    DownloadFilesController(req, res) 
)

//RouterDeleteFile
router.delete(`/delete`, (req, res) => { 
     DeleteFilesController(req, res) 
})

//Export routes
module.exports = router;