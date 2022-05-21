const fs = require('fs')
const path = require("path")
const Sharp = require('sharp');

const PreviewFileController = (req, res) => {
    const { miniature, show } = req.query;
    const calldir = __dirname + '../../../' + show;

    fs.access(calldir, (exists) => {
        if(!exists === true){

            const stream = fs.createReadStream(calldir);
            const extFile = path.extname(calldir);
            const extension = extFile.replace(".","").toLowerCase(); //get file extension
            
            if( (miniature === 'true') && (extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "svg") ){

                //Create miniature for images file 
                const resize = Sharp().resize(200).toFormat('jpg')
                res.set('Content-Type', 'image/jpg')
                stream.pipe(resize).pipe(res)

            }else if(extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "svg"){
                const resize = Sharp().resize(900).toFormat('jpg')
                res.set('Content-Type', 'image/jpg')
                stream.pipe(resize).pipe(res)

            }else if(extension === "mp3" || extension === "m4a" || extension === "wav" || extension === "aac"){
                res.set('Content-Type', 'video/mp3')
                stream.pipe(res)

            }else if(extension === "mp4"){                
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