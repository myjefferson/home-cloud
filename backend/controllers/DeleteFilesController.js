const path = require("path")
const rimraf = require("rimraf")
const fs = require("fs");
const { exec } = require('child_process');

exports.DeleteFilesController = async (req, res) => {
    const { dirpage } = req.query
    const dirDecript = path.join(`../${atob(dirpage)}`)
    const verifyExt = path.extname(`../${ dirDecript }`)
    console.log(dirDecript)

    if (!fs.existsSync(dirDecript)) {
        return res.status(404).json({ error: 'Arquivo não encontrado.' });
    }
    // Verifica se você tem permissão para acessar o arquivo
    fs.accessSync(dirDecript, fs.constants.R_OK | fs.constants.W_OK);

    if(verifyExt !== ""){
        const deleteCommandPlatform = process.platform === 'win32' 
            ? `del "${dirDecript}"` 
            : `rm -f "${dirDecript}"`;
        return exec(deleteCommandPlatform, (error, stdout, stderr) => {
            if (error) {
                return res.status(404).json({error: `Arquivo não encontrado: ${error}`})
            }
            return res.status(200).json({error: "Arquivo excluído com sucesso."})
        });
    }else{
        console.log(dirDecript)
        return rimraf(dirDecript, (err) => {
            if (err) {
                return res.status(404).json({ message: `Erro ao excluir a pasta: ${err}` })
            } 
            return res.status(200).json({ message: "Pasta apagada com sucesso!" })
        });
    }

    return res.status(500).json({message: `Ocorreu um erro nos servidor`})
}