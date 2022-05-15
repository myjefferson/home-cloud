const path = require("path")
const rimraf = require("rimraf")
const fs = require("fs");

const DeleteFilesController = (req, res) => {
    
    const {dir} = req.query
    const verifyExt = path.extname(`../${ dir }`)
    
    if(verifyExt != ""){
        fs.unlinkSync(`../${dir}`);
    }else{
        rimraf(`../${dir}`, function () {
            console.log('pasta apagada!')
        })
    }

}

module.exports = { DeleteFilesController }