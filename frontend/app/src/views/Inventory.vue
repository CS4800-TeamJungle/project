<template>
  <div class="inventory">
    <h1>Your Inventory</h1>

    <div id="inventoryUI">
      <div class="container justify-content-center" id="addIngredient">
        <vue-simple-suggest
          class="ingredientSearch"
          v-model="userInputName"
          ref="foodSelect"
          :list="this.$store.state.validIngs"
          placeholder="Please enter ingredient name..."
          display-attribute="name"
          value-attribute="name"
          :filter-by-query="true"
        >
        </vue-simple-suggest>

        <input
          class="ingAddElement"
          id="inputAmount"
          type="text"
          v-model="userInputAmount"
          placeholder="Enter Amount"
        />

        <button
          class="ingAddElement btn btn-secondary"
          v-on:click="addIngredient()"
        >
          Add Ingredient
        </button>

        <button class="ingAddElement btn btn-secondary">Save Inventory</button>

        <input
          class="ingAddElement"
          id="inputAmount"
          type="text"
          v-model="userNumber"
          placeholder="phone number"
        />

        <button
          class="ingAddElement btn btn-secondary"
          key=""
          v-on:click="sendText()"
        >
          Send Text
        </button>
      </div>

      <div class="container" id="userInventory">
        <template v-if="this.$store.getters.getUserIngredientList().length > 0">
          <div
            class="inventoryItem"
            v-for="item in this.$store.state.userInventory"
            v-bind:key="item.id"
          >
            <font-awesome-icon
              v-on:click="removeIngredient(item)"
              icon="times"
            />
            {{ item.name }} - <input v-model="item.amount" />
          </div>
        </template>
        <template v-else>
          <h2 class="container text-center" id="emptyInventory">
            Your inventory is empty
          </h2></template
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css"; // Optional CSS

export default {
  name: "Inventory",
  components: { VueSimpleSuggest },
  data() {
    return {
      userInputName: "",
      userInputAmount: "",
      userNumber: "",
      options: {
        method: "POST",
        url: "https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/a/Messages.json",
        params: {
          to: "",
          body: "test",
          from: "+16106326075",
          statusCallback: "94024-6602"
        },
        headers: {
          "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
          "x-rapidapi-key": "1bc2e357a0mshecf7c7b674a810bp1b0f7ejsnfffa7ca10be4"
        }
      }
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
          amount: this.userInputAmount
        });
        this.$store.commit("sortInventory");
        this.userInputName = "";
        this.$refs.foodSelect.clearSuggestions();
        this.userInputAmount = "";
      }
    },
    sendText() {
      this.options.params.to = this.userNumber;
      this.options.params.body = this.$store.getters
        .getUserShoppingList()
        .join();
      console.log(this.options.params.body);
      axios
        .request(this.options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
div#addIngredient {
  display: flex;

  input#inputAmount {
    border: 1px solid #ccc;
  }

  .ingAddElement {
    margin-left: 10px;
  }

  div.vue-simple-suggest {
    width: 20%;
  }
}

div#userInventory {
  margin-top: 20px;
  padding-top: 20px;
  background-color: white;
  box-shadow: 0 0 10px;
  text-align: left;
  min-height: calc(100vh - 220px);

  div.inventoryItem {
    margin-bottom: 5px;
  }

  #emptyInventory {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
