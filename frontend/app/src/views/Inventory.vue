<template>
  <div class="inventory">
    <h1>This is an inventory page</h1>

    <div id="inventoryUI">
      <div id="addIngredient">
        <p>Please enter the ingredient to add below</p>
        <v-suggest
          id="inputName"
          :data="this.$store.state.validIngs"
          show-field="name"
          v-model="userInputName"
        ></v-suggest>

        <input
          id="inputAmount"
          type="text"
          v-model="userInputAmount"
          placeholder="Enter Amount"
        />

        <select
          v-if="
            this.userInputName.length > 0 &&
            this.getIngIdFromName(this.userInputName) != undefined &&
            this.getIngById(this.getIngIdFromName(this.userInputName))
              .unitType != 'count'
          "
          id="unitSelector"
          v-model="userInputUnit"
        >
          <option
            v-for="unit in this.getIngUnitList(
              this.getIngIdFromName(this.userInputName)
            )"
            v-bind:key="unit"
          >
            {{ unit }}
          </option>
        </select>
        <button v-on:click="addIngredient()">Add Ingredient</button>
        <button>Save Inventory</button>
      </div>

      <div id="userInventory">
        <div
          v-for="item in this.$store.state.userInventory"
          v-bind:key="item.id"
        >
          <font-awesome-icon v-on:click="removeIngredient(item)" icon="times" />
          {{ item.name }} - <input v-model="item.amount" />
          <select v-if="item.unit.length > 0" v-model="item.unit">
            <option
              v-for="unit in getIngUnitList(getIngIdFromName(item.name))"
              v-bind:key="unit"
            >
              {{ unit }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Suggest } from "v-suggest";

export default {
  name: "Inventory",
  components: { "v-suggest": Suggest },
  data() {
    return {
      userInputName: "",
      userInputAmount: "",
      userInputUnit: ""
    };
  },
  methods: {
    removeIngredient(item) {
      this.$store.commit("removeIngredient", item.id);
    },
    getIngIdFromName(name) {
      return this.$store.getters.getIngIdFromName(name);
    },
    getIngById(id) {
      return this.$store.getters.getIngById(id);
    },
    getIngUnitList(id) {
      return this.$store.getters.getIngUnitList(id);
    },
    userHasIngredient(id) {
      return this.$store.getters.userHasIngredient(id);
    },
    addIngredient() {
      // Valid food
      var inputId = this.getIngIdFromName(this.userInputName);

      //User has it already
      if (this.userHasIngredient(inputId)) {
        return;
      }

      if (inputId != undefined) {
        this.$store.commit("addIngredient", {
          id: inputId,
          name: this.getIngById(inputId).name,
          amount: this.userInputAmount,
          unit: this.userInputUnit
        });
        this.$store.commit("sortInventory");
        this.userInputName = "";
        this.userInputAmount = "";
        this.userInputUnit = "";
      }
    }
  }
};
</script>

<style scoped>
div#inventoryUI {
  text-align: left;
}
input#inputAmount {
  margin-left: 70px;
  border: 1px solid #ccc;
}
div.v-suggest input {
  width: inherit;
}
</style>
