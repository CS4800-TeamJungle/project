<template>
  <div class="search">
    <h1>This is a search page</h1>
    <div id="searchUI">
      <div
        class="recipe"
        v-for="recipe in this.recipes.slice(
          this.currentPageIndex * this.recipesPerPage,
          this.currentPageIndex * this.recipesPerPage + this.recipesPerPage
        )"
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
    <div>
      <font-awesome-icon
        v-on:click="pageLeft()"
        style="float: left"
        icon="angle-double-left"
        size="1x"
      />
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
      recipes: [
        {
          id: 0,
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
          id: 1,
          title: "Soup",
          ingredients: ["soup"],
          directions: ["heat the soup"],
          link: "https://www.cpp.edu/soup",
          NER: ["easy", "food"]
        },
        {
          id: 2,
          title: "Gah",
          ingredients: ["soup"],
          directions: ["heat the soup"],
          link: "https://www.cpp.edu/soup",
          NER: ["easy", "food"]
        },
        {
          id: 3,
          title: "F",
          ingredients: ["soup"],
          directions: ["heat the soup"],
          link: "https://www.cpp.edu/soup",
          NER: ["easy", "food"]
        },
        {
          id: 4,
          title: "FSDf",
          ingredients: ["soup"],
          directions: ["heat the soup"],
          link: "https://www.cpp.edu/soup",
          NER: ["easy", "food"]
        },
        {
          id: 5,
          title: "DFSD",
          ingredients: ["soup"],
          directions: ["heat the soup"],
          link: "https://www.cpp.edu/soup",
          NER: ["easy", "food"]
        }
      ],
      recipesPerPage: 4,
      currentPageIndex: 0
    };
  },
  methods: {
    pageLeft() {
      if (this.currentPageIndex > 0) {
        this.currentPageIndex--;
      }
    },
    pageRight() {
      var maxPages = Math.ceil(this.recipes.length / this.recipesPerPage);
      if (this.currentPageIndex < maxPages - 1) {
        this.currentPageIndex++;
      }
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
