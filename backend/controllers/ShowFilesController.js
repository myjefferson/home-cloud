const path = require("path")
const fsalt = require('fs').promises
const fs = require('fs')
const sharp = require('sharp');


const ShowFilesController = (req, res) => {
    const { dir } = req.query

    listFiles = async (diretorio, arquivos) =>{
        if(!arquivos){
            arquivos = [];
        }

        let listReadFiles = await fsalt.readdir(diretorio);
        for(let num in listReadFiles){
            let stat = await fsalt.stat(diretorio + '/' + listReadFiles[num])
            if(stat.isDirectory()){
                //await listFiles(diretorio + '/'+ listReadFiles[k], arquivos)
                arquivos.push({
                    name: listReadFiles[num],
                    type: 1, //pasta
                    extension: "pasta"
                })
            }else{ 
                const extFile = path.extname(listReadFiles[num]);
                const ext = extFile.replace(".",""); //get extension
                const base64 = fs.readFileSync(diretorio + '/' + listReadFiles[num], {encoding: 'base64'});
                
                if(ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "svg"){
                    //compress images
                    var buffer = Buffer.from(base64, 'base64')
                    await sharp(buffer)
                        .resize(400)
                        .toBuffer()
                        .then(resizedImageBuffer => {
                            var resizedImageData = resizedImageBuffer.toString('base64');
                            arquivos.push({
                                name: path.basename(listReadFiles[num], extFile),
                                type: 0, //don't pasta
                                extension: extFile.replace(".",""),
                                base64: `data:image/${ext};base64,${resizedImageData}`,
                            });
                        }).catch(error =>{
                            arquivos.push({
                                name: path.basename(listReadFiles[num], extFile),
                                type: 0, //don't pasta
                                extension: extFile.replace(".",""),
                                base64: `./img/extensions/${ext}.png`,
                            });
                        })
                   
                }else if(ext === "mp3" || ext === "m4a" || ext === "wav" || ext === "aac"){
                    arquivos.push({
                        name: path.basename(listReadFiles[num], extFile),
                        type: 0, //don't pasta
                        extension: extFile.replace(".",""),
                        base64: `data:audio/${extFile.replace(".","")};base64,${base64}`
                    });
                }else{
                    arquivos.push({
                    name: path.basename(listReadFiles[num], extFile),
                    type: 0, //don't pasta
                    extension: extFile.replace(".","")
                });
            }
                //arquivos.push(diretorio + '/' + listReadFiles[num])
            }
        }
        //console.log(arquivos)
        return arquivos
    }

    async function callFiles(){
        let arquivos = await listFiles(`../${dir}`);
        res.json(arquivos)
    } callFiles()
}

module.exports = { ShowFilesController }