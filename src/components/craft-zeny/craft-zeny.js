/* eslint-disable comma-dangle */
import axios from 'axios';

export default {
  data() {
    return {
      blueprints: [],
      materials: [{ name: 'leaf of yggdrasil', price: 2000 }],
      headgears: [],
      noData: [],
      filters: {
        sort: 'default',
        name: '',
      },
      sortOptions: [
        { name: 'Default', value: 'default' },
        { name: 'Total Cost - Low', value: 'price-low' },
        { name: 'Total Cost - High', value: 'price-high' },
        { name: 'Total Cost (ATK) - Low', value: 'price-patk-low' },
        { name: 'Total Cost (ATK) - High', value: 'price-patk-high' },
        { name: 'Zeny/ATK Ratio - Low', value: 'patk-ratio-low' },
        { name: 'Zeny/ATK Ratio - High', value: 'patk-ratio-high' },
        { name: 'Total Cost (MATK) - Low', value: 'price-matk-low' },
        { name: 'Total Cost (MATK) - High', value: 'price-matk-high' },
        { name: 'Zeny/MATK Ratio - Low', value: 'matk-ratio-low' },
        { name: 'Zeny/MATK Ratio - High', value: 'matk-ratio-high' },
        { name: 'Total Cost (HP) - Low', value: 'price-hp-low' },
        { name: 'Total Cost (HP) - High', value: 'price-hp-high' },
        { name: 'Zeny/HP Ratio - Low', value: 'hp-ratio-low' },
        { name: 'Zeny/HP Ratio - High', value: 'hp-ratio-high' },
      ],
      specialCase: [
        { name: 'Evil Wing', bpName: 'evil_wing_ears_blueprint' },
        { name: 'Heart Sunglasses', bpName: 'heart_sunglasses_design' },
        { name: 'The turkey goes gobble; gobble; gobble!', bpName: 'turkey_grr_blueprint' },
        { name: 'Unit-05 Helmet', bpName: 'unit.05_helmet_blueprint' },
      ],
      loading: true,
    };
  },
  created() {
    const data = this;
    const headers = {
      Origin: 'https://poporing.life',
    };
    axios.all([
      axios.get('https://api.sheety.co/398a7c79-ed83-479b-a3bd-24f1ff03633f'),
      axios.get('https://api.poporing.life/get_all_latest_prices?includeCategory=:type_item_material&mini=1', headers),
      axios.get('https://api.poporing.life/get_latest_prices?body=%5B%22apple_juice%22%2C%22mastela_fruit%22%2C%22honey%22%2C%22royal_jelly%22%2C%22candy%22%2C%22mystic_frozen%22%5D&mini=1', headers),
      axios.get('https://api.poporing.life/get_all_latest_prices?includeCategory=:type_blueprint_all&mini=1', headers),
    ])
      .then(axios.spread((headgears, materials, addMats, blueprints) => {
        blueprints.data.data.forEach((blueprint) => {
          data.blueprints.push({
            name: blueprint.item_name,
            price: blueprint.data.price,
            displayPrice: blueprint.data.price.toLocaleString(),
            displayName: blueprint.item_name.replace(/_1s/g, '').replace(/_blueprint/g, '').replace(/_/g, ' '),
            lastKnownPrice: blueprint.data.last_known_price,
          });
        });
        materials.data.data.forEach((material) => {
          data.materials.push({
            name: material.item_name.replace(/_/g, ' '),
            price: material.data.price,
            lastKnownPrice: material.data.last_known_price,
            volume: material.data.volume,
          });
        });
        addMats.data.data.forEach((addMat) => {
          data.materials.push({
            name: addMat.item_name.replace(/_/g, ' '),
            price: addMat.data.price,
            lastKnownPrice: addMat.data.last_known_price,
          });
        });
        headgears.data.forEach((headgear) => {
          if (headgear.blueprintAcquire !== 'None') {
            let grandTotal = 0;
            const bpMaterials = {
              normal: [],
              special: [],
              missing: false,
            };
            headgear.craftMaterials.split(', ').forEach((mat) => {
              const quantity = Number(mat.substr(0, mat.indexOf(' ')));
              const name = mat.substr(mat.indexOf(' ') + 1);
              if (name === 'Black Wing' || name === 'Clock' || name === 'Snowman') {
                bpMaterials.special.push({
                  name, quantity
                });
              } else {
                const found = data.materials.find(material => material.name === name.toLowerCase());
                const price = found ? found.price || found.lastKnownPrice || 0 : 0;
                if (!price && !bpMaterials.missing) {
                  bpMaterials.missing = true;
                }
                const total = quantity * price;
                grandTotal += total;
                bpMaterials.normal.push({
                  name, quantity, price, total, volume: found ? found.volume : 0
                });
              }
            });
            let bpExchangePrice = 0;
            if (headgear.blueprintTradeable === 'Yes') {
              const special = data.specialCase.find(spHeadgear =>
                spHeadgear.name === headgear.name);
              let bp;
              if (special) {
                bp = data.blueprints.find(blueprint => blueprint.name === special.bpName);
              } else {
                bp = data.blueprints.find((blueprint) => {
                  const headgearName = headgear.name.replace(/ \[1\]|'|\./g, '').replace(/-/g, ' ').toLowerCase();
                  return blueprint.displayName.toLowerCase() === headgearName;
                });
              }
              if (bp) {
                bpExchangePrice = bp.price || bp.lastKnownPrice;
                grandTotal += bp.price;
              } else {
                data.noData.push(headgear.name);
              }
            }

            const craftFee = Number(headgear.craftFee.replace(/[^0-9]/g, ''));
            grandTotal += craftFee;
            if (headgear.name === 'Sakura Bride') {
              const value = Number(headgear.blueprintCost);
              grandTotal += value;
              /* eslint-disable no-param-reassign */
              headgear.blueprintCost = `${value.toLocaleString()}z`;
            }

            let maxHP = 0;
            let atk = 0;
            let matk = 0;
            headgear.craftEffect.concat('; ', headgear.depositEffect).split('; ').forEach((effect) => {
              const h = effect.indexOf('Max HP');
              const m = effect.indexOf('M.Atk');
              const a = effect.indexOf('Atk');
              const v = Number(effect.substr(effect.indexOf('+') + 1));
              if (h >= 0) {
                maxHP += v;
              } else if (m >= 0) {
                matk += v;
              } else if (a >= 0 && m < 0) {
                atk += v;
              }
            });
            const hpZenyRatio = maxHP > 0 ? Number((grandTotal / maxHP).toFixed(2)) : 0;
            const matkZenyRatio = matk > 0 ? Number((grandTotal / matk).toFixed(2)) : 0;
            const atkZenyRatio = atk > 0 ? Number((grandTotal / atk).toFixed(2)) : 0;

            data.headgears.push({
              name: headgear.name,
              type: headgear.type,
              mainEffect: headgear.mainEffect,
              unlockEffect: headgear.craftEffect,
              depositEffect: headgear.depositEffect,
              blueprintCost: headgear.blueprintCost,
              blueprintTradeable: headgear.blueprintTradeable,
              bpExchangePrice,
              materials: bpMaterials,
              craftFee,
              total: grandTotal,
              maxHP,
              hpZenyRatio,
              atk,
              atkZenyRatio,
              matk,
              matkZenyRatio,
            });
          }
        });
        data.loading = false;
      }));
  },
  computed: {
    modifiedList: function modifiedList() {
      // const headgears = this.headgears.slice(0);
      const filters = this.filters;
      const headgears = this.headgears.filter((headgear) => {
        const name = headgear.name.toUpperCase();
        return (filters.name === '' || name.indexOf(filters.name.toUpperCase()) !== -1);
      });
      let key = '';
      switch (filters.sort) {
        case 'price-low':
          headgears.sort((a, b) => a.total - b.total);
          break;
        case 'price-high':
          headgears.sort((a, b) => b.total - a.total);
          break;
        case 'price-patk-low':
          headgears.sort((a, b) => a.total - b.total);
          key = 'atk';
          break;
        case 'price-patk-high':
          headgears.sort((a, b) => b.total - a.total);
          key = 'atk';
          break;
        case 'price-matk-low':
          headgears.sort((a, b) => a.total - b.total);
          key = 'matk';
          break;
        case 'price-matk-high':
          headgears.sort((a, b) => b.total - a.total);
          key = 'matk';
          break;
        case 'price-hp-low':
          headgears.sort((a, b) => a.total - b.total);
          key = 'maxHP';
          break;
        case 'price-hp-high':
          headgears.sort((a, b) => b.total - a.total);
          key = 'maxHP';
          break;
        case 'hp-ratio-low':
          headgears.sort((a, b) => a.hpZenyRatio - b.hpZenyRatio);
          key = 'hpZenyRatio';
          break;
        case 'hp-ratio-high':
          headgears.sort((a, b) => b.hpZenyRatio - a.hpZenyRatio);
          key = 'hpZenyRatio';
          break;
        case 'patk-ratio-low':
          headgears.sort((a, b) => a.atkZenyRatio - b.atkZenyRatio);
          key = 'atkZenyRatio';
          break;
        case 'patk-ratio-high':
          headgears.sort((a, b) => b.atkZenyRatio - a.atkZenyRatio);
          key = 'atkZenyRatio';
          break;
        case 'matk-ratio-low':
          headgears.sort((a, b) => a.matkZenyRatio - b.matkZenyRatio);
          key = 'matkZenyRatio';
          break;
        case 'matk-ratio-high':
          headgears.sort((a, b) => b.matkZenyRatio - a.matkZenyRatio);
          key = 'matkZenyRatio';
          break;
        default:
      }
      if (key) {
        const exclude = [];
        const sorted = [];
        headgears.forEach((headgear) => {
          if (!headgear[key]) {
            exclude.push(headgear);
          } else {
            sorted.push(headgear);
          }
        });
        return sorted.concat(exclude);
      }
      return headgears;
    },
  },
};
