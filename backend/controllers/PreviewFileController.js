const fs = require('fs')
const path = require("path")
const Sharp = require('sharp');

const PreviewFileController = (req, res) => {
    const { miniature, show } = req.query;
    const calldir = path.join(__dirname + `../../../${show}`);

    fs.access( calldir , (exists) => {
        if(!exists === true){

            const stream = fs.createReadStream(calldir);
            const extFile = path.extname(calldir);
            const extension = extFile.replace(".","").toLowerCase(); //get file extension

            const arrayImage = ['jpg', 'jpeg', 'png', 'svg']
            const arrayAudio = ['mp3', 'm4a', 'wav', 'aac']
            const arrayVideo = ['mp4']

            if( (miniature === 'true') && (arrayImage.indexOf(extension) === 0) ){
                //Create miniature for images file 
                const resize = Sharp({ failOnError: false }).resize(200).toFormat('jpg')
                res.set('Content-Type', 'image/jpg')
                stream.pipe(resize).pipe(res)

            }else if( arrayImage.indexOf(extension) === 0 ){
                const resize = Sharp({ failOnError: false }).resize(900).toFormat('jpg')
                res.set('Content-Type', 'image/jpg')
                stream.pipe(resize).pipe(res)

            }else if( arrayAudio.indexOf(extension) === 0 ){
                res.set('Content-Type', 'video/mp3')
                stream.pipe(res)

            }else if( arrayVideo.indexOf(extension) === 0 ){ 
                res.set('Content-Type', 'video/mp4')
                stream.pipe(res)
            }
    
        }else{
            res.json([{
                'mensagem': "O arquivo não existe ou está comrrompido",
                'diretorio': calldir
            }])
        }
    })
}

module.exports = { PreviewFileController }