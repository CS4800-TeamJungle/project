import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: 0,
    userInventory: [],
    validIngs: [
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
  },
  getters: {
    getIngIdFromName: (state) => (name) => {
      return state.validIngs.find((item) => item.name == name).id;
    },
    getIngById: (state) => (id) => {
      return state.validIngs.find((item) => item.id == id);
    },
    getIngUnitList: (state, getters) => (id) => {
      return state.unitTypes.find(
        (item) => item.type == getters.getIngById(id).unitType
      ).units;
    },
    userHasIngredient: (state) => (id) => {
      return state.userInventory.find((item) => item.id == id) != undefined;
    },
    getUserIngredientList: (state) => () => {
      return state.userInventory.map(function (item) {
        return item.name;
      });
    }
  },
  mutations: {
    addIngredient(state, ingredient) {
      console.log(JSON.stringify(ingredient));
      state.userInventory.push(ingredient);
    },
    removeIngredient(state, ingredientId) {
      for (var i = 0; i < state.userInventory.length; i++) {
        if (state.userInventory[i].id == ingredientId) {
          state.userInventory.splice(i, 1);
        }
      }
    },
    sortInventory(state) {
      state.userInventory.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
  },
  actions: {},
  modules: {}
});
