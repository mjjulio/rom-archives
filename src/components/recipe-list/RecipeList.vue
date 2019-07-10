<template>
  <div
    id="recipe-list"
    class="container">
		<h3 class="pt-5">Recipe - List</h3>
    <hr>
    <div
      class="form-group row"
      style="width: 75%; margin: 0 auto 1rem;">
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Name</label>
        <input
          v-model="filters.name"
          :class="{ 'active-filter' : filters.name }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>Station</label>
        <select
          v-model="filters.station"
          :class="{ 'active-filter' : filters.station !== 'All' }"
          class="form-control">
          <option
            v-for="(station, index) of stations"
            :value="station"
            :key="index">
            {{ station }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>Star</label>
        <select
          v-model="filters.star"
          :class="{ 'active-filter' : filters.star !== 'All' }"
          class="form-control">
          <option
            v-for="(star, index) of stars"
            :value="star"
            :key="index">
            {{ star }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Ingredients</label>
        <input
          v-model="filters.materials"
          :class="{ 'active-filter' : filters.materials }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Nutrional Value</label>
        <input
          v-model="filters.nutrionalValue"
          :class="{ 'active-filter' : filters.nutrionalValue }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Cook Lvl10</label>
        <input
          v-model="filters.cookLvl10"
          :class="{ 'active-filter' : filters.cookLvl10 }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Taste Lvl10</label>
        <input
          v-model="filters.tasteLvl10"
          :class="{ 'active-filter' : filters.tasteLvl10 }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>&nbsp;</label>
        <button
          type="button"
          class="form-control btn btn-primary"
          @click="resetFilters()">
          Reset
        </button>
      </div>
    </div>
    <div>
      <table class="table table-striped table-bordered ">
        <tr class="info">
          <th style="width: 160px">Name</th>
          <th style="width: 140px">Station</th>
          <th style="width: 70px">Star</th>
          <th style="width: 185px">Ingredients</th>
          <th style="width: 290px">Nutrional Value</th>
          <th style="width: 120px">Cook Lvl10</th>
          <th style="width: 120px">Taste Lvl10</th>
        </tr>
        <tr v-if="loading">
          <td
            class="text-center"
            colspan="7">
            <div class="loading"><img src="@/assets/loading.gif"></div>
          </td>
        </tr>
        <tr v-if="!loading && !filteredFood.length">
          <td
            class="text-center"
            colspan="7">No results found</td>
        </tr>
        <tr
          v-for="(food, index) in filteredFood"
          :key="index">
          <td>
            <strong>{{ food.name }}</strong>
          </td>
          <td>{{ food.station }}</td>
          <td class="text-center">{{ food.star }}</td>
          <td>{{ food.materials }}</td>
          <td>
            <p>{{ food.nutrionalValue }}</p>
            <p>
              <i>
                <span class="text-info">Duration:</span> {{ food.duration }}
                <span class="text-info">Discharge:</span> {{ food.discharge }}
              </i>
            </p>
          </td>
          <td>{{ food.cookLvl10 }}</td>
          <td>{{ food.tasteLvl10 }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script src="./recipe-list.js"></script>
<style scoped>
  .table, .form-group {
    font-size: 0.875rem;
  }
  p, .form-control {
    margin-bottom: 0.25rem;
  }
  .table tr th {
    text-align: center;
    vertical-align: middle;
    position: sticky;
    top: 57px;
    color: #fff;
    background-color: cornflowerblue;
    letter-spacing: 0.05rem;
  }
  .table tr,
  .table td {
    padding: 0.4rem;
    white-space: pre-line;
    word-break: break-word;
  }
  .form-group label {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
</style>
