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
          v-model="filters.name"
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
          <div class="card-header">
            {{ headgear.name }}<br>
            <sup class="title">
              <span class="text-indianred">{{ headgear.type }}</span>
              &#8231;
              <span class="text-darkorange">{{ headgear.category }}</span>
            </sup>
          </div>
          <div class="card-body">
            <p class="card-text">
              <ul class="card-text main-effect">
                <li
                  v-for="(effect, index) of headgear.effect.main"
                  :key="index">{{ effect }}</li>
              </ul>
            </p>
            <p class="card-text">
              <span class="title text-info">Deposit:</span>
              &nbsp;{{ headgear.effect.deposit }}
            </p>
            <p class="card-text">
              <span class="title text-info">Craft / Unlock:</span>
              &nbsp;{{ headgear.effect.unlock }}
            </p>
            <hr>
            <p
              v-if="headgear.item.source !== 'None'"
              class="card-text">
              <span class="title text-indianred">Source:</span>
              <span :class="{ 'text-muted' : headgear.item.source === 'None' }">
                &nbsp;{{ headgear.item.source }}
              </span>
            </p>
            <p
              v-if="headgear.item.price !== 'N/A'"
              class="card-text">
              <span class="title text-purple">NPC Price:</span>
              <span :class="{ 'text-muted' : headgear.item.price === 'N/A' }">
                &nbsp;{{ headgear.item.price }}
              </span>
            </p>
            <p class="card-text">
              <span class="title text-success">Exchange:</span>
              &nbsp;
              <span v-if="!headgear.item.tradeable">
                <em class="text-muted">non-tradeable</em>
              </span>
              <span v-else-if="!headgear.item.exchange">
                <em class="text-warning">no data</em>
              </span>
              <span v-else>
                {{ headgear.item.exchange.toLocaleString() }}z
              </span>
            </p>
            <div v-if="headgear.craft">
              <p>
                <span class="title text-primary">Gear Craft: </span>
                <!-- <span>&nbsp;{{ headgear.craft.price.toLocaleString() }}z</span> -->
                <span
                  v-if="(!headgear.blueprint.exchange && headgear.blueprint.tradeable)
                  || headgear.materials.missing || !headgear.craft.fee">
                  <span>
                    &nbsp;{{ headgear.craft.price.toLocaleString() }}z
                    <small v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</small>
                  </span>
                  <sup
                    class="text-danger"
                    title="missing some item prices">[!]</sup>
                </span>
                <span v-else>
                  &nbsp;{{ headgear.craft.price.toLocaleString() }}z
                  <small v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</small>
                </span>
                <!-- <span v-if="!headgear.blueprint.exchange && headgear.blueprint.tradeable">
                  <br><i class="text-danger">*lacking blueprint price</i>
                </span>
                <span v-if="headgear.materials.missing">
                  <br><i class="text-danger">*lacking material price</i>
                </span>
                <span v-if="!headgear.craft.fee">
                  <br><i class="text-danger">*lacking craft fee</i>
                </span> -->
              </p>
              <p v-if="headgear.blueprint.cost && headgear.blueprint.tradeable">
                <span class="title text-primary">
                  Gear Craft
                  <sup title="using NPC blueprint">[2]</sup>:
                </span>
                &nbsp;{{ (headgear.craft.price - headgear.blueprint.exchange).toLocaleString() }}z
                <small>+ {{ headgear.blueprint.cost }}</small>
                <small v-if="headgear.craft.extra">+ {{ headgear.craft.extra }}</small>
              </p>
              <div v-if="filters.sort.indexOf('patkz') > -1">
                <p>
                  <span class="title text-info">Craft Cost per ATK:</span>
                  <strong>&nbsp;{{ headgear.craft.stats.patkz.toLocaleString() }}z</strong>
                </p>
                <p class="text-muted">
                  <span class="title">Total Craft/Unlock & Deposit ATK:</span>
                  <strong>{{ headgear.craft.stats.patk }}</strong>
                </p>
              </div>
              <div v-if="filters.sort.indexOf('matkz') > -1">
                <p>
                  <span class="title text-info">Craft Cost per MATK:</span>
                  <strong>&nbsp;{{ headgear.craft.stats.matkz.toLocaleString() }}</strong>
                </p>
                <p class="text-muted">
                  <span class="title">Total Craft/Unlock & Deposit MATK:</span>
                  <strong>{{ headgear.craft.stats.matk }}</strong>
                </p>
              </div>
              <div v-if="filters.sort.indexOf('hpz') > -1">
                <p>
                  <span class="title text-info">Craft Cost per HP:</span>
                  <strong>&nbsp;{{ headgear.craft.stats.hpz.toLocaleString() }}z</strong>
                </p>
                <p class="text-muted">
                  <span>Total Craft/Unlock & Deposit HP:</span>
                  <strong>{{ headgear.craft.stats.hp }}</strong>
                </p>
              </div>
              <div class="text-right">
                <b-button
                  v-b-toggle="`collapse-${headgear.id}`"
                  class="btn-sm title"
                  variant="outline-primary">Materials</b-button>
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
                      <span class="title text-info">Source:</span>
                      &nbsp;{{ headgear.blueprint.source }}
                    </li>
                    <li v-if="headgear.blueprint.cost">
                      <span class="title text-indianred">NPC Price:</span>
                      {{ headgear.blueprint.cost }}
                    </li>
                    <li v-if="headgear.blueprint.tradeable">
                      <span class="title text-success">Exchange:</span>
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
                      <span class="title text-success">Exchange:</span>
                      &nbsp;<em class="text-muted">non-tradeable</em>
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
            <div v-if="headgear.notes">
              <hr>
              <p class="card-text">
                <span class="title text-indianred">Notes:</span>
                &nbsp;{{ headgear.notes }}
              </p>
            </div>
          </div>
          <!-- <div class="card-footer">
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
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./craft-zeny.js"></script>
<!-- styling for the component -->
<style scoped>
  .form-group {
    font-size: 0.875rem;
  }
  .form-group label {
    font-weight: 700;
  }
  .highlight {
    font-weight: bold;
    background-color: #FFFF66;
    /* text-decoration: underline solid red; */
  }
  .italic {
    font-style: italic;
  }
  .flex-align-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
p {
  margin-bottom: 0.25rem;
}
.row ul {
  padding-inline-start: 30px;
}
.font-size-reset {
  font-size: 1rem;
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
.card-body ul.main-effect {
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
.card-body sup {
  cursor: default;
}
.card-header {
  padding: 0.5rem 1rem 0.25rem;
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
