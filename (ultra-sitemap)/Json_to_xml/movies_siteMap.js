import configData from './movies_siteMap_data.json' assert { type: 'json' };

let d = new Date();
console.error("<--str-->", configData.Movie);
let ModifiedConfigData = [];
configData.Movie.map((item, i) => {
    if(item.objectstatus === 'ACTIVE') {
    console.error("str", item);
    let modifiedItem = {};
    let title = spacialCharEncoding(item.title ? item.title : '');
    let longdescription = replaceSpecialSybal(item.longdescription ? item.longdescription : '');
    let idobject = (item['idobject']).toLowerCase();
    let poster = item.Lanposter ? `https://d17a0cnlv8m3x8.cloudfront.net/POSTER/${item.Lanposter}` : '';
    modifiedItem['loc'] = `https://www.ultrajhakaas.com/movie/${title}/${idobject}`;
    console.log(d.getFullYear() + "-" + ((d.getMonth()+1) < 10 ?  `0${(d.getMonth()+1)}` : (d.getMonth()+1)) + "-" + ((d.getDate()) < 10 ? `0${(d.getDate())}` : (d.getDate())))
    modifiedItem['lastmod'] = d.getFullYear() + "-" + ((d.getMonth()+1) < 10 ?  `0${(d.getMonth()+1)}` : (d.getMonth()+1)) + "-" + ((d.getDate()) < 10 ? `0${(d.getDate())}` : (d.getDate()));
    modifiedItem['changefreq'] = 'Weekly';
    modifiedItem['priority'] = '1.0';
    modifiedItem['image:image'] = { 'image:loc': poster };
    modifiedItem['video:video'] = { 'video:thumbnail_loc': poster, 'video:title': item.title ? item.title : '', 'video:description':  longdescription};
    ModifiedConfigData.push(modifiedItem);
    }
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

function replaceSpecialSybal(str) {
  let replaceWord = str.replace('&', "and");
  let threeDots = "…";
  replaceWord = replaceWord.replaceAll(threeDots, ".");
  return replaceWord;
}
document.getElementById('main').innerHTML = JSON.stringify(ModifiedConfigData);
