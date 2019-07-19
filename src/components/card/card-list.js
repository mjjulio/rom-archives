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
        white: {
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
            const color = card.rarity.toLowerCase();
            switch (color) {
              case 'white':
                dustPrice = exchangePrice / 10;
                break;
              case 'green':
                dustPrice = exchangePrice / 20;
                break;
              case 'blue':
                dustPrice = exchangePrice / 50;
                break;
              case 'purple':
                dustPrice = exchangePrice / 100;
                break;
              default:
            }
            if (!data.dust[color].name || dustPrice < data.dust[color].price) {
              data.dust[color] = {
                name: card.name,
                price: dustPrice,
              };
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
          card.tags = card.tags ? card.tags.split('; ') : [];
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
                  const found = data.exchangePrices
                    .find(ex => ex.displayName === name.toLowerCase());
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
