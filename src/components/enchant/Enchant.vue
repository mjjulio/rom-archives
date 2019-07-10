<template>
  <div
    id="enchantment"
    class="container">
    <h2 class="title">4th Enchantment Matrix</h2>
    <div>
      <table
        class="table table-bordered">
        <tr
          class="text-center">
          <th width="20%">4th Enchantment</th>
          <th width="8%">Weapon</th>
          <th width="8">Armor</th>
          <th width="8%">Garment</th>
          <th width="8%">Shoes</th>
          <th width="8%">Accessory</th>
          <th width="8%">Head</th>
          <th width="8%">Face</th>
          <th width="8%">Mouth</th>
          <th width="8%">Back</th>
          <th width="8%">Tail</th>
        </tr>
        <tr
          v-for="(enchant, index) in fourthEnc"
          :key="index">
          <td>
            <span class="font-weight-bold">{{ enchant.name }}</span>
            <span class="small">{{ enchant.subName }}</span>
          </td>
          <td class="enc-matrix"><i :class="[ enchant.weapon ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.armor ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.garment ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.shoes ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.accessory ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.head ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.face ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.mouth ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.back ? checkClass : timesClass]" /></td>
          <td class="enc-matrix"><i :class="[ enchant.tail ? checkClass : timesClass]" /></td>
        </tr>
      </table>
    </div>
    <hr>
    <h2 class="title">Enchantment Table per Equipment</h2>
    <div class="form-group row">
      <div class="col-md-3 col-sm-3 col-xs-6">
        <select
          v-model="filters.equipment"
          class="form-control">
          <option
            v-for="(type, index) of types"
            :value="type"
            :key="index">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    <hr>
    <div>
      <table
        class="table table-bordered">
        <tr class="text-center">
          <th width="40%">Enchantment Stat</th>
          <th width="20%">Basic</th>
          <th width="20%">Intermediate</th>
          <th width="20%">Advanced</th>
        </tr>
        <tr
          v-for="(enchant, index) in filteredEnchant"
          :key="index">
          <td>{{ enchant.stat }}</td>
          <td class="text-center">{{ enchant.basic }}</td>
          <td class="text-center">{{ enchant.intermediate }}</td>
          <td class="text-center">{{ enchant.advanced }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script src="./enchant.js">
</script>
<!-- styling for the component -->
<style scoped>
  .title {
    padding-top: 50px;
  }
  .table, .form-group {
    font-size: 0.875rem;
  }
  .table tr,
  .table td {
    padding: 0.4rem;
  }
  .table tr th {
    text-align: center;
    vertical-align: middle;
    color: #fff;
    background-color: cornflowerblue;
    /* letter-spacing: 0.05rem; */
    position: sticky;
    top: 57px;
  }
  .enc-matrix, .enc-matrix i {
    vertical-align: middle;
    text-align: center;
  }
</style>
