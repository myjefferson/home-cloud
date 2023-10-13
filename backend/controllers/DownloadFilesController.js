const fs = require("fs")
const mime = require('mime');

exports.DownloadFilesController = (req, res) => {
    const {directory, filename} = req.query
    const dirDecrypt = atob(directory)
    const fileNameDecrypt = atob(filename)
    
    try{
        const fileURL = `../${dirDecrypt}`
        const mimetype = mime.lookup(fileURL)
        res.set({
            'Content-Disposition': `attachment; filename="${fileNameDecrypt}"`,
            'Content-Type': mimetype,
        })

        const stream = fs.createReadStream(fileURL)
        stream.pipe(res)
    }catch (e){
        console.error(e)
        res.status(500).end()
    }
}