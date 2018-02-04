var request = require("request");
var cheerio = require("cheerio");
var lien = "https://restaurant.michelin.fr";
var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin";

var listAdresse = [];
request(
  {

  uri: url,
  },function(error, response, body) {
    var $ = cheerio.load(body);

    var nbPage = $(".mr-pager-item")[12].children[0].attribs["attr-page-number"];
    console.log(nbPage);

    for (var i=1; i<=nbPage; i++)
    {
      request(
      {
        uri : url + "/page-" + i,
      },function(error, response, body){
        var $ = cheerio.load(body);

        $(".poi-card-link").each(function()
        {
          var link = $(this);
          var href = link.attr("href");
          var titre = link.find(".poi_card-display-title").text();
          var adresse = lien+href;
          listAdresse.push(adresse);
          //console.log(titre + "->  " + adresse);

          request(
          {
            uri: adresse,
          },function(error, response, body){
            var $2 = cheerio.load(body);

            console.log(titre);

            var nbEtoile = $2(".content-wrapper").text()
            console.log(nbEtoile);

            try{
              var lieu = $2(".thoroughfare")[0].children[0].data;
              console.log(lieu);
            }
            catch(e){
              console.log(e);
            }

            var codeP = $2(".postal-code")[0].children[0].data;
            console.log(codeP);

            var ville = $2(".locality")[0].children[0].data;
            console.log(ville);

            var specialite = $2(".poi_intro-display-cuisines").text()
            console.log(specialite);

            var tel = $2(".tel").text();
            console.log(tel);
          });
        });
      });
    }
  });
