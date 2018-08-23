module.exports = {
  buildReponseItems: function(itemsJson) {
    var packageJson = require('../../package.json'),
      currencyFormatter = require('currency-formatter'),
      parseItems = [];

    for (var i = 0; i < itemsJson.results.length; i++) {
      parseItems.push({
        id: itemsJson.results[i].id,
        title: itemsJson.results[i].title,
        price: {
          currency: itemsJson.results[i].currency_id,
          amount: currencyFormatter.format(itemsJson.results[i].price, {
            symbol: '$',
            decimal: ',',
            thousand: '.',
            precision: 2,
            format: ' %s %v'
          }),
          decimals: 2
        },
        picture: itemsJson.results[i].thumbnail,
        condition: itemsJson.results[i].condition,
        free_shipping: itemsJson.results[i].shipping.free_shipping
      });
    }

    return (parseItems.length > 0) ? {
      author: {
        name: packageJson.author.name,
        lastname: packageJson.author.last_name
      },
      categories: ["Falta Categoria 1", "Falta Categoria 2", "Falta Categoria ...", "Falta Categoria N"],
      items: parseItems
    } : [];
  },

  buildReponseItemDetail : function(itemJson, descriptionJson){
    var packageJson = require('../../package.json'),
      currencyFormatter = require('currency-formatter');

    return {
      author: {
        name: packageJson.author.name,
        lastname: packageJson.author.last_name
      },
      item: {
        id: itemJson.id,
        title: itemJson.title,
        price: {
          currency: itemJson.currency_id,
          amount: currencyFormatter.format(itemJson.price, {
            symbol: '$',
            decimal: ',',
            thousand: '.',
            precision: 2,
            format: ' %s %v'
          }),
          decimals: 2
        },
        picture: itemJson.pictures ? itemJson.pictures[0].url : '',
        condition: itemJson.condition,
        free_shipping: itemJson.shipping ? itemJson.shipping.free_shipping : '',
        sold_quantity: itemJson.sold_quantity,
        description: descriptionJson.plain_text
      }
    };
  }
};
