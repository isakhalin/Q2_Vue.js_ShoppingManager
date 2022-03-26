htnj boot<template>
  <div class="list">
    <!-- <div class="item" v-for="item in list" :key="item.id">
      {{ item }}
    </div> -->
    <table class="paymentTable">
      <tr>
        <th>#</th>
        <th>
          date
        </th>
        <th>
          category
        </th>
        <th>
          value
        </th>
      </tr>
      <tr class="item" v-for="item in list" :key="item.id " :paymetnCounter="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      paymetnCounter: 0,
    }
  },
};
</script>

<style>
.paymentTable {
margin: 0 auto;
}
th {
  padding: 10px;
}
td {
  padding: 5px 7px;

}
</style>