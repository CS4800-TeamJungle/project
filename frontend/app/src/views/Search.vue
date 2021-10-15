<template>
  <div class="search">
    <h1>This is a search page</h1>
    <div id="searchUI">
      <div
        class="recipe"
        v-for="recipe in this.recipes"
        v-bind:key="recipe.title"
      >
        {{ recipe.title }} |
        <a class="recipe-link" v-bind:href="recipe.link">{{ recipe.link }}</a>
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
      recipes: [
        {
          title: "Grilled Cheese",
          ingredients: ["cheese", "bread", "mayonnaise"],
          directions: [
            "add mayo to bread",
            "add kraft american cheese single to taste",
            "heat bread",
            "profit?"
          ],
          link: "https://www.cpp.edu/grilled-cheese",
          NER: ["easy", "food"]
        },
        {
          title: "Soup",
          ingredients: ["soup"],
          directions: ["heat the soup"],
          link: "https://www.cpp.edu/soup",
          NER: ["easy", "food"]
        }
      ]
    };
  },
  methods: {}
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
