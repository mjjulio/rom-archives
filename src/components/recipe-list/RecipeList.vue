<template>
  <div
    id="recipe-list"
    class="container">
    <h3 class="pt-5">Cooking Recipe - List</h3>
    <hr>
    <div
      class="form-group row">
      <!-- style="width: 75%; margin: 0 auto 1rem;"> -->
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Name</label>
        <input
          v-model="filters.name"
          :class="{ 'active-filter' : filters.name }"
          type="text"
          class="form-control">
      </div>
      <!-- <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Ingredients</label>
        <input
          v-model="filters.materials"
          :class="{ 'active-filter' : filters.materials }"
          type="text"
          class="form-control">
      </div> -->
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Effect</label>
        <input
          v-model="filters.nutrionalValue"
          :class="{ 'active-filter' : filters.nutrionalValue }"
          type="text"
          class="form-control">
      </div>
      <!-- <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Cook Lv10</label>
        <input
          v-model="filters.cookLvl10"
          :class="{ 'active-filter' : filters.cookLvl10 }"
          type="text"
          class="form-control">
      </div> -->
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Cook Lv10</label>
        <select
          v-model="filters.cookLvl10"
          :class="{ 'active-filter' : filters.cookLvl10 !== '—' }"
          class="form-control">
          <option
            v-for="(stat, index) of stats"
            :value="stat"
            :key="index">
            {{ stat }}
          </option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Taste Lv10</label>
        <select
          v-model="filters.tasteLvl10"
          :class="{ 'active-filter' : filters.tasteLvl10 !== '—' }"
          class="form-control">
          <option
            v-for="(stat, index) of stats"
            :value="stat"
            :key="index">
            {{ stat }}
          </option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Star</label>
        <select
          v-model="filters.star"
          :class="{ 'active-filter' : filters.star !== '—' }"
          class="form-control">
          <option
            v-for="(star, index) of stars"
            :value="star"
            :key="index">
            {{ star }}
          </option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Station</label>
        <select
          v-model="filters.station"
          :class="{ 'active-filter' : filters.station !== '—' }"
          class="form-control">
          <option
            v-for="(station, index) of stations"
            :value="station"
            :key="index">
            {{ station }}
          </option>
        </select>
      </div>
      <!-- <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Taste Lv10</label>
        <input
          v-model="filters.tasteLvl10"
          :class="{ 'active-filter' : filters.tasteLvl10 }"
          type="text"
          class="form-control">
      </div> -->
      <!-- <div class="col-md-3 col-sm-3 col-xs-6">
        <label>&nbsp;</label>
        <button
          type="button"
          class="form-control btn btn-primary"
          @click="resetFilters()">
          Reset
        </button>
      </div> -->
    </div>
    <div class="row">
      <div
        v-for="(food, index) in filteredFood"
        :key="index"
        class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
        <div class="card">
          <div class="card-header">
            {{ food.name }}<br>
            <sup class="title">
              <strong class="text-darkorange">{{ food.star }}</strong>
              &#8231;
              <span class="text-muted">{{ food.station }}</span>
            </sup>
          </div>
          <div class="card-body">
            <p class="card-text">
              <ul class="card-text list">
                <li
                  v-for="(effect, index) of food.effects"
                  :key="index">{{ effect }}</li>
              </ul>
            </p>
            <div class="clearfix">
              <div class="float-left w-50">
                <p>
                  <span class="title text-primary">Ingredients:</span>
                  <br>
                  <ul class="card-text list">
                    <li
                      v-for="(ingredient, index) of food.ingredients"
                      :key="index">{{ ingredient }}</li>
                  </ul>
                </p>
              </div>
              <div class="float-left w-50">
                <p>
                  <span class="title text-primary">Duration:</span>
                  <br>{{ food.duration }}
                </p>
                <p>
                  <span class="title text-primary">Discharge:</span>
                  <br>{{ food.discharge }}
                </p>
              </div>
            </div>
            <p class="card-text">
              <b-form-checkbox
                v-model="storage.cook"
                :value="food.id">
                <span class="title text-info">Cook Lv10:</span>
                &nbsp;{{ food.cookLvl10 }}
              </b-form-checkbox>
            </p>
            <p class="card-text">
              <b-form-checkbox
                v-model="storage.taste"
                :value="food.id">
                <span class="title text-info">Taste Lv10:</span>
                &nbsp;{{ food.tasteLvl10 }}
              </b-form-checkbox>
            </p>
          </div>
        </div>
      </div>
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
.text-purple {
  color: darkorchid;
}
.text-indianred {
  color: indianred;
}
.text-darkorange {
  color: darkorange;
}
.card .title {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
}
.card-body, .card-header {
  font-family: 'Andika', Helvetica, Arial, sans-serif;
}
.card-body ul.list {
  padding-inline-start: 1rem;
  margin-block-end: 0.5rem;
}
.card-header {
  padding: 0.5rem 1rem 0.25rem;
  font-weight: bold;
}
.card-body {
  color: #4d4d4d;
  padding: 1rem;
  font-size: 0.875rem;
  /* white-space: pre-line; */
  /* word-break: break-word; */
}
#recipe-list >>> .custom-control-input:checked ~ .custom-control-label::before {
  color: #17a2b8 !important;
}
</style>
