const path = require("path")
const rimraf = require("rimraf")
const fs = require("fs-extra");

exports.DeleteFilesController = async (req, res) => {
    try {
        const { dirpage } = req.query
        const dirDecript = `../${atob(dirpage)}`
        const verifyExt = path.extname(`../${ dirDecript }`)

        if (!fs.existsSync(dirDecript)) {
            return res.status(404).json({ error: 'Arquivo não encontrado.' });
        }
        // Verifica se você tem permissão para acessar o arquivo
        fs.accessSync(dirDecript, fs.constants.R_OK | fs.constants.W_OK);

        if(verifyExt !== ""){
            fs.unlinkSync(dirDecript, (error) => {
                if(error){
                    console.log("Erro ao excluir o vídeo: ", error)
                    return res.status(500).jsoon({error: "Erro ao excluir o arquivo."})
                }
                
                return res.status(200).send({ message: "Arquivo apagado com sucesso!"})
            });
        }else{
            await rimraf(`../${dirDecript}`, () => {
                return res.status(200).send({ message: "Pasta apagada com sucesso!" })
            })
        }
    } catch (error) {
        return res.status(500).send({message: `Ocorreu um erro nos servidor: ${error}`})
    }
}