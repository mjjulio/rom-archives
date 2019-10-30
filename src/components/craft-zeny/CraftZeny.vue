<template>
  <div
    id="craft-zeny"
    class="container">
    <h3 class="pt-5">Headgears - List</h3>
    <hr>
    <div class="row">
      <div class="col-12 flex-align-bottom mb-3">
        <em class="text-info small">
          * Exchange prices powered by <a href="https://poporing.life">Poporing Life</a>
        </em>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Name</label>
        <input
          v-model.lazy="filters.name"
          :class="{ 'bg-warning' : filters.name }"
          class="form-control form-control-sm">
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Main Effect</label>
        <input
          v-model="filters.mainEffect"
          :class="{ 'bg-warning' : filters.mainEffect }"
          class="form-control form-control-sm">
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Deposit Effect</label>
        <input
          v-model="filters.depositEffect"
          :class="{ 'bg-warning' : filters.depositEffect }"
          class="form-control form-control-sm">
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Craft/Unlock Effect</label>
        <input
          v-model="filters.unlockEffect"
          :class="{ 'bg-warning' : filters.unlockEffect }"
          class="form-control form-control-sm">
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Type</label>
        <select
          v-model="filters.type"
          :class="{ 'bg-warning' : filters.type !== '—' }"
          class="form-control form-control-sm">
          <option
            v-for="(type, index) of types"
            :value="type"
            :key="type + index">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Category</label>
        <select
          v-model="filters.category"
          :class="{ 'bg-warning' : filters.category !== '—' }"
          class="form-control form-control-sm">
          <option
            v-for="(category, index) of categories"
            :value="category"
            :key="category + index">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Tag</label>
        <select
          v-model="filters.tag"
          :class="{ 'bg-warning' : filters.tag !== '—' }"
          class="form-control form-control-sm">
          <option
            v-for="(tag, index) of tags"
            :value="tag"
            :key="tag + index">
            {{ tag }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-sm-3 col-6">
        <label class="mb-1">Sort By</label>
        <select
          v-model="filters.sort"
          :class="{ 'bg-warning' : filters.sort !== 'default' }"
          class="form-control form-control-sm">
          <option
            v-for="(sort, index) of sortOptions"
            :value="sort.value"
            :key="sort.name + index">
            {{ sort.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div
        v-if="!modifiedList.length"
        class="col-12">
        <div class="card mb-3">
          <div class="card-body bg-warning">
            <h5
              v-if="loading"
              class="m-0">
              <b-spinner label="loading..."/>&nbsp;&nbsp;Data loading...
            </h5>
            <h5
              v-else
              class="m-0">
              <i class="fas fa-exclamation-triangle"/>&nbsp;&nbsp;No matching headgear found.
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(headgear, index) in modifiedList"
        :key="index"
        class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
        <div class="card">
          <div class="card-header">{{ headgear.name }}</div>
          <div class="card-body">
            <p class="card-text">
              <ul class="card-text main-effect">
                <li
                  v-for="(effect, index) of headgear.effect.main"
                  :key="index">{{ effect }}</li>
              </ul>
            </p>
            <p class="card-text">
              <span class="text-info">Deposit:</span>
              &nbsp;{{ headgear.effect.deposit }}
            </p>
            <p class="card-text">
              <span class="text-info">Craft / Unlock:</span>
              &nbsp;{{ headgear.effect.unlock }}
            </p>
            <hr>
            <p class="card-text">
              <span class="text-info">Source:</span>
              <span :class="{ 'text-muted' : headgear.item.source === 'None' }">
                &nbsp;{{ headgear.item.source }}
              </span>
            </p>
            <p class="card-text">
              <span class="text-info">NPC Price:</span>
              <span :class="{ 'text-muted' : headgear.item.price === 'N/A' }">
                &nbsp;{{ headgear.item.price }}
              </span>
            </p>
            <p class="card-text">
              <span class="text-info">Exchange Price:</span>
              &nbsp;
              <span v-if="!headgear.item.tradeable">
                <em class="text-muted">non-tradeable</em>
              </span>
              <span v-else-if="!headgear.item.exchange">
                <span class="text-warning">NO DATA</span>
              </span>
              <span v-else>
                {{ headgear.item.exchange.toLocaleString() }}z
              </span>
            </p>
            <div v-if="headgear.craft">
              <p>
                <span class="text-info">Crafted Price:</span>
                <strong>&nbsp;{{ headgear.craft.price.toLocaleString() }}z</strong>
                <em v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</em>
                <span v-if="!headgear.blueprint.exchange && headgear.blueprint.tradeable">
                  <br><i class="text-danger">*lacking blueprint price</i>
                </span>
                <span v-if="headgear.materials.missing">
                  <br><i class="text-danger">*lacking material price</i>
                </span>
                <span v-if="!headgear.craft.fee">
                  <br><i class="text-danger">*lacking craft fee</i>
                </span>
              </p>
              <p v-if="headgear.blueprint.cost && headgear.blueprint.tradeable">
                <span class="text-info">
                  Crafted Price
                  <sup title="using NPC blueprint">[2nd]</sup>:
                </span>
                &nbsp;{{ (headgear.craft.price - headgear.blueprint.exchange).toLocaleString() }}z
                + {{ headgear.blueprint.cost }}
                <em v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</em>
              </p>
              <p v-if="filters.sort.indexOf('patkz') > -1">
                <span class="text-info">Craft Cost per ATK:</span>
                <span class="highlight">
                  &nbsp;{{ headgear.craft.stats.patkz.toLocaleString() }}z&nbsp;
                </span>
              </p>
              <p
                v-if="filters.sort.indexOf('patk') > -1"
                class="text-muted">
                [ Total Craft/Unlock & Deposit ATK:
                <strong>{{ headgear.craft.stats.patk }}</strong>
                ]
              </p>
              <p v-if="filters.sort.indexOf('matkz') > -1">
                <span class="text-info">Craft Cost per MATK:</span>
                <span class="highlight">
                  &nbsp;{{ headgear.craft.stats.matkz.toLocaleString() }}z&nbsp;
                </span>
                <br>
                <span class="text-muted">
                  [ Total Craft/Unlock & Deposit MATK:
                  <strong>{{ headgear.craft.stats.matk }}</strong>
                  ]
                </span>
              </p>
              <p v-if="filters.sort.indexOf('hpz') > -1">
                <span class="text-info">Craft Cost per HP:</span>
                <span class="highlight">
                  &nbsp;{{ headgear.craft.stats.hpz.toLocaleString() }}z&nbsp;
                </span>
                <br>
                <span class="text-muted">
                  [ Total Craft/Unlock & Deposit HP:
                  <strong>{{ headgear.craft.stats.hp }}</strong>
                  ]
                </span>
              </p>
              <div class="text-right">
                <b-button
                  v-b-toggle="`collapse-${headgear.id}`"
                  class="btn-sm material-btn"
                  variant="outline-primary">MATERIALS</b-button>
              </div>
            </div>
            <b-collapse
              v-if="headgear.craft"
              :id="`collapse-${headgear.id}`"
              class="mt-2">
              <div class="materials-container">
                <div>
                  <div>1 x <span class="text-primary">Blueprint</span></div>
                  <ul class="bp-list">
                    <li>
                      <span class="text-info">Source:</span>
                      &nbsp;{{ headgear.blueprint.source }}
                    </li>
                    <li v-if="headgear.blueprint.tradeable">
                      <span class="text-info">Exchange Price:</span>
                      &nbsp;
                      <span
                        v-if="!headgear.blueprint.exchange"
                        class="text-warning">NO DATA</span>
                      <span
                        v-else
                        :class="{ 'text-italic' : headgear.blueprint.snapping }">
                        {{ headgear.blueprint.exchange.toLocaleString() }}z
                        <sup
                          v-if="headgear.blueprint.snapping"
                          title="Snapping"
                          class="text-danger">[!]</sup>
                        <sup
                          v-if="!headgear.blueprint.available"
                          title="Out of Stock"
                          class="text-danger">[NA]</sup>
                      </span>
                    </li>
                    <li v-else>
                      <span class="text-info">Exchange Price:</span>
                      &nbsp;<em class="text-muted">non-tradeable</em>
                    </li>
                    <li v-if="headgear.blueprint.cost">
                      <span class="text-info">NPC Price:</span>
                      {{ headgear.blueprint.cost }}
                    </li>
                  </ul>
                </div>
                <p
                  v-for="(material, index) in headgear.materials.normal"
                  :key="headgear.id + material.name + index"
                  class="card-text">
                  {{ material.quantity }} x <span class="text-primary">{{ material.name }}</span>
                  = {{ material.total.toLocaleString() }}z
                  <sup
                    v-if="material.snapping"
                    title="Snapping"
                    class="text-danger">[!]</sup>
                  <sup
                    v-if="!material.available"
                    title="Out of Stock"
                    class="text-danger">[NA]</sup>
                </p>
                <p
                  v-for="(material, index) in headgear.materials.special"
                  :key="headgear.id + material.name + index"
                  class="card-text">
                  {{ material.quantity }} x <span class="text-primary">{{ material.name }}</span>
                </p>
                <p>Crafting Fee = {{ headgear.craft.fee.toLocaleString() }}z</p>
              </div>
            </b-collapse>
          </div>
          <div class="card-footer">
            <b-badge
              variant="info"
              href="#"
              @click="clickTag('type', headgear.type)">{{ headgear.type }}</b-badge>
            <b-badge
              variant="warning"
              href="#"
              @click="clickTag('category', headgear.category)">{{ headgear.category }}</b-badge>
            <b-badge
              v-if="headgear.craft"
              variant="success"
              href="#"
              @click="clickTag('tag', 'Craft')">Craft</b-badge>
          </div>
        </div>
      </div>
    </div>
    <!-- <table class="table table-striped table-bordered">
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
          <p>{{ headgear.effect.main }}</p>
          <br>
          <p>
            <span class="text-info">Craft / Unlock:</span>
            &nbsp;{{ headgear.effect.unlock }}
          </p>
          <p>
            <span class="text-info">Deposit:</span>
            &nbsp;{{ headgear.effect.deposit }}
          </p>
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
                :key="headgear.name + 'material' + index">
                <td>{{ material.name }}</td>
                <td class="text-right">{{ material.quantity }}</td>
                <td class="text-right">{{ material.price.toLocaleString() }}z</td>
                <td class="text-right">
                  {{ material.total.toLocaleString() }}z
                </td>
              </tr>
              <tr
                v-for="(material, index) in headgear.materials.special"
                :key="headgear.name + 'special' + index">
                <td>{{ material.name }}</td>
                <td class="text-right">{{ material.quantity }}</td>
                <td/>
                <td/>
              </tr>
            </table>
          </p>
          <p>
            <span class="text-info">Blueprint:</span><br>
            &nbsp;&nbsp;&bull; <span class="text-info">Exchange Price:</span>&nbsp;
            <span v-if="!headgear.blueprint.tradeable"><i>non-tradeable</i></span>
            <span v-else-if="headgear.blueprint.exchange > 0">
              {{ headgear.blueprint.exchange.toLocaleString() }}z
            </span>
            <span
              v-else
              class="text-danger">NO DATA</span>
            <br>
            &nbsp;&nbsp;&bull; <span class="text-info">NPC Price:</span>&nbsp;
            {{ headgear.blueprint.cost ? headgear.blueprint.cost : 'N/A' }}<br>
          </p>
          <p>
            <span class="text-info">Craft Fee:</span>&nbsp;
            <span v-if="headgear.craft.fee">{{ headgear.craft.fee.toLocaleString() }}z</span>
            <span
              v-else
              class="text-danger">NO DATA</span>
          </p>
        </td>
        <td>
          <p>
            <strong>
              {{ headgear.craft.price.toLocaleString() }}z
              <span v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</span>
            </strong>
            <span v-if="!headgear.blueprint.exchange && headgear.blueprint.tradeable">
              <br><i class="text-danger">*lacking blueprint price</i>
            </span>
            <span v-if="headgear.materials.missing">
              <br><i class="text-danger">*lacking material price</i>
            </span>
            <span v-if="!headgear.craft.fee">
              <br><i class="text-danger">*lacking craft fee</i>
            </span>
          </p>
          <div v-if="headgear.blueprint.cost && headgear.blueprint.tradeable">
            <p><i>-or-</i></p>
            <p>
              {{ (headgear.craft.price - headgear.blueprint.exchange).toLocaleString() }}z
              + {{ headgear.blueprint.cost }}
              <span v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</span>
            </p>
          </div>
          <br>
          <p>
            <span :class="{ 'highlight' : (filters.sort.indexOf('patk') >= 0) }">
              <span class="text-info">Zeny/ATK Ratio:</span>&nbsp;
              {{ headgear.stats.atkz.toLocaleString() }}z
              <span class="text-muted">[ATK +{{ headgear.stats.atk }}]</span>
            </span>
          </p>
          <p>
            <span :class="{ 'highlight' : (filters.sort.indexOf('matk') >= 0) }">
              <span class="text-info">Zeny/MATK Ratio:</span>&nbsp;
              {{ headgear.stats.matkz.toLocaleString() }}z
              <span class="text-muted">[M.ATK +{{ headgear.stats.matk }}]</span>
            </span>
          </p>
          <p>
            <span :class="{ 'highlight' : (filters.sort.indexOf('hp') >= 0) }">
              <span class="text-info">Zeny/HP Ratio:</span>&nbsp;
              {{ headgear.stats.hpz.toLocaleString() }}z
              <span class="text-muted">[Max HP +{{ headgear.stats.hp }}]</span>
            </span>
          </p>
        </td>
      </tr>
    </table> -->
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
p {
  margin-bottom: 0.25rem;
}
.row ul {
  padding-inline-start: 30px;
}
.form-group {
  font-size: 0.875rem;
}
.font-size-reset {
  font-size: 1rem;
}
.text-purple {
  color: darkorchid;
}
.card-body, .card-header {
  font-family: 'Andika', Helvetica, Arial, sans-serif;
}
.card-body ul.main-effect {
  font-size: 1rem;
  padding-inline-start: 1rem;
  margin-block-end: 0.5rem;
}
.card-body ul.main-effect li {
  white-space: pre-line;
}
.card-body ul.bp-list {
  padding-inline-start: 0.5rem;
  margin-block-end: 0.25rem;
  list-style-type: none;
}
.card-body .materials-container {
  background-color: ivory;
  padding: 10px;
  border-radius: 5px;
}
.card-header {
  padding: 0.75rem 1rem;
  font-weight: bold;
}
.card-body {
  padding: 1rem;
  font-size: 0.875rem;
  /* white-space: pre-line; */
  /* word-break: break-word; */
}
.card-footer {
  padding: 0.5rem 1rem 0.75rem;
}
.material-btn {
  font-size: 0.625rem;
  letter-spacing: 0.05rem;
}
.text-italic {
  font-style: italic;
}
</style>
