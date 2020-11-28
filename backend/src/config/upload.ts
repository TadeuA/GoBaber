import { Request } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";


const tmpFolder = path.join(__dirname, '..', '..', 'tmp');
export default{
  directory : tmpFolder,
  storage: multer.diskStorage({
      //resolve o caminho de onde o arquivo será armazenado
      destination: tmpFolder,
      filename: (request, file, callback:Function)=>{
					//salva extensão
          const extension = path.extname(file.originalname);
          //salva o nome do arquivo sem a extensão
					let name = path.basename(file.originalname,extension);
					//cria um hex
					const fileHash = crypto.randomBytes(10).toString('hex');
          //retira os espaços do nome da extensão
					name = name.replace(/\s/g, "_")
					//cria um nome único para o arquivo
          const fileName =`${fileHash}-${name}${extension}`;
          callback(null, fileName);
      }
  })
}
