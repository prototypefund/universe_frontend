import cry from '@/utils/api';
import api from '@/utils/api'


var file = function(){
    this.loadFile = function(fileid,cb){
        console.log('loading file '+fileid);
        return new Promise((resolve, reject)=>{
            api.get('files/'+fileid,{},function(err,result,body){
                if(err)
                  reject(err);
                else{
                  if(body){
                    console.log('got file');
                    console.log(body);
                      let resultFile;
                      if(body.file.privacy != 'p')
                        resultFile = cry.symDecrypt(body.filecontent, localStorage.passwordHash);
                      else
                        resultFile = body.filecontent;
                    
                      resolve({
                        file:body.file,
                        filecontent:resultFile
                      });
                  }else
                    resolve(false)
                }
            });
        })
    }
}

export default new file();