<template>
  <div>
    <Header />
    <nuxt />
    <!-- newsletter  -->
    <Newsletter />
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import SocialLink from "../components/SocialLink.vue";
import globalQuery from "../graphql/global";
import Newsletter from "../components/Newsletter.vue";

export default {
  components: { Header, Footer, SocialLink, Newsletter },
  apollo: {
    characters: {
      query: global,
      prefetch: true,
    },
  },
  data() {
    return {
      global: null,
    }
  },
  apollo: {
    global: {
      prefetch: true,
      query: globalQuery,
    }
  },
}
</script>
