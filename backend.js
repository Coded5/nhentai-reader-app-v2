import { NativeModules } from 'react-native';
import * as RNFS from 'react-native-fs';

const prefix = {
   "p": "png",
   "j": "jpg"
}

const MAX_ATTEMPT = 2;

//search
export const searchDoujin = (query, page=1) => {
   const { RequestModule } = NativeModules;
   if(!isNaN(query)) {
      let raw_response = RequestModule.getRequest("https://nhentai.net/api/gallery/"+query);
      let response = JSON.parse(raw_response);
      
      return {
         result: [response],
         num_pages: 1,
         per_page: 1
      };
   }

   const formattedQuery = query.trim().replace(" ", "+");
   let raw_response = RequestModule.getRequest("https://nhentai.net/api/galleries/search?query="+ formattedQuery +"&page="+page);
   let response = JSON.parse(raw_response);
   return response;
}

export function getPageImageURL(media_id, data, index=1, thumbnail=false) {
   return "https://"+ ((thumbnail) ? "t" : "i") + ".nhentai.net/galleries/"+media_id+"/"+index+ ((thumbnail) ? "t" : "")+ "."+prefix[data.t];
}

//Download
async function tryDownload(url, path, attempt, curr=0) {
   try {
      let result = await RNFS.downloadFile({fromUrl: url, toFile: path}).promise;
      if(result.statusCode != 200) {
         if(curr >= attempt) {
              return false;
         }
         return tryDownload(url, path, attempt, curr+1);
    } else {
         return true;
    }
   } catch(e) {
      if(curr >= attempt) {
         return false;
      }
      return tryDownload(url, path, attempt, curr+1);
   }
}

function download(url, path, attempt) {
 return new Promise((resolve, reject) => {
    tryDownload(url, path, attempt).then(r => {
       return r ? resolve("DOWNLOADED " + url) : reject("ERROR unable to download " + url);
    });
 });
}

export const download_doujin = async (doujin, updateProgressCallback) => {
   const listJsonPath = RNFS.DocumentDirectoryPath + "/list.json";
   
   try {
      let data = await RNFS.readFile(listJsonPath, 'utf8');
      let doujins = JSON.parse(data);

      for(var i = 0; i < doujins.length; i++) {
         console.log(doujins[i].id , doujin.id);
         if(doujins[i].id === doujin.id) {
            
            console.log("Found duplicate item skipping");
            return;
         }
      }

      doujins.push(doujin);
      try {
         await RNFS.unlink(listJsonPath);
         await RNFS.writeFile(listJsonPath, JSON.stringify(doujins), 'utf8');
         console.log("Updated metadata");
      } catch(e) {
         console.log(e);
      }
   } catch(e) {
      console.log("ERROR : " + e);
      try {
         let x = JSON.stringify([doujin]);
         console.log(x);
         await RNFS.writeFile(listJsonPath, x);
         console.log("Metadata file created");
      } catch(e) {
         console.log(e);
      }
   }

   const downloadDirectory = RNFS.DocumentDirectoryPath + "/doujins/"+doujin.id;
   RNFS.mkdir(downloadDirectory);

   let progress = 0;
   for(let i = 1; i <= doujin.num_pages; i++) {
      console.log("Started :" + i);
      const path = downloadDirectory + "/" + String(i) + "." + prefix[doujin.images.pages[i-1].t];
      const url = "https://i.nhentai.net/galleries/"+doujin.media_id+"/"+String(i)+"."+prefix[doujin.images.pages[i-1].t];
      download(url, path, MAX_ATTEMPT).then(r => {
         progress++;
         updateProgressCallback(progress / (doujin.num_pages * 2));
         console.log(r);
      }).catch(e => {
         progress++;
         updateProgressCallback(progress / (doujin.num_pages * 2));
         console.log(e);
      });
      progress++;
      updateProgressCallback(progress / (doujin.num_pages * 2));
      await new Promise(r => setTimeout(r, 100)); //not trying to DDOS nhentai
   }
}

export const listDoujins = async () => {
   const metadataPath = RNFS.DocumentDirectoryPath + "/list.json";
   try {
      let data = await RNFS.readFile(metadataPath, 'utf8');
      return JSON.parse(data);
   } catch(e) {
      console.log("No metadata found");
      return [];
   }
}

export const deleteDoujin = async (id, doneDeletingCallback) => {
   const metadataPath = RNFS.DocumentDirectoryPath + "/list.json";
   const downloadDirectory = RNFS.DocumentDirectoryPath + "/doujins/"+id;
   try {
      await RNFS.unlink(downloadDirectory);
      let data = await RNFS.readFile(metadataPath, 'utf8');
      let doujins = JSON.parse(data);
      let index = -1;
      for(var i = 0; i < doujins.length; i++) {
         if(String(doujins[i].id) === String(id)) {
            index = i;
            break;
         }
      }
      doujins.splice(index, 1);
      try {
         await RNFS.unlink(metadataPath);
         await RNFS.writeFile(metadataPath, JSON.stringify(doujins), 'utf8');
         console.log("Updated metadata");
      } catch(e) {
         console.log("Error during update :" + e);
      }
   } catch(e) {
      console.log("Error during deletion : " + e);
   }

   doneDeletingCallback();
}