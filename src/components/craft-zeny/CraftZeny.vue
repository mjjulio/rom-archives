<template>
  <div id="craft-zeny" class="container">
    <div class="form-group row">
      <div class="col-md-3 col-sm-3 col-xs-6">
        <label for="usr">Sort By:</label>
        <select class="form-control" v-model="filters.sort">
          <option v-for="sort of sortOptions" v-bind:value="sort.value" :key="sort">
            {{ sort.name }}
          </option>
        </select>
      </div>
      <div class="col-md-9 col-sm-9 col-xs-6 flex-align-bottom">
        <span class="text-info italic">
          * Exchange prices powered by 
          <a href="https://poporing.life">Poporing Life</a>
        </span>
      </div>
    </div>
    <hr>
    <table class="table table-striped table-bordered">
      <tr>
        <th style="width: 35%">Headgear</th>
        <th style="width: 35%">Cost Breakdown</th>
        <th style="width: 30%">Total Cost</th>
      </tr>
      <tr v-for="headgear in modifiedList" :key="headgear">
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
              <tr v-for="material in headgear.materials.normal" :key="material">
                <td>{{ material.name }}</td>
                <td class="text-right">{{ material.quantity }}</td>
                <td class="text-right">{{ material.price.toLocaleString() }}z</td>
                <td class="text-right">{{ material.total.toLocaleString() }}z</td>
              </tr>
              <tr v-for="material in headgear.materials.special" :key="material">
                <td>{{ material.name }}</td>
                <td class="text-right">{{ material.quantity }}</td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <!-- <span v-for="material in headgear.materials.normal" :key="material">
              &nbsp;&nbsp;&bull; {{ material.quantity }} {{ material.name }}&nbsp;
              <span v-if="material.total">[{{ material.price.toLocaleString() }}z] = {{ material.total.toLocaleString() }}z</span>
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
            <span v-else-if="headgear.bpExchangePrice > 0">{{ headgear.bpExchangePrice.toLocaleString() }}z</span>
            <span v-else class="text-danger">NO DATA</span>
            <br>
            &nbsp;&nbsp;&bull; <span class="text-info">NPC Price:</span>&nbsp;
            {{ headgear.blueprintCost }}<br>
          </p>
          <p>
            <span class="text-info">Craft Fee:</span>&nbsp;
            <span v-if="headgear.craftFee">{{ headgear.craftFee.toLocaleString() }}z</span>
            <span v-else class="text-danger">NO DATA</span>
          </p>			
        </td>
        <td>
          <div v-if="headgear.blueprintTradeable === 'No'">
            <strong>
            {{ headgear.total.toLocaleString() }}z
            <span v-if="headgear.name !== 'Sakura Bride'">+ {{ headgear.blueprintCost }}</span>
            <span v-for="material in headgear.materials.special" :key="material">
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
                <span v-for="material in headgear.materials.special" :key="material">
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
                {{ (headgear.total - headgear.bpExchangePrice).toLocaleString() }}z + {{ headgear.blueprintCost }}
                <span v-for="material in headgear.materials.special" :key="material"> + {{ material }}</span>
              </p>
            </div>
          </div>
          <br>
          <p>
            <span v-bind:class="{ 'highlight' : (filters.sort.indexOf('patk') >= 0) }">
              <span class="text-info">Zeny/ATK Ratio:</span>&nbsp;
              {{ headgear.atkZenyRatio.toLocaleString() }}
              <span class="text-muted">[ATK +{{ headgear.atk }}]</span>
            </span>
          </p>
          <p>
            <span v-bind:class="{ 'highlight' : (filters.sort.indexOf('matk') >= 0) }">
              <span class="text-info">Zeny/MATK Ratio:</span>&nbsp;
              {{ headgear.matkZenyRatio.toLocaleString() }}
              <span class="text-muted">[M.ATK +{{ headgear.matk }}]</span>
            </span>
          </p>
          <p>
            <span v-bind:class="{ 'highlight' : (filters.sort.indexOf('hp') >= 0) }">
              <span class="text-info">Zeny/HP Ratio:</span>&nbsp;
              {{ headgear.hpZenyRatio.toLocaleString() }}
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
<style>
	.highlight {
		font-weight: bold;
    background-color: #FFFF66;
    /* text-decoration: underline solid red; */
	}
	.italic {
		font-style: italic;
	}
  .table {
    font-size: 14px;
  }
  .table-condensed th, 
  .table-condensed tr,
  .table-condensed td {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }
  .flex-align-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
	td > p:last-child {
		margin-bottom: 0;
	}
</style>