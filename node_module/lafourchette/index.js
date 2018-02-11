var request = require("request");
var cheerio = require("cheerio");
var fs = require ('fs');
const readLine = require('readline');

var contenu;

contenu = fs.readFileSync("../michelin/package.json", "UTF-8");

var json = JSON.parse(contenu);

var michelinList = json.MichelinRestaurants;
const nbrResto = michelinList.length;

for (var i=0; i<nbrResto; i++)
{
  var name = michelinList[i].name;
  var newName = name.replace(/ /g, "%20");
  console.log(newName);
  var url = "https://www.lafourchette.com/search-refine/"+newName;
  console.log(url);

  try{
    request({
      uri: url,
    }, function(error, response, body) {
        var $ = cheerio.load(body);

        var result = $(".resultAddressList");

        if(result.length != 0)
        {
          console.log("resultat positif :" + name);
        }

      });
  }
  catch(e){
    console.log(e);
  }
}
