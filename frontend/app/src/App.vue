<template>
  <div id="app">
    <div class="header-container container-fluid">
      <header class="d-flex justify-content-center py-2">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/inventory"
              >Inventory</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search"
              >Search Recipes</router-link
            >
          </li>
        </ul>
      </header>
    </div>

    <!--div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/inventory">Inventory</router-link> |
      <router-link to="/search">Search Recipes</router-link>
    </div -->
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background-color: #e3e3e3;
}

div.container-fluid {
  background-color: white;
  box-shadow: 0 0 10px;
}

div.header-container {
  margin-bottom: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-pills {
  a {
    &.router-link-exact-active {
      color: #fff;
      background-color: #0d6efd;
    }
  }
}
</style>

<script>
export default {
  setup() {},
  name: "Home",
  components: {},
  data() {
    return {};
  }
};
</script>
