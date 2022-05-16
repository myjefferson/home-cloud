const fs = require("fs")
const mime = require('mime');

const DownloadFilesController = (req, res) => {
    const {dirpage, fileName} = req.query
    
    try{
        const fileURL = `../${dirpage}`
        const mimetype = mime.lookup(fileURL)
        res.set({
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': mimetype,
        })

        const stream = fs.createReadStream(fileURL)
        stream.pipe(res)
    }catch (e){
        console.error(e)
        res.status(500).end()
    }
}

module.exports = { DownloadFilesController }