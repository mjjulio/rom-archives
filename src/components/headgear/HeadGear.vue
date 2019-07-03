<template>
  <div
    id="headgear"
    class="container">
    <div class="form-group row">
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Name</label>
        <input
          v-model="filters.name"
          :class="{ 'active-filter' : filters.name }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Type</label>
        <select
          v-model="filters.type"
          :class="{ 'active-filter' : filters.type !== 'All' }"
          class="form-control">
          <option
            v-for="(type, index) of types"
            :value="type"
            :key="index">{{ type }}</option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Main Effect</label>
        <input
          v-model="filters.mainEffect"
          :class="{ 'active-filter' : filters.mainEffect }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Unlock Effect</label>
        <input
          v-model="filters.craftEffect"
          :class="{ 'active-filter' : filters.craftEffect }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Deposit Effect</label>
        <input
          v-model="filters.depositEffect"
          :class="{ 'active-filter' : filters.depositEffect }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Notes</label>
        <input
          v-model="filters.notes"
          :class="{ 'active-filter' : filters.notes }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Blueprint Source</label>
        <input
          v-model="filters.blueprintAcquire"
          :class="{ 'active-filter' : filters.blueprintAcquire }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Blueprint Tradeable</label>
        <select
          v-model="filters.blueprintTradeable"
          :class="{ 'active-filter' : filters.blueprintTradeable !== 'All' }"
          class="form-control">
          <option
            v-for="(trade, index) of tradeable"
            :value="trade"
            :key="index">{{ trade }}</option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Crafting Material</label>
        <input
          v-model="filters.craftMaterials"
          :class="{ 'active-filter' : filters.craftMaterials }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label for="usr">Headwear Source</label>
        <input
          v-model="filters.headgearAcquire"
          :class="{ 'active-filter' : filters.headgearAcquire }"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>Headwear Tradeable</label>
        <select
          v-model="filters.headgearTradeable"
          :class="{ 'active-filter' : filters.headgearTradeable !== 'All' }"
          class="form-control">
          <option
            v-for="(trade, index) of tradeable"
            :value="trade"
            :key="index">{{ trade }}</option>
        </select>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-6">
        <label>&nbsp;</label>
        <button
          type="button"
          class="form-control btn btn-primary"
          @click="resetFilters()">
          Reset
        </button>
      </div>
    </div>
    <hr>
    <table class="table table-striped table-bordered ">
      <tr>
        <th style="width:165px">Name</th>
        <!-- <th style="width:65px">Type</th> -->
        <th style="width:150px">Main Effect</th>
        <th style="width:110px">Unlock</th>
        <th style="width:110px">Deposit</th>
        <th style="width:150px">Blueprint</th>
        <th style="width:150px">Crafting</th>
        <th style="width:150px">Headwear<br><span class="small">(Ready-to-Wear)</span></th>
        <th style="width:150px">Notes</th>
      </tr>
      <tr v-if="loading">
        <td
          class="text-center"
          colspan="8">
          <div class="loading"><img src="@/assets/loading.gif"></div>
        </td>
      </tr>
      <tr v-if="!loading && !filteredHeadgears.length">
        <td
          class="text-center"
          colspan="8">No results found</td>
      </tr>
      <!-- <tr v-if="!filteredHeadgears.length">
        <td colspan="9" class="text-center">No Results Found</td>
      </tr> -->
      <tr
        v-for="(headwear, index) of filteredHeadgears"
        :key="index">
        <td class="headgear-name">
          <p><strong>{{ headwear.name }}</strong></p>
          <p>
            <span class="text-info">Type:</span> {{ headwear.type }}
          </p>
        </td>
        <!-- <td>{{ headwear.type }}</td> -->
        <td>{{ headwear.mainEffect }}</td>
        <td>{{ headwear.craftEffect }}</td>
        <td>{{ headwear.depositEffect }}</td>
        <td>
          <div v-if="headwear.blueprintAcquire !== 'None'">
            <p><span class="text-info">Source:</span><br>{{ headwear.blueprintAcquire }}</p>
            <p><span class="text-info">Cost:</span> {{ headwear.blueprintCost }}</p>
            <p><span class="text-info">Tradeable:</span> {{ headwear.blueprintTradeable }}</p>
          </div>
          <div v-else>{{ headwear.blueprintAcquire }}</div>
        </td>
        <td>
          <div v-if="headwear.craftMaterials !== 'N/A'">
            <p><span class="text-info">Materials:</span><br>{{ headwear.craftMaterials }}</p>
            <p><span class="text-info">Fee:</span> {{ headwear.craftFee }}</p>
          </div>
          <div v-else>{{ headwear.craftMaterials }}</div>
        </td>
        <td>
          <div v-if="headwear.headgearAcquire !== 'None'">
            <p><span class="text-info">Source:</span><br>{{ headwear.headgearAcquire }}</p>
            <p>
              <span class="text-info">Cost:</span>
              <br v-if="headwear.headgearNpcPrice !== 'N/A'">{{ headwear.headgearNpcPrice }}
            </p>
          </div>
          <p v-else><span class="text-info">Source:</span> {{ headwear.headgearAcquire }}</p>
          <p><span class="text-info">Tradeable:</span> {{ headwear.headgearTradeable }}</p>
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
    padding: 0.4rem;
    white-space: pre-line;
    word-break: break-word;
  }
  .form-group label {
    font-weight: 700;
  }
  .loading {
    overflow: hidden;
    height: 30px;
  }
  .loading img {
    margin-top: -135px;
  }
</style>
