const multer = require('multer')

//Controllers
const { UploadController } = require("./controllers/UploadController")
const { ListFilesController } = require("./controllers/ListFilesController")
const { PreviewFileController } = require("./controllers/PreviewFileController")
const StreamingMidiaController = require("./controllers/StreamingMidiaController")
const { DeleteFilesController } = require('./controllers/DeleteFilesController')
const { DownloadFilesController } = require('./controllers/DownloadFilesController')
const { CreateFolderController } = require('./controllers/CreateFolderController')
const { findOneUser, findAllUsers, createUser } = require('./controllers/UserController')
const { installCloud } = require('./controllers/ConfigController')
const AuthController = require('./controllers/AuthController')

//Export routes to server
module.exports = (router) => { 
    router.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    })

    //auth
    router.post('/auth/signIn', async (req, res) => await AuthController.singIn(req, res))
    router.post('/auth/signUp', async (req, res) => await AuthController.singUp(req, res))

    //RouterListFiles
    router.get('/listfiles', async (req, res) => await ListFilesController(req, res))
    //RouterPreviewFileAndMiniature
    router.get('/preview', async (req, res) => await PreviewFileController(req, res))
    router.get('/closepreview', async (req, res) => await StreamingMidiaController.closeStream(req, res))
    //RouterCreateFolder
    router.post('/createFolder', async (req, res) => await CreateFolderController(req, res))
    //RouterUploadFile
    const upload = multer({ storage: UploadController})
    router.post( '/upload', upload.array('files'), (req, res, next) => { /*return json(files)*/  });
    //RouterDownloadFile
    router.get('/download', async (req, res) => await DownloadFilesController(req, res))
    //RouterDeleteFile
    router.delete(`/delete`, async (req, res) => await DeleteFilesController(req, res))
    //RouterAllUsers
    router.get('/allUsers', async (req, res) => await findAllUsers(req, res))
    //RouterOneUser

    //RouterCreateUser
    router.post('/createUser', async (req, res) => await createUser(req, res))
    //RouterConfigHomeCloud
    router.post('/installCloud', async (req, res) => await installCloud(req, res))
};