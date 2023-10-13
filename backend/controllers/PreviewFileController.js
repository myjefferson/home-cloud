const { streamingMidia } = require('./StreamingMidiaController')
const mimeTypes = require('../configs/mimeTypes')
const fs = require('fs')
const path = require("path")
const Sharp = require('sharp')

exports.PreviewFileController = (request, response) => {
    const { miniature, show } = request.query;
    const dirDecrypt = atob(show);
    const calldir = path.join(__dirname + `../../../${dirDecrypt}`);
    
    fs.access( calldir , (exists) => {
        if(!exists === true){
            const stream = fs.createReadStream(calldir);
            const extFile = path.extname(calldir);
            const extension = extFile.replace(".","").toLowerCase(); //get file extension

            if( (miniature === 'true') && (mimeTypes.image.indexOf(extension) > -1) ){
                const resize = Sharp({ failOnError: false }).resize(200).toFormat('jpeg') //Create miniature for images file
                response.set('Content-Type', 'image/jpeg')
                return stream.pipe(resize).pipe(response)

            }else if( mimeTypes.image.indexOf(extension) > -1 ){
                const resize = Sharp({ failOnError: false }).resize(900).toFormat('jpeg')
                response.set('Content-Type', 'image/jpeg')
                return stream.pipe(resize).pipe(response)

            }else if( mimeTypes.audio.indexOf(extension) > -1 ){
                streamingMidia(request, response, 'audio', extension, calldir);

            }else if( mimeTypes.video.indexOf(extension) > -1 ){
                streamingMidia(request, response, 'video', extension, calldir);

            }else if( mimeTypes.document.indexOf(extension) > -1 ){
                response.set('Content-Type', `application/${extension}`)
                return stream.pipe(response)
            }
        }else{
            response.json([{
                'mensagem': "O arquivo não existe ou está comrrompido",
                'diretorio': calldir
            }])
        }
    })
}