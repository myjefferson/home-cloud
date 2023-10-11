const path = require("path")
const fs = require('fs')

const mediaStreamers = {}
exports.streamingMidia = (request, response, typeMidia, mime, directory) => { 
    const { clientId } = request.query
    const videoPath = path.join(directory);

    if (!fs.existsSync(videoPath)) {
        return response.status(404).json({ error: 'Vídeo não encontrado' });
    }
    
    const stat = fs.statSync(videoPath)
    const fileSize = stat.size
    const range = request.headers.range

    if(!range){
        const head = {
            'Content-Length': fileSize,
            'Content-Type': `${typeMidia}/${mime}`,
        }
        response.writeHead(206, head);
        return mediaStreamers[clientId].pipe(response);
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    if (end < 0) end = 0;
    const chunksize = (end - start) + 1;

    const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': `${typeMidia}/${mime}`,
    };
    
    response.writeHead(206, head);
    mediaStreamers[clientId] = fs.createReadStream(videoPath, { start, end });
    return mediaStreamers[clientId].pipe(response);
}

exports.closeStream = (request, response)=> {
    const { clientId } = request.query
    if (mediaStreamers[clientId]) {
        mediaStreamers[clientId].unpipe(response);
        mediaStreamers[clientId].close();
        delete mediaStreamers[clientId];
        return response.status(200).json({ error: 'Vídeo fechado' });
    }
    return response.status(200).json({ error: 'Stream fechado' });
}