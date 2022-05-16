const fs = require("fs")

const CreateFolderController = (req, res) =>{
    const { name, dirpage} = req.query

    console.log(name)
    
    if(!fs.existsSync(`../${dirpage}/${name}`)){
        //console.log("Pasta criada")
        fs.mkdirSync(`../${dirpage}/${name}`)
    }else{
        //console.log("Erro ao criar pasta")
    }
}

module.exports = { CreateFolderController }