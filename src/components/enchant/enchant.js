import axios from 'axios';

export default {
  data() {
    return {
      fourthEnc: [],
      enchantment: {
        weapon: [],
        armor: [],
        garment: [],
        shoes: [],
        accessory: [],
        head: [],
        face: [],
        mouth: [],
        tail: [],
        back: [],
        offhand: [],
      },
      types: ['Weapon', 'Armor', 'Garment', 'Shoes', 'Accessory', 'Head', 'Face', 'Mouth', 'Tail', 'Back', 'Offhand'],
      filters: {
        equipment: 'Weapon',
      },
      checkClass: 'fas fa-check-circle fa-2x text-success',
      timesClass: 'far fa-times-circle text-danger',
      loading: true,
    };
  },
  created() {
    const data = this;
    axios.get('https://api.sheety.co/336bb9ce-825e-4feb-a521-66dfa888ed56')
      .then((response) => {
        response.data.forEach((enc, i) => {
          const keys = Object.keys(data.enchantment);
          keys.forEach((key) => {
            data.enchantment[key].push({
              stat: enc.stat,
              basic: enc[`${key}_Basic`] || '-',
              intermediate: enc[`${key}_Intermediate`] || '-',
              advanced: enc[`${key}_Advanced`] || '-',
            });
          });
          if (i > 33) {
            const index = enc.stat.indexOf('(');
            const temp = {
              stat: enc.stat,
              name: enc.stat.slice(0, index - 1),
              subName: enc.stat.slice(index),
            };
            keys.forEach((key) => {
              temp[key] = !!enc[`${key}_Advanced`];
            });
            data.fourthEnc.push(temp);
          }
        });

        data.loading = false;
      });
  },
  computed: {
    filteredEnchant: function filteredEnchant() {
      return this.enchantment[`${this.filters.equipment.toLowerCase()}`];
    },
  },
};
