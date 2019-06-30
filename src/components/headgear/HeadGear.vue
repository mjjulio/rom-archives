<template>
  <div id="headgear" class="container">
    <div class="form-group row">
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Name</label>
        <input type="text" class="form-control" v-model="filters.name" v-bind:class="{ 'active-filter' : filters.name }">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Type</label>
        <select class="form-control" v-model="filters.type" v-bind:class="{ 'active-filter' : filters.type !== 'All' }">
          <option v-for="(type, index) of types" v-bind:value="type" :key="index">{{ type }}</option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Main Effect</label>
        <input type="text" class="form-control" v-model="filters.mainEffect" v-bind:class="{ 'active-filter' : filters.mainEffect }">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Unlock Effect</label>
        <input type="text" class="form-control" v-model="filters.craftEffect" v-bind:class="{ 'active-filter' : filters.craftEffect }">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Deposit Effect</label>
        <input type="text" class="form-control" v-model="filters.depositEffect" v-bind:class="{ 'active-filter' : filters.depositEffect }">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
				<label for="usr">Notes</label>
				<input type="text" class="form-control" v-model="filters.notes" v-bind:class="{ 'active-filter' : filters.notes }">
			</div>
			<div class="col-md-2 col-sm-2 col-xs-6">
				<label for="usr">Blueprint Source</label>
				<input type="text" class="form-control" v-model="filters.blueprintAcquire" v-bind:class="{ 'active-filter' : filters.blueprintAcquire }">
			</div>
			<div class="col-md-2 col-sm-2 col-xs-6">
        <label>Blueprint Tradeable</label>
        <select class="form-control" v-model="filters.blueprintTradeable" v-bind:class="{ 'active-filter' : filters.blueprintTradeable !== 'All' }">
          <option v-for="(trade, index) of tradeable" v-bind:value="trade" :key="index">{{ trade }}</option>
        </select>
      </div>
			<div class="col-md-2 col-sm-2 col-xs-6">
				<label for="usr">Crafting Material</label>
				<input type="text" class="form-control" v-model="filters.craftMaterials" v-bind:class="{ 'active-filter' : filters.craftMaterials }">
			</div>
			<div class="col-md-2 col-sm-2 col-xs-6">
				<label for="usr">Headwear Source</label>
				<input type="text" class="form-control" v-model="filters.headgearAcquire" v-bind:class="{ 'active-filter' : filters.headgearAcquire }">
			</div>
			<div class="col-md-2 col-sm-2 col-xs-6">
        <label>Headwear Tradeable</label>
        <select class="form-control" v-model="filters.headgearTradeable" v-bind:class="{ 'active-filter' : filters.headgearTradeable !== 'All' }">
          <option v-for="(trade, index) of tradeable" v-bind:value="trade" :key="index">{{ trade }}</option>
        </select>
      </div>
			<div class="col-md-2 col-sm-2 col-xs-6">
				<label>Reset</label>
				<button type="button" class="form-control btn btn-primary" @click="resetFilters()">
					<i class="glyphicon glyphicon-refresh"></i>
				</button>
			</div>
		</div>
		<hr>
			<table class="table table-striped table-bordered ">
				<tr>
					<th style="width:120px">Name</th>
					<th style="width:65px">Type</th>
					<th style="width:150px">Main Effect</th>
					<th style="width:100px">Unlock</th>
					<th style="width:100px">Deposit</th>
					<th style="width:150px">Blueprint</th>
					<th style="width:150px">Crafting</th>
					<th style="width:150px">Headwear<br><span class="small">(Ready-to-Wear)</span></th>
					<th style="width:150px">Notes</th>
				</tr>
				<!-- <tr v-if="!filteredHeadgears.length">
					<td colspan="9" class="text-center">No Results Found</td>
				</tr> -->
				<tr v-for="(headwear, index) of filteredHeadgears" :key="index">
					<td class="headgear-name">
						<strong>{{ headwear.name }}</strong>
					</td>
					<td>{{ headwear.type }}</td>
					<td>{{ headwear.mainEffect }}</td>
					<td>{{ headwear.craftEffect }}</td>
					<td>{{ headwear.depositEffect }}</td>
					<td>
						<div v-if="headwear.blueprintAcquire !== 'None'">
							<p><strong>Source:</strong><br>{{ headwear.blueprintAcquire }}</p>
							<p><strong>Cost:</strong> {{ headwear.blueprintCost }}</p>
							<p><strong>Tradeable:</strong> {{ headwear.blueprintTradeable }}</p>
						</div>
						<div v-else>{{ headwear.blueprintAcquire }}</div>
					</td>
					<td>
						<div v-if="headwear.craftMaterials !== 'N/A'">
							<p><strong>Materials:</strong><br>{{ headwear.craftMaterials }}</p>
							<p><strong>Fee:</strong> {{ headwear.craftFee }}</p>
						</div>
						<div v-else>{{ headwear.craftMaterials }}</div>
					</td>
					<td>
						<div v-if="headwear.headgearAcquire !== 'None'">
							<p><strong>Source:</strong><br>{{ headwear.headgearAcquire }}</p>
							<p><strong>Cost:</strong> <br v-if="headwear.headgearNpcPrice !== 'N/A'">{{ headwear.headgearNpcPrice }}</p>
						</div>
						<p v-else><strong>Source:</strong> {{ headwear.headgearAcquire }}</p>
						<p><strong>Tradeable:</strong> {{ headwear.headgearTradeable }}</p>
					</td>
					<td>{{ headwear.notes }}</td>
				</tr>
			</table>
  </div>
</template>
<script src="./headgear.js"></script>
<style scoped>
  * {
    font-size: 0.875rem;
  }
  p {
    margin-bottom: 0.25rem;
  }
  .table tr th {
    text-align: center;
    vertical-align: middle;
    position: sticky;
    top: 57px;
    color: #fff;
    background-color: cornflowerblue;
  }
  .table tr,
  .table td {
    padding: 0.5rem;
    white-space: pre-line;
    word-break: break-word;
  }
  .form-group label {
    font-weight: 700;
  }
</style>