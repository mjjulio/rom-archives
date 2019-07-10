<template>
  <div
    id="craft-zeny"
    class="container">
    <h3 class="pt-5">Headgears - Calculated Crafting Cost</h3>
    <hr>
    <div class="form-group row">
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>Name</label>
        <input
          v-model="filters.name"
          type="text"
          class="form-control">
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label>Sort By:</label>
        <select
          v-model="filters.sort"
          class="form-control">
          <option
            v-for="(sort, index) of sortOptions"
            :value="sort.value"
            :key="index">
            {{ sort.name }}
          </option>
        </select>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 flex-align-bottom">
        <span class="text-info italic">
          * Exchange prices powered by <a href="https://poporing.life">Poporing Life</a>
        </span>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <tr>
        <th style="width: 35%">Headgear</th>
        <th style="width: 35%">Cost Breakdown</th>
        <th style="width: 30%">Total Cost</th>
      </tr>
      <tr v-if="loading">
        <td
          class="text-center"
          colspan="3">
          <div class="loading"><img src="@/assets/loading.gif"></div>
        </td>
      </tr>
      <tr v-if="!loading && !modifiedList.length">
        <td
          class="text-center"
          colspan="3">No results found</td>
      </tr>
      <tr
        v-for="(headgear, index) in modifiedList"
        :key="index">
        <td>
          <p><strong>{{ headgear.name }}</strong></p>
          <p>{{ headgear.mainEffect }}</p>
          <br>
          <p><span class="text-info">Unlock:</span>&nbsp;&nbsp;{{ headgear.unlockEffect }}</p>
          <p><span class="text-info">Deposit:</span>&nbsp;&nbsp;{{ headgear.depositEffect }}</p>
        </td>
        <td>
          <p>
            <span class="text-info">Materials:</span><br>
            <table class="table table-condensed">
              <tr class="text-center text-muted">
                <td>Name</td>
                <td>Qty</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
              <tr
                v-for="(material, index) in headgear.materials.normal"
                :key="index">
                <td>{{ material.name }}</td>
                <td class="text-right">{{ material.quantity }}</td>
                <td class="text-right">{{ material.price.toLocaleString() }}z</td>
                <td class="text-right">{{ material.total.toLocaleString() }}z</td>
              </tr>
              <tr
                v-for="(material, index) in headgear.materials.special"
                :key="index">
                <td>{{ material.name }}</td>
                <td class="text-right">{{ material.quantity }}</td>
                <td/>
                <td/>
              </tr>
            </table>
            <!-- <span v-for="material in headgear.materials.normal" :key="material">
              &nbsp;&nbsp;&bull; {{ material.quantity }} {{ material.name }}&nbsp;
              <span v-if="material.total">[{{ material.price.toLocaleString() }}z]
                = {{ material.total.toLocaleString() }}z</span>
              <span v-else>[<span class="text-danger">NO DATA</span>]</span>
              <br>
            </span>
            <span v-for="material in headgear.materials.special" :key="material">
              &nbsp;&nbsp;&bull; {{ material }}
            </span> -->
          </p>
          <p>
            <span class="text-info">Blueprint:</span><br>
            &nbsp;&nbsp;&bull; <span class="text-info">Exchange Price:</span>&nbsp;
            <span v-if="headgear.blueprintTradeable === 'No'"><i>non-tradeable</i></span>
            <span v-else-if="headgear.bpExchangePrice > 0">
              {{ headgear.bpExchangePrice.toLocaleString() }}z
            </span>
            <span
              v-else
              class="text-danger">NO DATA</span>
            <br>
            &nbsp;&nbsp;&bull; <span class="text-info">NPC Price:</span>&nbsp;
            {{ headgear.blueprintCost }}<br>
          </p>
          <p>
            <span class="text-info">Craft Fee:</span>&nbsp;
            <span v-if="headgear.craftFee">{{ headgear.craftFee.toLocaleString() }}z</span>
            <span
              v-else
              class="text-danger">NO DATA</span>
          </p>
        </td>
        <td>
          <div v-if="headgear.blueprintTradeable === 'No'">
            <strong>
              {{ headgear.total.toLocaleString() }}z
              <span v-if="headgear.name !== 'Sakura Bride'">+ {{ headgear.blueprintCost }}</span>
              <span
                v-for="(material, index) in headgear.materials.special"
                :key="index">
                + {{ material.quantity }} {{ material.name }}
              </span>
            </strong>
            <span v-if="headgear.materials.missing">
              <br><i class="text-danger">*lacking material price</i>
            </span>
            <span v-if="!headgear.craftFee">
              <br><i class="text-danger">*lacking craft fee</i>
            </span>
          </div>
          <div v-else>
            <p>
              <strong>
                {{ headgear.total.toLocaleString() }}z
                <span
                  v-for="(material, index) in headgear.materials.special"
                  :key="index">
                  + {{ material.quantity }} {{ material.name }}
                </span>
              </strong>
              <span v-if="headgear.bpExchangePrice === 0">
                <br><i class="text-danger">*lacking blueprint price</i>
              </span>
              <span v-if="headgear.materials.missing">
                <br><i class="text-danger">*lacking material price</i>
              </span>
              <span v-if="!headgear.craftFee">
                <br><i class="text-danger">*lacking craft fee</i>
              </span>
            </p>
            <div v-if="headgear.blueprintCost !== 'N/A'">
              <p><i>-or-</i></p>
              <p>
                {{ (headgear.total - headgear.bpExchangePrice).toLocaleString() }}z
                + {{ headgear.blueprintCost }}
                <span
                  v-for="(material, index) in headgear.materials.special"
                  :key="index"> + {{ material }}</span>
              </p>
            </div>
          </div>
          <br>
          <p>
            <span :class="{ 'highlight' : (filters.sort.indexOf('patk') >= 0) }">
              <span class="text-info">Zeny/ATK Ratio:</span>&nbsp;
              {{ headgear.atkZenyRatio.toLocaleString() }}z
              <span class="text-muted">[ATK +{{ headgear.atk }}]</span>
            </span>
          </p>
          <p>
            <span :class="{ 'highlight' : (filters.sort.indexOf('matk') >= 0) }">
              <span class="text-info">Zeny/MATK Ratio:</span>&nbsp;
              {{ headgear.matkZenyRatio.toLocaleString() }}z
              <span class="text-muted">[M.ATK +{{ headgear.matk }}]</span>
            </span>
          </p>
          <p>
            <span :class="{ 'highlight' : (filters.sort.indexOf('hp') >= 0) }">
              <span class="text-info">Zeny/HP Ratio:</span>&nbsp;
              {{ headgear.hpZenyRatio.toLocaleString() }}z
              <span class="text-muted">[Max HP +{{ headgear.maxHP }}]</span>
            </span>
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="./craft-zeny.js"></script>
<!-- styling for the component -->
<style scoped>
  .table, .form-group {
    font-size: 0.875rem;
  }
  .highlight {
    font-weight: bold;
    background-color: #FFFF66;
    /* text-decoration: underline solid red; */
  }
  .italic {
    font-style: italic;
  }
  .table tr th {
    text-align: center;
    vertical-align: middle;
    position: sticky;
    top: 57px;
    color: #fff;
    background-color: cornflowerblue;
  }
  .table-condensed th,
  .table-condensed tr,
  .table-condensed td {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }
  .table th,
  .table tr {
    padding: 0.5rem;
  }
  .flex-align-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  td > p:last-child {
    margin-bottom: 0;
  }
  .form-group label {
    font-weight: 700;
  }
</style>
