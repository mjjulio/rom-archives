/* eslint-disable no-param-reassign */
import axios from 'axios';

export default {
  data() {
    return {
      headgears: [],
      filters: {
        name: '',
        type: 'All',
        mainEffect: '',
        craftEffect: '',
        depositEffect: '',
        blueprintAcquire: '',
        blueprintTradeable: 'All',
        craftMaterials: '',
        headgearAcquire: '',
        headgearTradeable: '',
        notes: '',
      },
      types: ['All', 'Head', 'Face', 'Mouth', 'Tail', 'Back', 'Costume'],
      tradeable: ['All', 'Yes', 'No'],
      loading: true,
      showBackToTop: false,
    };
  },
  created() {
    const data = this;
    axios.get('https://api.sheety.co/398a7c79-ed83-479b-a3bd-24f1ff03633f')
      .then((response) => {
        data.headgears = response.data;
        data.headgears.map((headgear) => {
          if (headgear.mainEffect && headgear.mainEffect !== 'None') {
            headgear.mainEffect = '\u2022 '.concat(headgear.mainEffect.replace(/;/g, '\n\u2022 '));
          }
          if (headgear.depositEffect && headgear.depositEffect !== 'None') {
            headgear.depositEffect = '\u2022 '.concat(headgear.depositEffect.replace(/;/g, '\n\u2022 '));
          }
          if (headgear.craftEffect && headgear.craftEffect !== 'None') {
            headgear.craftEffect = '\u2022 '.concat(headgear.craftEffect.replace(/;/g, '\n\u2022 '));
          }
          if (headgear.blueprintAcquire && headgear.blueprintAcquire !== 'None') {
            headgear.blueprintAcquire = '\u2022 '.concat(headgear.blueprintAcquire.replace(/;/g, '\n\u2022 '));
          }
          if (headgear.craftMaterials && headgear.craftMaterials !== 'N/A') {
            headgear.craftMaterials = '\u25E6 '.concat(headgear.craftMaterials.replace(/,/g, '\n\u25E6 '));
          }
          if (headgear.headgearAcquire && headgear.headgearAcquire !== 'None') {
            headgear.headgearAcquire = '\u2022 '.concat(headgear.headgearAcquire.replace(/;/g, '\n\u2022 '));
          }
          if (headgear.headgearNpcPrice && headgear.headgearNpcPrice !== 'N/A') {
            headgear.headgearNpcPrice = '\u2022 '.concat(headgear.headgearNpcPrice.replace(/;/g, '\n\u2022 '));
          }
          return headgear;
        });
        data.loading = false;
      });
  },
  destroyed() {

  },
  computed: {
    filteredHeadgears: function filteredHeadgears() {
      const filters = this.filters;
      const headgears = this.headgears.filter((headgear) => {
        let filterMainEffect = headgear.mainEffect.toUpperCase()
          .indexOf(filters.mainEffect.toUpperCase()) !== -1;
        if (filters.mainEffect.toUpperCase() === 'ATK') {
          filterMainEffect = (filters.mainEffect.toUpperCase() === 'ATK')
            && headgear.mainEffect.toUpperCase().indexOf(' ATK ') > -1 ? filterMainEffect : false;
        }
        let filterCraftEffect = headgear.craftEffect.toUpperCase()
          .indexOf(filters.craftEffect.toUpperCase()) !== -1;
        if (filters.craftEffect.toUpperCase() === 'ATK') {
          filterCraftEffect = headgear.craftEffect.toUpperCase().indexOf(' ATK ') > -1 ? filterCraftEffect : false;
        }
        let filterDepositEffect = headgear.depositEffect.toUpperCase()
          .indexOf(filters.depositEffect.toUpperCase()) !== -1;
        if (filters.depositEffect.toUpperCase() === 'ATK') {
          filterDepositEffect = headgear.depositEffect.toUpperCase().indexOf(' ATK ') > -1 ? filterDepositEffect : false;
        }
        return (filters.name === '' || headgear.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1)
          && (filters.type.toUpperCase() === 'ALL' || headgear.type.toUpperCase().indexOf(filters.type.toUpperCase()) !== -1)
          && (filters.mainEffect === '' || filterMainEffect)
          && (filters.craftEffect === '' || filterCraftEffect)
          && (filters.depositEffect === '' || filterDepositEffect)
          && (filters.blueprintAcquire === '' || headgear.blueprintAcquire.toUpperCase().indexOf(filters.blueprintAcquire.toUpperCase()) !== -1)
          && (filters.blueprintTradeable.toUpperCase() === 'ALL' || headgear.blueprintTradeable.toUpperCase().indexOf(filters.blueprintTradeable.toUpperCase()) !== -1)
          && (filters.craftMaterials === '' || headgear.craftMaterials.toUpperCase().indexOf(filters.craftMaterials.toUpperCase()) !== -1)
          && (filters.headgearAcquire === '' || headgear.headgearAcquire.toUpperCase().indexOf(filters.headgearAcquire.toUpperCase()) !== -1)
          && (filters.headgearTradeable.toUpperCase() === 'ALL' || headgear.headgearTradeable.toUpperCase().indexOf(filters.headgearTradeable.toUpperCase()) !== -1)
          && (filters.notes === '' || (headgear.notes && headgear.notes.toUpperCase().indexOf(filters.notes.toUpperCase()) !== -1))
        ;
      });
      return headgears;
    },
  },
  methods: {
    resetFilters: function resetFilters() {
      const data = this;
      Object.keys(data.filters).forEach((key) => {
        data.filters[key] = key === 'type' || key === 'blueprintTradeable' || key === 'headgearTradeable' ? 'All' : '';
      });
    },
  },
};
