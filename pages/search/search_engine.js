import { NativeModules } from 'react-native';
import JSSoup from 'jssoup';

function formatQuery(query) {
   return query.trim().replace(" ", "+")
}

function getTags(id) {
   const { RequestModule } = NativeModules;
   let r = JSON.parse(RequestModule.getNH(id));
   let tags = []
   r.tags.forEach(tag => {
      tags.push(tag.name);
   });
   return tags;
}

//O(2n)
export default function run_search(query) {
   const { RequestModule } = NativeModules;
   let r = RequestModule.getRequest('https://nhentai.net/search/?q='+formatQuery(query));
   let soup = new JSSoup(r);
   let tag = soup.findAll("div", "gallery");
   doujins = [];
   tag.forEach(doujin => {
      let id = doujin.descendants[0].attrs.href.substring(3, 9);
      let img = doujin.descendants[0].descendants[0].attrs['data-src'];
      let name = doujin.descendants[0].descendants[3].text;
      let tags = getTags(id);
      doujins.push({
         number: id,
         thumbnail: img,
         title: name,
         tags: tags
      });
   });
   return doujins;
}