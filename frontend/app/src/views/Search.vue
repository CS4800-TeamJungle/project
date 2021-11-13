<template>
  <div class="search">
    <h1 v-on:click="searchRecipes()">This is a search page</h1>
    <div id="searchUI">
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
    </div>
    <div>
      <font-awesome-icon
        v-on:click="pageLeft()"
        style="float: left"
        icon="angle-double-left"
        size="1x"
      />
      <div>{{ this.currentPageIndex + 1 }} / {{ this.loadedPages }}</div>
      <font-awesome-icon
        v-on:click="pageRight()"
        style="float: right"
        icon="angle-double-right"
        size="1x"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "vue-collapsible-component/lib/vue-collapsible.css";
import Collapsible from "vue-collapsible-component";

export default {
  name: "Search",
  components: { Collapsible },
  data() {
    return {
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
        this.userInventoryLength !== 0 &&
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
          NER: this.$store.getters.getUserIngredientList(),
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
    }
  }
};
</script>

<style scoped>
div#searchUI {
  text-align: left;
}

div.recipe {
  border-style: solid;
  background-color: #ffffff;
  border-width: 1px;
  border-radius: 10px;
  border-style: solid;
  padding: 10px;
  margin-bottom: 10px;
}

span.tags {
  font-size: 75%;
}

div.ingredients,
div.steps {
  float: left;
}

div.ingredients {
  margin-right: 20px;
}
</style>
