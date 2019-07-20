<template>
  <div
    id="card-list"
    class="container">
    <h3 class="pt-5">Cards - List</h3>
    <hr>
    <!-- <div
      class="card card-inverse"
      style="background: #f0f0f0">
      <div class="card-body">
        <p class="font-size-reset">Gram Dust Price: {{ dust.all.price.toLocaleString() }}z</p>
        <p>
          Gram dust price is determined by calculating how much each gram dust would cost
          after decomposing a card with King Poring.
        </p>
        <p>Cheapest card per color are:</p>
        <ul class="row">
          <li class="col-12 col-sm-12 col-md-6 col-lg-4 p-0">
            <span class="text-secondary">[white] {{ dust.white.name }}:</span>
            {{ dust.white.price.toLocaleString() }}z per gram dust
          </li>
          <li class="col-12 col-sm-12 col-md-6 col-lg-8 p-0">
            <span class="text-success">[green] {{ dust.green.name }}:</span>
            {{ dust.green.price.toLocaleString() }}z per gram dust
          </li>
          <li class="col-12 col-sm-12 col-md-6 col-lg-4 p-0">
            <span class="text-primary">[blue] {{ dust.blue.name }}:</span>
            {{ dust.blue.price.toLocaleString() }}z per gram dust
          </li>
          <li class="col-12 col-sm-12 col-md-6 col-lg-8 p-0">
            <span class="text-purple">[purple] {{ dust.purple.name }}:</span>
            {{ dust.purple.price.toLocaleString() }}z per gram dust
          </li>
        </ul>
      </div>
    </div>
    <br> -->
    <div class="row">
      <div class="col-md-12">
        <h5>Gram Dust Price: {{ dust.all.price.toLocaleString() }}z</h5>
      </div>
      <div class="col-md-12 small">
        <p>
          Gram dust price is determined by calculating how much each gram dust would cost
          after decomposing a card with King Poring.
        </p>
        <p>Cheapest card per color are:</p>
        <ul class="row">
          <li class="col-12 col-sm-12 col-md-6 col-lg-4 p-0">
            <span class="text-secondary">[white] {{ dust.white.name }}:</span>
            {{ dust.white.price.toLocaleString() }}z per gram dust
          </li>
          <li class="col-12 col-sm-12 col-md-6 col-lg-8 p-0">
            <span class="text-success">[green] {{ dust.green.name }}:</span>
            {{ dust.green.price.toLocaleString() }}z per gram dust
          </li>
          <li class="col-12 col-sm-12 col-md-6 col-lg-4 p-0">
            <span class="text-primary">[blue] {{ dust.blue.name }}:</span>
            {{ dust.blue.price.toLocaleString() }}z per gram dust
          </li>
          <li class="col-12 col-sm-12 col-md-6 col-lg-8 p-0">
            <span class="text-purple">[purple] {{ dust.purple.name }}:</span>
            {{ dust.purple.price.toLocaleString() }}z per gram dust
          </li>
        </ul>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Name</label>
        <input
          v-model="filters.name"
          class="form-control form-control-sm">
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Main Effect</label>
        <input
          v-model="filters.mainEffect"
          class="form-control form-control-sm">
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Deposit Effect</label>
        <input
          v-model="filters.depositEffect"
          class="form-control form-control-sm">
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Unlock Effect</label>
        <input
          v-model="filters.unlockEffect"
          class="form-control form-control-sm">
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Type</label>
        <select
          v-model="filters.type"
          class="form-control form-control-sm">
          <option
            v-for="(type, index) of types"
            :value="type"
            :key="index">{{ type }}</option>
        </select>
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Color</label>
        <select
          v-model="filters.color"
          class="form-control form-control-sm">
          <option
            v-for="(color, index) of colors"
            :value="color"
            :key="index">{{ color }}</option>
        </select>
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Tag</label>
        <select
          v-model="filters.tag"
          class="form-control form-control-sm">
          <option
            v-for="(tag, index) of tags"
            :value="tag"
            :key="index">{{ tag }}</option>
        </select>
      </div>
      <div class="col-6 col-md-4 col-lg-3 mb-1">
        <label class="font-weight-bold mb-1">Sort</label>
        <select
          v-model="filters.sort"
          class="form-control form-control-sm">
          <option
            v-for="(sort, index) of sorting"
            :value="sort.value"
            :key="index">{{ sort.name }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(card, index) of filteredCards"
        :key="index"
        class="col-lg-4 col-md-6 col-sm-12 col-12">
        <div
          :data-card-color="card.rarity.toLowerCase()"
          class="card mb-3">
          <div class="card-header">{{ card.name }}</div>
          <div class="card-body">
            <ul class="card-text main-effect">
              <li
                v-for="(effect, index) of card.mainEffect"
                :key="index">{{ effect }}</li>
            </ul>
            <p class="card-text">
              <span class="text-info">Deposit:</span>&nbsp;&nbsp;{{ card.depositEffect }}
            </p>
            <p class="card-text">
              <span class="text-info">Unlock:</span>&nbsp;&nbsp;{{ card.unlockEffect }}
            </p>
            <!-- <p class="card-text">
              <span class="text-info">Type:</span>&nbsp;&nbsp;{{ card.type }}
            </p> -->
            <hr>
            <p class="card-text">
              <span class="text-info">Exchange Price:</span>&nbsp;&nbsp;{{ card.displayPrice }}
            </p>
            <p
              v-if="card.materials.length"
              class="card-text clearfix">
              <span v-if="!card.event">
                <span class="text-info">Crafted Price:</span>&nbsp;&nbsp;{{ card.craftedPrice }}
              </span>
              <b-button
                v-b-toggle="`collapse-${index}`"
                class="btn-sm material-btn"
                variant="outline-primary">MATERIALS</b-button>
            </p>
            <b-collapse
              v-if="card.materials.length"
              :id="`collapse-${index}`"
              class="mt-2">
              <hr>
              <p
                v-for="(mats, index) of card.materials"
                :key="index"
                class="card-text">
                {{ mats.quantity }} x <span class="text-primary">{{ mats.name }}</span>
                <span v-if="!card.event">= {{ mats.total.toLocaleString() }}z</span>
              </p>
              <p class="card-text">Crafting Fee = {{ card.craftFee.toLocaleString() }}z</p>
            </b-collapse>
          </div>
          <div class="card-footer">
            <b-badge
              variant="info"
              href="#"
              @click="clickTag('type', card.type)">{{ card.type }}</b-badge>
            <b-badge
              v-if="card.materials.length"
              variant="success"
              href="#"
              @click="clickTag('tag', 'Haute Couture')">Haute Couture</b-badge>
            <template v-for="(tag, index) of card.tags">
              <b-badge
                :key="tag + index"
                :data-card-tag="tag.toLowerCase()"
                href="#"
                @click="clickTag('tag', tag)">{{ tag }}</b-badge>
              <span :key="index" />
            </template>
            <b-badge
              v-if="!card.devourable"
              variant="secondary"
              href="#"
              @click="clickTag('tag', 'Cannot Decompose')">Cannot Decompose</b-badge>
            <b-badge
              v-if="card.event"
              variant="warning"
              href="#"
              @click="clickTag('tag', 'Event')">Event</b-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./card-list.js"></script>
<style scoped>
.form-group {
  font-size: 0.875rem;
}
.font-size-reset {
  font-size: 1rem;
}
.text-purple {
  color: purple;
}
.card-body, .card-header {
  font-family: 'Andika', Helvetica, Arial, sans-serif;
}
p {
  margin-bottom: 0.25rem;
}
.card-body ul.main-effect {
  font-size: 1rem;
  padding-inline-start: 1rem;
  margin-block-end: 0.5rem;
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
  float: right;
}
/* .card[data-card-color='gray'] {
  border-color: lightgray;
} */
.card[data-card-color='white'] > .card-header {
  background: linear-gradient(45deg, white, lightgray) ;
}
/* .card[data-card-color='blue'] {
  border-color: deepskyblue;
} */
.card[data-card-color='blue'] > .card-header {
  background: linear-gradient(45deg, deepskyblue, lightgray);
}
/* .card[data-card-color='green'] {
  border-color: lightgreen;
} */
.card[data-card-color='green'] > .card-header {
  background: linear-gradient(45deg, lightgreen, lightgray) ;
}
/* .card[data-card-color='purple'] {
  border-color: plum;
} */
.card[data-card-color='purple'] > .card-header {
  background: linear-gradient(45deg, orchid, lightgray) ;
}
.card-footer .badge[data-card-tag='element'] {
  background: peru;
}
.card-footer .badge[data-card-tag='race'] {
  background: slateblue
}
.card-footer .badge[data-card-tag='size'] {
  background: darkcyan;
}
.card-footer .badge[data-card-tag='status effect'] {
  background: darkslateblue;
}
.card-footer .badge[data-card-tag='skill'] {
  background: rebeccapurple;
}
</style>
