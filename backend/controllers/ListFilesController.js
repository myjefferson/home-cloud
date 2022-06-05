const mimeTypes = require('../configs/mimeTypes')
const path = require("path")
const fsalt = require('fs').promises

const ListFilesController = (req, res) => {
    const { dir } = req.query

    listFiles = async (diretorio, arquivos) =>{
        if(!arquivos){ arquivos = []; }

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
    }

    async function callFiles(){
        let arquivos = await listFiles(`../${dir}`);
        res.json(arquivos)
    } callFiles()
}

module.exports = { ListFilesController }