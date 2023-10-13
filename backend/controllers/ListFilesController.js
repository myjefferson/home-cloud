const mimeTypes = require('../configs/mimeTypes')
const path = require("path")
const fsalt = require('fs').promises

exports.ListFilesController = (req, res) => {
    listFiles = async (diretorio, arquivos) =>{
        try {
            arquivos = [];
    
            let listReadFiles = await fsalt.readdir(diretorio);
            for(let num in listReadFiles){
                let stat = await fsalt.stat(diretorio + '/' + listReadFiles[num])
                if(stat.isDirectory()){
                    arquivos.push({
                        name: listReadFiles[num],
                        type: 1, //pasta
                        extension: "pasta"
                    })
                }else{ 
                    const extFile = path.extname(listReadFiles[num]);
                    const extension = extFile.replace(".","");
                    
                    if( mimeTypes.image.indexOf(extension) > -1 ){
                        arquivos.push({
                            name: path.basename(listReadFiles[num], extFile),
                            type: 0, //don't pasta
                            extension: extFile.replace(".",""),
                        });
                       
                    }else if( mimeTypes.audio.indexOf(extension) > -1 ){
                        arquivos.push({
                            name: path.basename(listReadFiles[num], extFile),
                            type: 0, //don't pasta
                            extension: extFile.replace(".",""),
                        });
                    }else{
                        arquivos.push({
                            name: path.basename(listReadFiles[num], extFile),
                            type: 0, //don't pasta
                            extension: extFile.replace(".","")
                        });
                    }
                }
            }
    
            return arquivos
        } catch (error) {
            return {error: error}
        }
    }

    callFiles = async () => {
        const { dir } = req.query
        const dirDecrypt = atob(dir)

        let arquivos = await listFiles(`../${dirDecrypt}`);
        res.json(arquivos)

    }; callFiles()
}