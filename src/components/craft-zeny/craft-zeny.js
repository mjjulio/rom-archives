/* eslint-disable comma-dangle */
/* eslint no-underscore-dangle: 0 */
import axios from 'axios';

export default {
  data() {
    return {
      blueprints: [],
      materials: [
        { name: 'leaf of yggdrasil', price: 2000 },
        { name: 'under the tower', price: 10000 },
      ],
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
      specialItem: [
        'Black Wing',
        'Clock',
        'Snowman',
        'Floating Coin',
        'Ancient Mithril Coin'
      ],
      additionalMats: [
        'apple_juice',
        'mastela_fruit',
        'honey',
        'royal_jelly',
        'candy',
        'mystic_frozen',
        'awakening_potion'
      ],
      loading: true,
    };
  },
  created() {
    const data = this;
    const headers = {
      Origin: 'https://poporing.life',
    };
    const additionaMaterials = escape(JSON.stringify(data.additionalMats));
    axios.all([
      axios.get('https://api.sheety.co/398a7c79-ed83-479b-a3bd-24f1ff03633f'),
      axios.get('https://api.poporing.life/get_all_latest_prices?includeCategory=:type_item_material&mini=1', headers),
      axios.get(`https://api.poporing.life/get_latest_prices?body=${additionaMaterials}&mini=1`, headers),
      axios.get('https://api.poporing.life/get_all_latest_prices?includeCategory=:type_blueprint_all&mini=1', headers),
    ])
      .then(axios.spread((headgears, materials, materials2, blueprints) => {
        blueprints.data.data.forEach((blueprint) => {
          data.blueprints.push({
            name: blueprint.item_name,
            price: blueprint.data.price,
            displayPrice: blueprint.data.price.toLocaleString(),
            displayName: blueprint.item_name.replace(/_1s/g, '').replace(/_blueprint/g, '').replace(/_/g, ' '),
            lastKnownPrice: blueprint.data.last_known_price,
            snapping: blueprint.data.snapping,
          });
        });
        materials.data.data
          .concat(materials2.data.data)
          .forEach((material) => {
            data.materials.push({
              name: material.item_name.replace(/_/g, ' '),
              price: material.data.price,
              lastKnownPrice: material.data.last_known_price,
              volume: material.data.volume,
            });
          });
        headgears.data.forEach((headgear) => {
          if (headgear.blueprintAcquire !== 'None') {
            let grandTotal = 0;
            const specialTotal = [];
            const _materials = {
              normal: [],
              special: [],
              missing: false,
            };
            headgear.craftMaterials.split(/;\s|,\s/).forEach((mat) => {
              const quantity = Number(mat.substr(0, mat.indexOf(' ')));
              const name = mat.substr(mat.indexOf(' ') + 1);
              if (data.specialItem.indexOf(name) >= 0) {
                _materials.special.push({
                  name, quantity
                });
                specialTotal.push(`${quantity} ${name}`);
              } else {
                const found = data.materials.find(material => material.name === name.toLowerCase());
                const price = found ? found.price || found.lastKnownPrice || 0 : 0;
                if (!price && !_materials.missing) {
                  _materials.missing = true;
                }
                const total = quantity * price;
                grandTotal += total;
                _materials.normal.push({
                  name, quantity, price, total, volume: found ? found.volume : 0
                });
              }
            });
            const _blueprint = {
              cost: headgear.blueprintCost !== 'N/A' ? headgear.blueprintCost : '',
              tradeable: headgear.blueprintTradeable === 'Yes',
              exchange: 0,
              snapping: false,
            };
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
                _blueprint.exchange = bp.price || bp.lastKnownPrice;
                _blueprint.snapping = bp.snapping >= 0;
                grandTotal += bp.price;
              } else {
                // NOTE: temporary
                data.noData.push(headgear.name);
              }
            } else if (headgear.name === 'Sakura Bride') {
              const value = Number(headgear.blueprintCost);
              grandTotal += value;
              _blueprint.cost = `${value.toLocaleString()}z`;
            } else {
              specialTotal.push(headgear.blueprintCost);
            }

            const craftFee = Number(headgear.craftFee.replace(/[^0-9]/g, ''));
            grandTotal += craftFee;

            const stats = {
              hp: 0,
              atk: 0,
              matk: 0,
              hpz: 0,
              atkz: 0,
              matkz: 0,
            };
            headgear.craftEffect.concat('; ', headgear.depositEffect).split('; ').forEach((effect) => {
              const h = effect.indexOf('Max HP');
              const m = effect.indexOf('M.Atk');
              const a = effect.indexOf('Atk');
              const v = Number(effect.substr(effect.indexOf('+') + 1));
              if (h >= 0) {
                stats.hp += v;
              } else if (m >= 0) {
                stats.matk += v;
              } else if (a >= 0 && m < 0) {
                stats.atk += v;
              }
            });
            stats.hpz = stats.hp > 0 ? Number((grandTotal / stats.hp).toFixed(2)) : 0;
            stats.matkz = stats.matk > 0 ? Number((grandTotal / stats.matk).toFixed(2)) : 0;
            stats.atkz = stats.atk > 0 ? Number((grandTotal / stats.atk).toFixed(2)) : 0;

            data.headgears.push({
              name: headgear.name,
              type: headgear.type,
              effect: {
                main: headgear.mainEffect,
                unlock: headgear.craftEffect,
                deposit: headgear.depositEffect,
              },
              blueprint: _blueprint,
              materials: _materials,
              craftFee,
              total: grandTotal,
              specialTotal: specialTotal.join(' + '),
              stats,
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
          key = 'hp';
          break;
        case 'price-hp-high':
          headgears.sort((a, b) => b.total - a.total);
          key = 'hp';
          break;
        case 'hp-ratio-low':
          headgears.sort((a, b) => a.hpZenyRatio - b.hpZenyRatio);
          key = 'hpz';
          break;
        case 'hp-ratio-high':
          headgears.sort((a, b) => b.hpZenyRatio - a.hpZenyRatio);
          key = 'hpz';
          break;
        case 'patk-ratio-low':
          headgears.sort((a, b) => a.atkZenyRatio - b.atkZenyRatio);
          key = 'atkz';
          break;
        case 'patk-ratio-high':
          headgears.sort((a, b) => b.atkZenyRatio - a.atkZenyRatio);
          key = 'atkz';
          break;
        case 'matk-ratio-low':
          headgears.sort((a, b) => a.matkZenyRatio - b.matkZenyRatio);
          key = 'matkz';
          break;
        case 'matk-ratio-high':
          headgears.sort((a, b) => b.matkZenyRatio - a.matkZenyRatio);
          key = 'matkz';
          break;
        default:
      }
      if (key) {
        const exclude = [];
        const incomplete = [];
        const sorted = [];
        headgears.forEach((headgear) => {
          if (!headgear.stats[key]) {
            exclude.push(headgear);
          } else if (headgear.materials.missing ||
            (!headgear.blueprint.exchange && headgear.blueprint.tradeable)) {
            incomplete.push(headgear);
          } else {
            sorted.push(headgear);
          }
        });
        return sorted.concat(incomplete.concat(exclude));
      }
      return headgears;
    },
  },
};
