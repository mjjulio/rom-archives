<template>
  <div
    id="card-list"
    class="container">
    <h3 class="pt-5">Cards - List</h3>
    <hr>
    <div>
      <p>Cheapest Cards to Gram Dust per Color:</p>
      <p>{{ dust.gray.name }}: {{ dust.gray.price.toLocaleString() }}z per Gram Dust</p>
      <p>{{ dust.green.name }}: {{ dust.green.price.toLocaleString() }}z per Gram Dust</p>
      <p>{{ dust.blue.name }}: {{ dust.blue.price.toLocaleString() }}z per Gram Dust</p>
      <p>{{ dust.purple.name }}: {{ dust.purple.price.toLocaleString() }}z per Gram Dust</p>
    </div>
    <div class="row">
      <div
        v-for="(card, index) of filteredCards"
        :key="index"
        class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
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
            <!-- <b-btn v-bind:v-b-toggle="'collapse' + index" variant="primary"></b-btn> -->
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
              <!-- <b-card>
                <p class="card-text">Collapse contents Here</p>
              </b-card> -->
            </b-collapse>
          </div>
          <div class="card-footer">
            <b-badge variant="info">{{ card.type }}</b-badge>
             <b-badge
              v-if="card.materials.length"
              variant="success">Haute Couture</b-badge>
            <b-badge
              v-if="!card.devourable"
              variant="secondary">Cannot Decompose</b-badge>
            <b-badge
              v-if="card.event"
              variant="warning">Event</b-badge>
          </div>
        </div>
      </div>
    </div>
    <!-- <table class="table table-bordered">
      <tr>
        <th>Card</th>
        <th>Color</th>
        <th>Price</th>
      </tr>
      <tr
        v-for="(card, index) of filteredCards"
        :key="index">
        <td>
          {{ card.name }}<br>
          <div v-if="card.materials.length">
            <p
              v-for="(mats, index) of card.materials"
              :key="index">
              {{ mats.quantity }}x {{ mats.name }}
              <span v-if="!card.event">= {{ mats.total.toLocaleString() }}z</span>
            </p>
            <p>Crafting Fee = {{ card.craftFee.toLocaleString() }}z
            </p>
          </div>
        </td>
        <td>{{ card.rarity }}</td>
        <td>
          <p>Exchange: {{ card.displayPrice }}</p>
          <p v-if="card.materials.length && !card.event">Crafted: {{ card.craftedPrice }}</p>
        </td>
      </tr>
    </table> -->
  </div>
</template>
<script src="./card-list.js"></script>
<style scoped>
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
</style>
