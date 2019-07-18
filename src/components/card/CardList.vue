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
        class="col-md-4 col-sm-6 col-xs-12">
        <div
          :style="{ borderColor: card.rarity }"
          class="card mb-3">
          <div class="card-header">{{ card.name }}</div>
          <div class="card-body">
            <p class="card-text">{{ card.mainEffect }}</p>
            <p class="card-text">Exchange: {{ card.displayPrice }}</p>
            <p
              v-if="card.materials.length && !card.event"
              class="card-text">Crafted: {{ card.craftedPrice }}</p>
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
