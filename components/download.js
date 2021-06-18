import * as RNFS from 'react-native-fs';

async function tryDownload(url, path, attempt, curr) {
     let result = await RNFS.downloadFile({fromUrl: url, toFile: path}).promise;
     if(result.statusCode != 200) {
          if(curr >= attempt) {
               return false;
          }
          return tryDownload(url, path, attempt, curr+1);
     } else {
          return true;
     }
}

export function download(url, path, attempt) {
     return new Promise((resolve, reject) => {
          tryDownload(url, path, attempt, 0).then(r => {
               return r ? resolve("DOWNLOADED " + url) : reject("ERROR unable to download " + url);
          });
     });
}