const multer = require('multer')
const path = require('path')

exports.UploadController = multer.diskStorage({

    destination: function(req, file, cd){
        const files = req.files

        if(!files){
            console.log("error")
            const error = new Error('Por favor escolha os arquivos')
            error.httpStatusCode = 400
            return error
        }

        cd( null, path.resolve( '../', req.query.directory ))
        //console.log(`filename: ${path.basename(file.originalname)} uploaded`)
    },

    filename: function(req, file, cd){
        const name = path.basename(file.originalname) //Name file
        const extension = path.extname(file.originalname) //extension file
        cd(null, path.basename(name, extension) + '-' + Date.now() + extension)
    }    
    
})