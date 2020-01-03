/* eslint-disable no-param-reassign */
import axios from 'axios';

export default {
  data() {
    return {
      cards: [],
      exchangePrices: [],
      dust: {
        all: { name: '', price: 0 },
        white: { name: '', price: 0 },
        green: { name: '', price: 0 },
        blue: { name: '', price: 0 },
        purple: { name: '', price: 0 },
      },
      filters: {
        name: '',
        mainEffect: '',
        depositEffect: '',
        unlockEffect: '',
        type: '—',
        color: '—',
        tag: '—',
        sort: 'default',
      },
      colors: ['—', 'White', 'Green', 'Blue', 'Purple'],
      types: ['—', 'Weapon', 'Off-hand', 'Headwear', 'Armor', 'Garment', 'Footgear', 'Accessory'],
      tags: ['—', 'Craft', 'Element', 'Race', 'Size', 'Skill', 'Status Effect', 'Event', 'Cannot Decompose'],
      sorting: [
        { name: '—', value: 'default' },
        { name: 'Name (A-Z)', value: 'name-az' },
        { name: 'Name (Z-A)', value: 'name-za' },
        { name: 'Exchange Price (Low)', value: 'eprice-low' },
        { name: 'Exchange Price (High)', value: 'eprice-high' },
      ],
      loading: true,
      showBackToTopBtn: false,
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
        data.loading = false;
      }));
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    filteredCards: function filteredCards() {
      const name = this.filters.name.toLowerCase();
      const mainEffect = this.filters.mainEffect.toLowerCase();
      const depositEffect = this.filters.depositEffect.toLowerCase();
      const unlockEffect = this.filters.unlockEffect.toLowerCase();
      const tag = this.filters.tag;
      const cards = this.cards.filter((card) => {
        const cme = card.mainEffect.join(';').toLowerCase();
        let filterMainEffect = cme.indexOf(mainEffect) !== -1;
        if (mainEffect === 'atk' && filterMainEffect) {
          filterMainEffect = (cme.indexOf('m.atk') + 2) !== cme.indexOf('atk');
        }

        const cde = card.depositEffect.toLowerCase();
        let filterDepositEffect = cde.indexOf(depositEffect) !== -1;
        if (depositEffect === 'atk' && filterDepositEffect) {
          filterDepositEffect = (cde.indexOf('m.atk') + 2) !== cde.indexOf('atk');
        }

        const cue = card.unlockEffect.toLowerCase();
        let filterUnlockEffect = cue.indexOf(unlockEffect) !== -1;
        if (unlockEffect === 'atk' && filterUnlockEffect) {
          filterUnlockEffect = (cue.indexOf('m.atk') + 2) !== cue.indexOf('atk');
        }

        let filterTag = true;
        if (tag === 'Craft') {
          filterTag = !!card.materials.length;
        } else if (tag === 'Event') {
          filterTag = !!card.event;
        } else if (tag === 'Cannot Decompose') {
          filterTag = !card.devourable;
        } else {
          filterTag = card.tags.join(',').indexOf(tag) !== -1;
        }

        return (name === '' || card.name.toLowerCase().indexOf(name) !== -1)
          && (mainEffect === '' || filterMainEffect)
          && (depositEffect === '' || filterDepositEffect)
          && (unlockEffect === '' || filterUnlockEffect)
          && (this.filters.type === '—' || this.filters.type === card.type)
          && (this.filters.color === '—' || this.filters.color === card.rarity)
          && (this.filters.tag === '—' || filterTag)
        ;
      });

      let key = '';
      switch (this.filters.sort) {
        case 'name-az':
          cards.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-za':
          cards.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'eprice-low':
          cards.sort((a, b) => a.exchangePrice - b.exchangePrice);
          key = 'exchangePrice';
          break;
        case 'eprice-high':
          cards.sort((a, b) => b.exchangePrice - a.exchangePrice);
          key = 'exchangePrice';
          break;
        default:
      }
      if (key) {
        const excluded = [];
        const sorted = [];
        cards.forEach((card) => {
          if (!card[key]) {
            excluded.push(card);
          } else {
            sorted.push(card);
          }
        });
        return sorted.concat(excluded);
      }

      return cards;
    },
  },
  methods: {
    clickTag: function clickTag(filter, value) {
      this.filters[filter] = value;
    },
    handleScroll: function handleScroll() {
      const ws = window.getComputedStyle(document.body, ':before').content;
      if (ws === '"sm"' || ws === '"xs"') {
        this.showBackToTopBtn = window.scrollY > 645;
      } else {
        this.showBackToTopBtn = window.scrollY > 400;
      }
    },
    scrollToTop: function scrollToTop() {
      window.scrollTo(0, 50);
    },
  },
};
