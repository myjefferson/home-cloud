const mimeTypes = require('../configs/mimeTypes')
const fs = require('fs')
const path = require("path")
const Sharp = require('sharp')

const streamingMidia = (request, response, typeMidia, mime, calldir) => {
    const stream =      fs.createReadStream(calldir);
    const stat =        fs.statSync(calldir)
    const fileSize =    stat.size
    const range =       request.headers.range

    if(range){
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
        const chunksize = (end - start)+1
        const file = fs.createReadStream(calldir, {start, end})

        const head = {
            'Content-Range':    `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges':    'bytes',
            'Content-Length':   chunksize,
            'Content-Type':     `${typeMidia}/${mime}`,
        }

        response.writeHead(206, head);
        file.pipe(response);

    }else{
        const head = {
            'Content-Length': fileSize,
            'Content-Type': `${typeMidia}/${mime}`,
        }

        response.writeHead(206, head);
        stream.pipe(response)
    }
}

const PreviewFileController = (request, response) => {
    const { miniature, show } = request.query;
    const calldir = path.join(__dirname + `../../../${show}`);
    
    fs.access( calldir , (exists) => {
        if(!exists === true){
            const stream = fs.createReadStream(calldir);
            const extFile = path.extname(calldir);
            const extension = extFile.replace(".","").toLowerCase(); //get file extension

            if( (miniature === 'true') && (mimeTypes.image.indexOf(extension) > -1) ){
                const resize = Sharp({ failOnError: false }).resize(200).toFormat('jpeg') //Create miniature for images file
                response.set('Content-Type', 'image/jpeg')
                stream.pipe(resize).pipe(response)

            }else if( mimeTypes.image.indexOf(extension) > -1 ){
                const resize = Sharp({ failOnError: false }).resize(900).toFormat('jpeg')
                response.set('Content-Type', 'image/jpeg')
                stream.pipe(resize).pipe(response)

            }else if( mimeTypes.audio.indexOf(extension) > -1 ){
                streamingMidia(request, response, 'audio', extension, calldir);

            }else if( mimeTypes.video.indexOf(extension) > -1 ){
                streamingMidia(request, response, 'video', extension, calldir);

            }else if( mimeTypes.document.indexOf(extension) > -1 ){
                response.set('Content-Type', `application/${extension}`)
                stream.pipe(response)

            }
        }else{
            response.json([{
                'mensagem': "O arquivo não existe ou está comrrompido",
                'diretorio': calldir
            }])
        }
    })
}

module.exports = { PreviewFileController }