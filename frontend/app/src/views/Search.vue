<template>
  <div class="search">
    <h1>Search Recipes</h1>
    <div class="container" id="searchUI">
      <div class="container justify-content-center" id="addSearchIngredients">
        <vue-simple-suggest
          class="ingredientSearch"
          v-model="userInputName"
          :list="this.$store.state.validIngs"
          placeholder="Please enter ingredient name..."
          display-attribute="name"
          value-attribute="name"
          :filter-by-query="true"
        >
        </vue-simple-suggest>

        <button
          class="ingAddElement btn btn-secondary"
          v-on:click="addSearchIngredient()"
        >
          Add Ingredient
        </button>
      </div>
      <div id="searchIngredients">
        <div
          class="additionalIngredients"
          v-for="item in this.searchIngredients"
          v-bind:key="item"
        >
          <font-awesome-icon v-on:click="removeIngredient(item)" icon="times" />
          {{ item }}
        </div>
      </div>

      <div id="recipeResults">
        <template v-if="this.recipes.length > 0">
          <div
            class="recipe"
            v-for="recipe in this.recipes.slice(
              this.currentPageIndex * this.recipesPerPage,
              this.currentPageIndex * this.recipesPerPage + this.recipesPerPage
            )"
            v-bind:key="recipe.index"
          >
            {{ recipe.title }} |
            <a class="recipe-link" v-bind:href="'https://' + recipe.link">{{
              recipe.link
            }}</a>
            <br />
            <span class="tags">
              Tags:
              <template v-for="tag in recipe.NER">{{ tag }} </template>
            </span>
            <hr />
            <Collapsible
              class="collapsible-steps"
              :isOpen="false"
              openLabel="Show less"
              closedLabel="Show more"
            >
              <div class="ingredients">
                <span class="ingredientsTitle">Ingredients</span>
                <div
                  v-for="(ing, index) in recipe.ingredients"
                  v-bind:key="ing.name"
                >
                  {{ index + 1 }}. {{ ing }}
                </div>
              </div>

              <div class="steps">
                <span class="spanTitle">Steps</span>
                <div
                  v-for="(step, index) in recipe.directions"
                  v-bind:key="step.name"
                >
                  {{ index + 1 }}. {{ step }}
                </div>
              </div>
            </Collapsible>
          </div>

          <div class="navigation">
            <font-awesome-icon
              class="nav-arrows"
              v-on:click="pageLeft()"
              style="float: left"
              icon="angle-double-left"
              size="2x"
            />

            <font-awesome-icon
              class="nav-arrows"
              v-on:click="pageRight()"
              style="float: right"
              icon="angle-double-right"
              size="2x"
            />
            <div>{{ this.currentPageIndex + 1 }} / {{ this.loadedPages }}</div>
          </div>
        </template>

        <template
          v-else-if="
            this.recipes.length == 0 &&
            (this.userInventoryLength > 0 || this.searchIngredients.length > 0)
          "
        >
          <div class="container" id="loading"><h3>Loading...</h3></div>
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
import "vue-collapsible-component/lib/vue-collapsible.css";
import Collapsible from "vue-collapsible-component";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css"; // Optional CSS

export default {
  name: "Search",
  components: { Collapsible, VueSimpleSuggest },
  data() {
    return {
      userInputName: "",
      searchIngredients: [], //
      recipes: [], //An array holding the recipe objects
      recipesPerPage: 5, //The amount of recipes to show per page
      currentPageIndex: 0, //The index of the current page the user is viewing
      fetchAmount: 10, //The amount of recipes to fetch in each request
      endReached: false //Set to true when the amount of retrieved recipes doesn't equal the amount requested, and prevents further recipe requests
    };
  },
  computed: {
    //loadedPages stores how many total pages are available based on how many recipes are stored and how many recipes appear per page
    //Because it is a computed property anytime this.recipes.length or this.recipesPerPage change it is re-evaluated
    loadedPages: function () {
      return Math.ceil(this.recipes.length / this.recipesPerPage);
    },
    userInventoryLength: function () {
      return this.$store.getters.getUserIngredientList().length;
    },
    endRecipeIndex: function () {
      return this.recipes[this.recipes.length - 1].index;
    }
  },
  // This function is run each time the search result page is loaded
  created() {
    //If the user has ingredients send a request to the API for recipes
    if (this.userInventoryLength !== 0) {
      this.fetchRecipesFromAPI(0, this.fetchAmount);
    }
  },
  methods: {
    pageLeft() {
      if (this.currentPageIndex > 0) {
        this.currentPageIndex--;
      }
    },
    pageRight() {
      if (this.currentPageIndex < this.loadedPages - 1) {
        this.currentPageIndex++;
      }
      //If the user is within a page of the last loaded page send a request for more recipes
      if (
        (this.userInventoryLength !== 0 ||
          this.searchIngredients.length !== 0) &&
        this.loadedPages - 1 - 1 <= this.currentPageIndex &&
        !this.endReached
      ) {
        this.fetchRecipesFromAPI(this.endRecipeIndex + 1, this.fetchAmount);
      }
    },
    //Uses a post request to retrieve a list of recipes
    //start: fetch recipes starting with the recipe with this index.
    //        Note: this index is an identifier of the recipe itself and doesn't reflect it's position in the database search results or in this.recipes
    //amount: the amount of recipes to fetch
    //Results:
    //          If successful this.recipes is concatenated with the results of the search
    fetchRecipesFromAPI(startID, amount) {
      console.log("Fetching recipes...");
      axios
        .post("https://www.junglekitchen.top/api/search_v2", {
          NER: this.$store.getters
            .getUserIngredientList()
            .concat(this.searchIngredients),
          start_id: startID,
          amount: amount
        })
        .then((res) => {
          if (!this.endReached && amount != res.data.recipes.length) {
            this.endReached = true;
          }
          this.recipes = this.recipes.concat(res.data.recipes);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addSearchIngredient() {
      if (this.searchIngredients.indexOf(this.userInputName) === -1) {
        this.searchIngredients.push(this.userInputName);
        this.userInputName = "";
        this.refreshRecipes();
        this.currentPageIndex = 0;
        this.endReached = false;
      }
    },
    removeIngredient(item) {
      this.searchIngredients.splice(this.searchIngredients.indexOf(item), 1);
      this.refreshRecipes();
      this.currentPageIndex = 0;
      this.endReached = false;
    },
    refreshRecipes() {
      this.recipes = [];
      this.fetchRecipesFromAPI(0, this.fetchAmount);
    }
  }
};
</script>

<style scoped lang="scss">
div#addSearchIngredients {
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

div#searchIngredients {
  display: inline-flex;
  margin-top: 10px;

  div.additionalIngredients {
    margin-right: 10px;
    background-color: white;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 500px;
    box-shadow: 0 0 5px;
  }
}

div#recipeResults {
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color: white;
  box-shadow: 0 0 10px;
  min-height: calc(100vh - 150px);
  margin-bottom: 20px;

  div.recipe {
    border-style: solid;
    background-color: #ffffff;
    border-width: 1px;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;

    span.tags {
      font-size: 75%;
    }

    div.ingredients,
    div.steps {
      float: left;
      text-align: left;
    }

    div.ingredients {
      margin-right: 20px;
    }
  }

  .nav-arrows {
    border: 1px solid;
    border-radius: 5px;
    padding-right: 4px;
    padding-left: 2px;
  }

  #emptyInventory {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
