const multer = require('multer')
const path = require('path')

const UploadController = multer.diskStorage({

    destination: function(req, file, cd){

        const files = req.files

        if(!files){
            console.log("erro")
            const error = new Error('Por favor escolha os arquivos')
            error.httpStatusCode = 400
            return error
        }

        cd( null, path.resolve( __dirname, '../../', req.params.dirpage ))
        console.log(`filename: ` + file.fieldname)
    },

    filename: function(req, file, cd){
        const name = path.basename(file.originalname) //Name file
        const extension = path.extname(file.originalname) //extension file
        cd(null, path.basename(name, extension) + '-' + Date.now() + extension)
    }    
    
})

module.exports = { UploadController }
