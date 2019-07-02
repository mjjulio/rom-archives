/* eslint-disable no-param-reassign */
import axios from 'axios';

export default {
  data() {
    return {
      foods: [],
      filters: {
        name: '',
        station: 'All',
        star: 'All',
        materials: '',
        nutrionalValue: '',
        duration: '',
        discharge: '',
        cookLvl10: '',
        tasteLvl10: '',
      },
      stars: ['All', '✩', '★', '★✩', '★★', '★★✩', '★★★', '★★★✩', '★★★★', '★★★★✩', '★★★★★'],
      stations: ['All', 'Luxury Food Station', 'Adventurous BBQ', 'Pressure Cooker', 'Beverage Stall'],
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
            food.materials = '\u2022 '.concat(food.materials.replace(/,/g, '\n\u2022 '));
          }
          if (food.nutrionalValue) {
            food.nutrionalValue = '\u2022 '.concat(food.nutrionalValue.replace(/,/g, '\n\u2022 '));
          }
          return food;
        });
        data.loading = false;
      });
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
        }

        let filterTasteLvl = food.tasteLvl10.toUpperCase()
          .indexOf(filters.tasteLvl10.toUpperCase()) !== -1;
        if (filters.tasteLvl10.toUpperCase() === 'ATK') {
          filterTasteLvl = food.tasteLvl10.toUpperCase().indexOf('.ATK') === -1 ? filterTasteLvl : false;
        }

        return (filters.name === '' || food.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1)
          && (filters.star === 'All' || food.star === filters.star)
          && (filters.station === 'All' || food.station === filters.station)
          && (filters.materials === '' || food.materials.toUpperCase().indexOf(filters.materials.toUpperCase()) !== -1)
          && (filters.nutritionValue === '' || filterNutrition)
          && (filters.cookLvl10 === '' || filterCookLvl)
          && (filters.tasteLvl10 === '' || filterTasteLvl)
        ;
      });
      return foods;
    },
  },
  methods: {
    resetFilters: function resetFilters() {
      const data = this;
      Object.keys(data.filters).forEach((key) => {
        data.filters[key] = key === 'star' || key === 'station' ? 'All' : '';
      });
    },
  },
};
