/* eslint-disable no-param-reassign */
import axios from 'axios';

export default {
  data() {
    return {
      foods: [],
      storage: {
        cook: [],
        taste: [],
      },
      filters: {
        name: '',
        station: '—',
        star: '—',
        materials: '',
        nutrionalValue: '',
        duration: '',
        discharge: '',
        cookLvl10: '—',
        tasteLvl10: '—',
      },
      stars: ['—', '✩', '★', '★✩', '★★', '★★✩', '★★★', '★★★✩', '★★★★', '★★★★✩', '★★★★★'],
      stations: ['—', 'Luxury Food Station', 'Adventurous BBQ', 'Pressure Cooker', 'Beverage Stall'],
      stats: ['—', 'Atk', 'M.Atk', 'Def', 'M.Def', 'Max HP', 'Max SP'],
      showBackToTop: false,
      loading: true,
    };
  },
  created() {
    const data = this;
    axios.get('https://api.sheety.co/02b23648-063a-404f-9444-05ca6c2e4232')
      .then((response) => {
        data.foods = response.data.map((food) => {
          if (food.materials) {
            food.ingredients = food.materials.split(', ');
          }
          if (food.nutrionalValue) {
            food.effects = food.nutrionalValue.split(', ');
          }
          food.cook = 0;
          food.taste = 0;
          return food;
        });
        data.loading = false;

        if (localStorage.getItem('cooking')) {
          data.storage = JSON.parse(localStorage.getItem('cooking'));
          data.storage.cook.forEach((item) => {
            const i = data.foods.findIndex(food => food.id === item);
            if (i >= 0) {
              this.foods[i].cook = 1;
            }
          });
        }
      });
  },
  beforeDestroy() {
    localStorage.setItem('cooking', JSON.stringify(this.storage));
  },
  computed: {
    filteredFood: function filteredFood() {
      const filters = this.filters;
      const foods = this.foods.filter((food) => {
        let filterNutrition = food.nutrionalValue.toUpperCase()
          .indexOf(filters.nutrionalValue.toUpperCase()) !== -1;
        if (filters.nutrionalValue.toUpperCase() === 'ATK') {
          filterNutrition = food.nutrionalValue.toUpperCase().indexOf(' ATK ') > -1 ? filterNutrition : false;
        }

        let filterCookLvl = food.cookLvl10.toUpperCase()
          .indexOf(filters.cookLvl10.toUpperCase()) !== -1;
        if (filters.cookLvl10.toUpperCase() === 'ATK') {
          filterCookLvl = food.cookLvl10.toUpperCase().indexOf('.ATK') === -1 ? filterCookLvl : false;
        } else if (filters.cookLvl10.toUpperCase() === 'DEF') {
          filterCookLvl = food.cookLvl10.toUpperCase().indexOf('.DEF') === -1 ? filterCookLvl : false;
        }

        let filterTasteLvl = food.tasteLvl10.toUpperCase()
          .indexOf(filters.tasteLvl10.toUpperCase()) !== -1;
        if (filters.tasteLvl10.toUpperCase() === 'ATK') {
          filterTasteLvl = food.tasteLvl10.toUpperCase().indexOf('.ATK') === -1 ? filterTasteLvl : false;
        } else if (filters.tasteLvl10.toUpperCase() === 'DEF') {
          filterTasteLvl = food.tasteLvl10.toUpperCase().indexOf('.DEF') === -1 ? filterTasteLvl : false;
        }

        return (filters.name === '' || food.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1)
          && (filters.star === '—' || food.star === filters.star)
          && (filters.station === '—' || food.station === filters.station)
          && (filters.materials === '' || food.materials.toUpperCase().indexOf(filters.materials.toUpperCase()) !== -1)
          && (filters.nutritionValue === '' || filterNutrition)
          && (filters.cookLvl10 === '—' || filterCookLvl)
          && (filters.tasteLvl10 === '—' || filterTasteLvl)
        ;
      });
      return foods;
    },
  },
  methods: {
    resetFilters: function resetFilters() {
      const data = this;
      Object.keys(data.filters).forEach((key) => {
        data.filters[key] = key === 'star' || key === 'station'
          || key === 'cookLvl10' || key === 'tasteLvl10' ? '—' : '';
      });
    },
  },
};
