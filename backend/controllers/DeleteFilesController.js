const path = require("path")
const rimraf = require("rimraf")
const fs = require("fs");

const DeleteFilesController = (req, res) => {
    
    const { dirpage } = req.query
    const verifyExt = path.extname(`../${ dirpage }`)
    
    if(verifyExt != ""){
        fs.unlinkSync(`../${dirpage}`);
    }else{
        rimraf(`../${dirpage}`, function () {
            console.log('pasta apagada!')
        })
    }

}

module.exports = { DeleteFilesController }