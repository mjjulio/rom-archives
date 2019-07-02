<template>
  <div id="recipe-list" class="container">
		<div class="form-group row" style="width: 75%; margin: 0 auto;">
			<div class="col-md-3 col-sm-3 col-xs-6">
				<label for="usr">Name</label>
				<input type="text" class="form-control" v-model="filters.name" 
          v-bind:class="{ 'active-filter' : filters.name }">
			</div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>Station</label>
        <select class="form-control" v-model="filters.station" 
          v-bind:class="{ 'active-filter' : filters.station !== 'All' }">
          <option v-for="(station, index) of stations" v-bind:value="station" :key="index">
            {{ station }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>Star</label>
        <select class="form-control" v-model="filters.star" 
          v-bind:class="{ 'active-filter' : filters.star !== 'All' }">
          <option v-for="(star, index) of stars" v-bind:value="star" :key="index">
            {{ star }}
          </option>
        </select>
      </div>
			<div class="col-md-3 col-sm-3 col-xs-6">
				<label for="usr">Ingredients</label>
				<input type="text" class="form-control" v-model="filters.materials" v-bind:class="{ 'active-filter' : filters.materials }">
			</div>
			<div class="col-md-3 col-sm-3 col-xs-6">
				<label for="usr">Nutrional Value</label>
				<input type="text" class="form-control" v-model="filters.nutrionalValue" v-bind:class="{ 'active-filter' : filters.nutrionalValue }">
			</div>
			<div class="col-md-3 col-sm-3 col-xs-6">
				<label for="usr">Cook Lvl10</label>
				<input type="text" class="form-control" v-model="filters.cookLvl10" v-bind:class="{ 'active-filter' : filters.cookLvl10 }">
			</div>
			<div class="col-md-3 col-sm-3 col-xs-6">
				<label for="usr">Taste Lvl10</label>
				<input type="text" class="form-control" v-model="filters.tasteLvl10" v-bind:class="{ 'active-filter' : filters.tasteLvl10 }">
			</div>
			<div class="col-md-3 col-sm-3 col-xs-6">
				<label>&nbsp;</label>
				<button type="button" class="form-control btn btn-primary" @click="resetFilters()">
					Reset
				</button>
			</div>
		</div>
		<hr>
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
					<td class="text-center" colspan="7">
						<div class="loading"><img src="@/assets/loading.gif"></div>
					</td>
				</tr>
				<tr v-if="!loading && !filteredFood.length">
					<td class="text-center" colspan="7">No results found</td>
				</tr>
				<tr v-for="(food, index) in filteredFood" :key="index">
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
  * {
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
  .loading {
    overflow: hidden;
    height: 30px;
  }
  .loading img {
    margin-top: -135px;
  }
</style>