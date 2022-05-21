const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer')

router.use(cors())
router.use(express.json())

//Controllers
const { UploadController } = require("./controllers/UploadController")
const { ListFilesController } = require("./controllers/ListFilesController")
const { PreviewFileController } = require("./controllers/PreviewFileController")
const { DeleteFilesController } = require('./controllers/DeleteFilesController')
const { DownloadFilesController } = require('./controllers/DownloadFilesController')
const { CreateFolderController } = require('./controllers/CreateFolderController')

//RouterListFiles
router.get('/listfiles', (req, res) => ListFilesController(req, res))

//RouterPreviewFileAndMiniature
router.get('/preview', (req, res) => PreviewFileController(req, res))

//RouterCreateFolder
router.post('/createFolder', (req, res) => CreateFolderController(req, res))

//RouterUploadFile
const upload =  multer({ storage: UploadController})
router.post( '/upload', upload.array('files'), async (req, res, next) => { /*return json(files)*/  });

//RouterDownloadFile
router.get('/download', (req,res) => DownloadFilesController(req, res))

//RouterDeleteFile
router.delete(`/delete`, (req, res) => DeleteFilesController(req, res))

//Export routes to server
module.exports = router;