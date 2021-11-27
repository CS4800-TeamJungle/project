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
        name: "blackberry"
      },
      {
        id: 1,
        name: "worcestershire sauce"
      },
      {
        id: 2,
        name: "almond"
      },
      {
        id: 3,
        name: "almond butter"
      },
      {
        id: 4,
        name: "apples"
      },
      {
        id: 5,
        name: "applesauce"
      },
      {
        id: 6,
        name: "avocado"
      },
      {
        id: 7,
        name: "bacon"
      },
      {
        id: 8,
        name: "baguette"
      },
      {
        id: 9,
        name: "baking soda"
      },
      {
        id: 10,
        name: "basil"
      },
      {
        id: 11,
        name: "bay leaf"
      },
      {
        id: 12,
        name: "beef"
      },
      {
        id: 13,
        name: "black beans"
      },
      {
        id: 14,
        name: "blueberries"
      },
      {
        id: 15,
        name: "bread"
      },
      {
        id: 16,
        name: "brown sugar"
      },
      {
        id: 17,
        name: "brussel sprouts"
      },
      {
        id: 18,
        name: "butter"
      },
      {
        id: 19,
        name: "buttermilk"
      },
      {
        id: 20,
        name: "cabbage"
      },
      {
        id: 21,
        name: "cajun"
      },
      {
        id: 22,
        name: "calamari"
      },
      {
        id: 23,
        name: "carrots"
      },
      {
        id: 24,
        name: "cashews"
      },
      {
        id: 25,
        name: "cauliflower"
      },
      {
        id: 26,
        name: "celery"
      },
      {
        id: 27,
        name: "cheddar"
      },
      {
        id: 28,
        name: "chestnuts"
      },
      {
        id: 29,
        name: "chicken"
      },
      {
        id: 30,
        name: "chili beans"
      },
      {
        id: 31,
        name: "chorizo sausage"
      },
      {
        id: 32,
        name: "cider"
      },
      {
        id: 33,
        name: "cilantro"
      },
      {
        id: 34,
        name: "cinnamon"
      },
      {
        id: 35,
        name: "coconut"
      },
      {
        id: 36,
        name: "cornstarch"
      },
      {
        id: 37,
        name: "cranberries"
      },
      {
        id: 38,
        name: "cucumber"
      },
      {
        id: 39,
        name: "cumin"
      },
      {
        id: 40,
        name: "eggs"
      },
      {
        id: 41,
        name: "elbow macaroni"
      },
      {
        id: 42,
        name: "flour"
      },
      {
        id: 43,
        name: "frozen peas"
      },
      {
        id: 44,
        name: "garbanzo beans"
      },
      {
        id: 45,
        name: "garlic"
      },
      {
        id: 46,
        name: "greek yogurt"
      },
      {
        id: 47,
        name: "green beans"
      },
      {
        id: 48,
        name: "green onions"
      },
      {
        id: 49,
        name: "green pepper"
      },
      {
        id: 50,
        name: "ground beef"
      },
      {
        id: 51,
        name: "halibut"
      },
      {
        id: 52,
        name: "ham"
      },
      {
        id: 53,
        name: "hamburger"
      },
      {
        id: 54,
        name: "heavy cream"
      },
      {
        id: 55,
        name: "herries"
      },
      {
        id: 56,
        name: "italian sausage"
      },
      {
        id: 57,
        name: "ketchup"
      },
      {
        id: 58,
        name: "kidney beans"
      },
      {
        id: 59,
        name: "kosher salta"
      },
      {
        id: 60,
        name: "lamb"
      },
      {
        id: 61,
        name: "lemon"
      },
      {
        id: 62,
        name: "lemon juice"
      },
      {
        id: 63,
        name: "lentil"
      },
      {
        id: 64,
        name: "lettuce"
      },
      {
        id: 65,
        name: "lima beans"
      },
      {
        id: 66,
        name: "lime"
      },
      {
        id: 67,
        name: "lime juice"
      },
      {
        id: 68,
        name: "mango"
      },
      {
        id: 69,
        name: "mayonnaise"
      },
      {
        id: 70,
        name: "meatballs"
      },
      {
        id: 71,
        name: "milk"
      },
      {
        id: 72,
        name: "molasses"
      },
      {
        id: 73,
        name: "mozzarella"
      },
      {
        id: 74,
        name: "mushrooms"
      },
      {
        id: 75,
        name: "mussels"
      },
      {
        id: 76,
        name: "mustard"
      },
      {
        id: 77,
        name: "oatmeal"
      },
      {
        id: 78,
        name: "oats"
      },
      {
        id: 79,
        name: "olive"
      },
      {
        id: 80,
        name: "olive oil"
      },
      {
        id: 81,
        name: "onion"
      },
      {
        id: 82,
        name: "oregano"
      },
      {
        id: 83,
        name: "pasta"
      },
      {
        id: 84,
        name: "peanut butter"
      },
      {
        id: 85,
        name: "peanut oil"
      },
      {
        id: 86,
        name: "pecans"
      },
      {
        id: 87,
        name: "pepper"
      },
      {
        id: 88,
        name: "pineapple"
      },
      {
        id: 89,
        name: "pork loin"
      },
      {
        id: 90,
        name: "potatoes"
      },
      {
        id: 91,
        name: "provolone"
      },
      {
        id: 92,
        name: "red wine vinegar"
      },
      {
        id: 93,
        name: "relish"
      },
      {
        id: 94,
        name: "rice"
      },
      {
        id: 95,
        name: "ricotta"
      },
      {
        id: 96,
        name: "rum"
      },
      {
        id: 97,
        name: "rye bread"
      },
      {
        id: 98,
        name: "salmon"
      },
      {
        id: 99,
        name: "salsa"
      },
      {
        id: 100,
        name: "salt"
      },
      {
        id: 101,
        name: "sesame oil"
      },
      {
        id: 102,
        name: "shitake mushrooms"
      },
      {
        id: 103,
        name: "sour cream"
      },
      {
        id: 104,
        name: "spaghetti"
      },
      {
        id: 105,
        name: "spinach"
      },
      {
        id: 106,
        name: "squash"
      },
      {
        id: 107,
        name: "strawberries"
      },
      {
        id: 108,
        name: "sugar"
      },
      {
        id: 109,
        name: "thyme"
      },
      {
        id: 110,
        name: "tomatoes"
      },
      {
        id: 111,
        name: "tortilla"
      },
      {
        id: 112,
        name: "turkey"
      },
      {
        id: 113,
        name: "venison"
      },
      {
        id: 114,
        name: "vinegar"
      },
      {
        id: 115,
        name: "water"
      },
      {
        id: 116,
        name: "whip cream"
      },
      {
        id: 117,
        name: "white wine"
      },
      {
        id: 118,
        name: "yeast"
      },
      {
        id: 119,
        name: "yogurt"
      },
      {
        id: 120,
        name: "zucchini"
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
