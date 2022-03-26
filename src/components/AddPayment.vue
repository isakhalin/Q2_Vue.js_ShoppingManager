<template>
  <div>
    <button @click="showForm = !showForm">Add New Cost</button>
    <div v-show="showForm">
      <input placeholder="Value" v-model="value" />
      <div class="categoryList" v-if="categoryList">
        <select v-model="category">
          <option v-for="(option, idx) in categoryList" :key="idx + 1">
            {{ option }}
          </option>
        </select>
      </div>
      <!-- <input placeholder="Category" v-model="category" /> -->
      <input placeholder="Date" v-model="date" />
      <button class="save" @click="onSave">Save!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    nextId: Number,
  },
  data() {
    return {
      showForm: false,
      value: "",
      category: "",
      date: "",
      id: this.nextId,
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      return `${day}.${month}.${year}`;
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
  methods: {
    onSave() {
      const data = {
        value: this.value,
        category: this.category,
        date: this.date || this.getCurrentDate,
        id: this.id,
      };
      this.id++;
      this.$emit("addNewPayment", data);
    },
  },
  async mounted() {
    if (!this.categoryList.lenght) {
      await this.$store.dispatch("fetchCategoryList");
      this.category = this.categoryList[0];
    }
  },
};
</script>
  
<style>
</style>