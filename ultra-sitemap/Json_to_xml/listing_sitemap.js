// import configData from './listing-sitemap/episodes_listing.json' assert { type: 'json' };
// import configData from './listing-sitemap/series-listing.json' assert { type: 'json' };
// import configData from './listing-sitemap/movies_listing.json' assert { type: 'json' };
import configData from './listing-sitemap/natak-listing.json' assert { type: 'json' };

let d = new Date();
console.error("<--str-->", configData.data);
let ModifiedConfigData = [];
configData.data.map((item, i) => {
    // if(item.objectstatus === 'ACTIVE') {
    console.error("str", item);
    let modifiedItem = {};
    let title = spacialCharEncoding(item.title ? item.title : '');
    let idobject = (item['objectid']).toLowerCase();
    modifiedItem['loc'] = `https://www.ultrajhakaas.com/series/${title}/${idobject}`;
    // modifiedItem['loc'] = `https://www.ultrajhakaas.com/movie/${title}/${idobject}`;
    modifiedItem['changefreq'] = "Daily";
    modifiedItem['priority'] = "1.0";
    ModifiedConfigData.push(modifiedItem);
    // }
});
console.log("configData", ModifiedConfigData);
function spacialCharEncoding(str) {
  let string = str.replace(/-/g, ''); // Remove existing hyphens
    string = string.replace(' & ', 'and');
    var i = string.length,
     savedContented = [];

    while (i--) {
        var iC = string[i].charCodeAt();
        if ((iC >= 48 && iC <= 57) || (iC >= 97 && iC <= 122) || (iC >= 65 && iC <= 90)) {
          savedContented[i] = (string[i]).toLowerCase();
        } else if (iC == 32) {
          savedContented[i] = '-';
        } else {
          savedContented[i] = '';
        }
    }
    return savedContented.join('').replace(/-+/g, '-');
  };


document.getElementById('main').innerHTML = JSON.stringify(ModifiedConfigData);
