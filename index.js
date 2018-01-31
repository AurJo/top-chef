var request = require("request");
var cheerio = require("cheerio");

request({
  uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin",
}, function(error, response, body) {
  var $ = cheerio.load(body);

  $(".poi-search-result").each(function() {
    var link = $(this);
    var titre = $(this).find(".poi_card-display-title").text();
    var text = link.text();
    //var href = link.attr("href");

    console.log(" -> " + titre);
  });
});;
