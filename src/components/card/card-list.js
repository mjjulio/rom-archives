/* eslint-disable no-param-reassign */
import axios from 'axios';

export default {
  data() {
    return {
      cards: [],
      exchangePrices: [],
      dust: {
        all: {
          name: '',
          price: 0,
        },
        gray: {
          name: '',
          price: 0,
        },
        green: {
          name: '',
          price: 0,
        },
        blue: {
          name: '',
          price: 0,
        },
        purple: {
          name: '',
          price: 0,
        },
      },
      loading: true,
    };
  },
  created() {
    const data = this;
    const headers = {
      Origin: 'https://poporing.life',
    };
    axios.all([
      axios.get('https://api.poporing.life/get_all_latest_prices?includeCategory=:type_card_all&mini=1', headers),
      axios.get('https://api.sheety.co/eea17a00-33d8-45b7-8184-8d0ae209c74b'),
    ])
      .then(axios.spread((prices, cards) => {
        prices.data.data.forEach((price) => {
          data.exchangePrices.push({
            name: price.item_name,
            price: price.data.price,
            // displayPrice: blueprint.data.price.toLocaleString(),
            displayName: price.item_name.replace(/_1s/g, '').replace(/price/g, '').replace(/_/g, ' '),
            lastKnownPrice: price.data.last_known_price,
          });
        });
        data.cards = cards.data.map((card) => {
          const priceData = card.tradeable
            ? data.exchangePrices.find(price => card.apiName === price.name)
            : 0;
          const exchangePrice = priceData ? priceData.price || priceData.lastKnownPrice : 0;
          let dustPrice = 0;
          if (exchangePrice && card.devourable) {
            switch (card.rarity) {
              case 'Gray':
                dustPrice = exchangePrice / 10;
                if (!data.dust.gray.name || dustPrice < data.dust.gray.price) {
                  data.dust.gray = {
                    name: card.name,
                    price: dustPrice,
                  };
                }
                break;
              case 'Green':
                dustPrice = exchangePrice / 20;
                if (!data.dust.green.name || dustPrice < data.dust.green.price) {
                  data.dust.green = {
                    name: card.name,
                    price: dustPrice,
                  };
                }
                break;
              case 'Blue':
                dustPrice = exchangePrice / 50;
                if (!data.dust.blue.name || dustPrice < data.dust.blue.price) {
                  data.dust.blue = {
                    name: card.name,
                    price: dustPrice,
                  };
                }
                break;
              case 'Purple':
                dustPrice = exchangePrice / 100;
                if (!data.dust.purple.name || dustPrice < data.dust.purple.price) {
                  data.dust.purple = {
                    name: card.name,
                    price: dustPrice,
                  };
                }
                break;
              default:
            }
            if (!data.dust.all.name || dustPrice < data.dust.all.price) {
              data.dust.all = {
                name: card.name,
                price: dustPrice,
              };
            }
          }
          let displayPrice = `${exchangePrice.toLocaleString()}z`;
          if (card.tradeable && !exchangePrice) {
            displayPrice = 'NO DATA';
          } else if (!card.tradeable) {
            displayPrice = 'non-tradeable';
          }
          card.mainEffect = card.mainEffect.split('; ');
          return Object.assign({
            exchangePrice,
            displayPrice,
            dustPrice,
          }, card);
        });
        data.cards.forEach((card) => {
          const materials = [];
          let craftedPrice = 0;
          if (card.materials) {
            card.materials.split('; ').forEach((mat) => {
              const quantity = Number(mat.substr(0, mat.indexOf(' ')));
              const name = mat.substr(mat.indexOf(' ') + 1);
              if (card.event) {
                materials.push({
                  name,
                  quantity,
                });
              } else {
                let price = 0;
                if (name.toLowerCase() === 'gram dust') {
                  price = data.dust.all.price;
                } else if (name.toLowerCase() === 'mandragora flower card') {
                  const found = data.exchangePrices.find(ex => ex.displayName === 'mandragora card');
                  price = found ? found.price || found.lastKnownPrice : 0;
                } else {
                  const found = data.exchangePrices.find(ex => ex.displayName === name.toLowerCase());
                  price = found ? found.price || found.lastKnownPrice : 0;
                }
                const total = quantity * price;
                craftedPrice += total;
                materials.push({
                  name,
                  quantity,
                  price,
                  total,
                });
              }
            });
          }
          card.materials = materials;
          card.craftedPrice = `${(craftedPrice + card.craftFee).toLocaleString()}z`;
        });
      }));
    data.loading = false;
  },
  computed: {
    filteredCards: function filteredCards() {
      return this.cards;
    },
  },
};
