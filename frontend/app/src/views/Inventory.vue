<template>
  <div class="inventory">
    <h1>This is an inventory page</h1>

    <div id="inventoryUI">
      <div id="addIngredient">
        <p>Please enter the ingredient to add below</p>
        <v-suggest
          id="inputName"
          :data="validFoods"
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
            this.getFoodIdFromName(this.userInputName) != undefined &&
            this.getFoodUnitType(this.getFoodIdFromName(this.userInputName)) !=
              'count'
          "
          id="unitSelector"
          v-model="userInputUnit"
        >
          <option
            v-for="unit in this.getFoodUnitList(
              this.getFoodIdFromName(this.userInputName)
            )"
            v-bind:key="unit"
          >
            {{ unit }}
          </option>
        </select>
        <button v-on:click="addIngredient()">Add Ingredient</button>
      </div>

      <div id="userInventory">
        <div v-for="item in userInventory" v-bind:key="item.id">
          <font-awesome-icon v-on:click="removeIngredient(item)" icon="times" />
          {{ item.name }} - <input v-model="item.amount" />
          <select v-if="item.unit.length > 0" v-model="item.unit">
            <option
              v-for="unit in getFoodUnitList(getFoodIdFromName(item.name))"
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
      userInputUnit: "",
      userInventory: [
        /*
          {
              id: -1,
              name: foodName,
              unit
          }
          */
      ],
      validFoods: [
        {
          id: 0,
          name: "Eggs",
          unitType: "count"
        },
        {
          id: 1,
          name: "Milk",
          unitType: "volume"
        },
        {
          id: 2,
          name: "Oatmeal",
          unitType: "volume"
        },
        {
          id: 3,
          name: "Apples",
          unitType: "count"
        }
      ],
      unitTypes: [
        {
          type: "volume",
          units: [
            "teaspoon",
            "tablespoon",
            "fluid oz",
            "pint",
            "cup",
            "quart",
            "gallon",
            "milliliter",
            "liter"
          ]
        },
        {
          type: "weight",
          units: ["ounce", "pound", "gram", "kilogram"]
        },
        {
          type: "count",
          units: [""]
        }
      ]
    };
  },
  methods: {
    removeIngredient(item) {
      for (var i = 0; i < this.userInventory.length; i++) {
        if (this.userInventory[i].id == item.id) {
          this.userInventory.splice(i, 1);
        }
      }
    },
    getFoodIdFromName(name) {
      return this.validFoods.find((item) => item.name == name).id;
    },
    getFoodName(id) {
      return this.validFoods.find((item) => item.id == id).name;
    },
    getFoodUnitType(id) {
      return this.validFoods.find((item) => item.id == id).unitType;
    },
    getFoodItem(id) {
      return this.validFoods.find((item) => item.id == id);
    },
    getFoodUnitList(id) {
      return this.unitTypes.find(
        (item) => item.type == this.getFoodUnitType(id)
      ).units;
    },
    userHasIngredient(id) {
      return this.userInventory.find((item) => item.id == id) != undefined;
    },
    sortUserInventory() {
      this.userInventory.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    addIngredient() {
      // Valid food
      var inputId = this.getFoodIdFromName(this.userInputName);

      //User has it already
      if (this.userHasIngredient(inputId)) {
        return;
      }

      if (inputId != undefined) {
        this.userInventory.push({
          id: inputId,
          name: this.getFoodName(inputId),
          amount: this.userInputAmount,
          unit: this.userInputUnit
        });
        this.sortUserInventory();
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
}
</style>
