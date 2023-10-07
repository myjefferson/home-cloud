const Cloud = require('../models/Cloud');

exports.installCloud = async (req, res) => {
    console.log(req.body)
    const config = req.body
    return await Cloud.create({ 
        defined_storage: config.defined_storage,
        installation_type: config.installation_type,
        limit_storage_accounts: config.limit_storage_accounts,
    }).then(success => {
        return res.json({'success': 'Instalado com sucesso'})
    }).catch(erro => {
        return res.json({'success': 'Erro na instalação'})
    });
}