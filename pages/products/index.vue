<template>
  <div>
    <!-- Banner  -->
    <section class="realtive pb-14 lg:pb-72 pt-156 bg-no-repeat bg-center bg-cover"
      :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="container">
        <!-- banner content  -->
        <div class="text-center">
          <h1 class="text-4xl md:text-heading-40 text-dark-06 mb-6 max-w-680 mx-auto font-semibold">
            {{ page.info.title }}
          </h1>
          <p class="text-lg md:text-body-18 text-dark-06 mb-8 max-w-full md:max-w-536 mx-auto font-light">
            {{ page.info.description }}
          </p>

          <!-- Templates Tabs Menu  -->
          <div class="grid grid-cols-2 lg:grid-cols-3 items-center bg-white relative rounded px-6">
            <!-- Tab menu  -->
            <div class="col-span-full lg:col-span-2">
              <ul class="flex items-center justify-center lg:justify-start feature relative">
                <li @click="setTechnology('')">
                  <div class="flex flex-col items-center feature-box group" :class="activeTechnology == '' ? 'is-active' : ''">
                    <span class="feature-box__icon inline-block mb-3">
                      <img src="../../assets/images/svg/all.svg" alt="version" />
                    </span>
                    <h6 class="feature-box__title text-body-16 capitalize text-gray-61 text-gray-6a group-hover:text-dark-06">
                      All
                    </h6>
                  </div>
                </li>
                <li v-for="(item, index) in technologies" :key="index" @click="setTechnology(item.attributes.slug)">
                  <div class="flex flex-col items-center feature-box group" :class="activeTechnology == item.attributes.slug ? 'is-active' : ''">
                    <span class="feature-box__icon inline-block mb-3">
                      <img :src="fixImageUrl(item.attributes.icon)" alt="version" />
                    </span>
                    <h6 class="feature-box__title text-body-16 capitalize text-gray-61 text-gray-6a group-hover:text-dark-06">
                      {{ item.attributes.name }}
                    </h6>
                  </div>
                </li>
              </ul>
            </div>
            <!-- Sort List  -->
            <div class="col-span-full lg:col-span-1 py-4 lg:py-0">
              <div class="flex items-center justify-center lg:justify-end space-x-3 sort-filter">
                <h5 class="whitespace-nowrap text-body-14 leading-5">
                  Category :
                </h5>
                <div class="w-200">
                  <v-select label="name" :clearable="false" placeholder="Select Category" v-model="selectedCategory" :options="categoryList" @input="setCategory" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Item content -->
    <section>
      <div class="container" v-if="products.length">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          <div v-for="(item, itemIndex) in products" :key="itemIndex" class="flex items-stretch">
            <ProductCard :product="item.attributes" :id="item.id" :large="true" />
          </div>
        </div>
        <!-- pagination   -->
        <div class="flex items-center justify-center py-7">
          <Pagination :data="pagination" v-on:goToPage="handleGoToPage"/>
        </div>
      </div>

      <div class="container py-16" v-else>
        <div class="text-center text-2xl pb-6 text-red-400">
          No products available, try with different filter!
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import bannerImg from "~/assets/images/all-img/img-five.png";
import Pagination from "~/components/Pagination.vue";
import ProductCard from "~/components/ProductCard.vue";
import PRODUCT_LISTING from '../../graphql/productListing'
import ALL_PRODUCTS from '../../graphql/allProducts'

export default {
  components: {
    Pagination,
    ProductCard,
  },
  head: {
    title: 'All Products Listing',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
  },
  async asyncData({ app, query, $config }) {
    const client = app.apolloProvider.defaultClient;

    const { data } = await client.query({
      query: PRODUCT_LISTING,
    })

    let productData = await client.query({
      query: ALL_PRODUCTS,
      variables: {
        page: parseInt(query.page || 1),
        pageSize: $config.dataPerPage,
        technology: query.technology || "",
        category: query.category || "",
      }
    })
    
    const products = productData.data.products.data;
    const pagination = productData.data.products?.meta?.pagination;
    const page = data.productListing.data?.attributes;
    const technologies = data.technologies.data;
    const categories = data.categories.data;
    
    return { page, products, pagination, technologies, categories }
  },
  data() {
    return {
      tabs: [],
      activeTechnology: "",
      bannerImg,
      selectedCategory: {},
      categoryList: [
        {
          name: "All Categories",
          slug: "",
        }
      ],
    };
  },
  methods: {
    handleGoToPage(event){
      this.$router.push({ query: { page: event } })
    },
    setTechnology(technology) {
      this.activeTechnology = technology;

      const query = {
        ...this.$route.query,
        technology: technology,
      }

      this.$router.push({ query: query })
    },
    setCategory(category) {
      const query = {
        ...this.$route.query,
        category: category.slug,
      }

      this.$router.push({ query: query })
    },
    setQueries(){
      this.categories.forEach(element => {
        this.categoryList.push(element.attributes);
      });
      
      this.activeTechnology = this.$route.query.technology || "";
  
      let category = this.categories.find(element  => element.attributes.slug === this.$route.query.category);
      this.selectedCategory = category ? category.attributes : this.categoryList[0];
    },
    async filterProducts(){
      const client = this.$nuxt.$apolloProvider.defaultClient;
      const query = this.$route.query

      const { data } = await client.query({
        query: ALL_PRODUCTS,
        variables: {
          page: parseInt(query.page || 1),
          pageSize: this.$config.dataPerPage,
          technology: query.technology || "",
          category: query.category || "",
        }
      })
      
      this.products = data.products.data;
      this.pagination = data.products?.meta?.pagination;
    }
  },
  watch: {
    '$route.query': {
      handler(query) {
        this.filterProducts();
      },
      // deep: true,
      // immediate: true
    },
  },
  mounted() {
    this.setQueries();
  },
};
</script>
