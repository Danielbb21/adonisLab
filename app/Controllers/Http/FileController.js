'use strict'

const crypto = require('crypto');

const File = use('App/Models/File');
const Helpers = use('Helpers');

class FileController {

  async store ({ request, response }) {
    try{
      if(!request.file('file')) return;
      const upload = request.file('file', {size: '2mb'});
      console.log('upload', upload);
      const fileName = `${Date.now()}-${upload.clientName}-${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      });

      if(!upload.moved()){
        throw upload.error();
      }
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });
      return file;
    }

    catch(err){
      console.log(err);
      return response.status(err.status).json({error: 'Erro no upload de arquivo'});
    }
  }

  async show({request, response}){
  try{
    const {id} = request.params;
    const file = await File.findOrFail(id);

    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }
  catch(err){
    return response.status(err.status).json({error:'Sommeting Went Wrong'});
  }
  }

}

module.exports = FileController
