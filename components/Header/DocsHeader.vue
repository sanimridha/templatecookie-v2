<template>
  <header class="w-full py-3 bg-white shadow-6xl z-50">
    <div class="container relative">
      <div class="flex items-center justify-between">
        <div>
          <nuxt-link to="/docs">
            <img :src="fixImageUrl(data.logo)" alt="Templatecookie" />
          </nuxt-link>
        </div>
        <!-- menu  -->
        <div class="hidden lg:block">
          <div class="flex items-center">
            <nuxt-link to="/products" class="flex items-center justify-center text-white hover:text-white text-button capitalize font-medium bg-blue-0b hover:bg-dark-06 overflow-hidden rounded px-8 w-full whitespace-nowrap text-center">
              Browse Products
              <span class="inline-block ml-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.75 12H20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </nuxt-link>
          </div>
        </div>
        <!-- Toggole -->
        <div class="lg:hidden">
          <div @click="openSidebar" :class="`toggle ${toggleStatus === true ? 'active' : ''} `">
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar  -->
    <transition name="fade">
      <div class="sidebar absolute left-0 top-full w-full bg-white h-screen max-w-300 block lg:hidden z-50"
        v-if="sideBar">
        <div class="py-6">
          <ul class="sidebar-menu">
            <li class="sidebar-menu__button">
              <nuxt-link to="/products" class="text-white hover:text-white text-button capitalize font-medium bg-blue-0b hover:bg-dark-06 overflow-hidden rounded inline-block px-5 w-full text-center">
                Browse products
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>
</template>
<script>
export default {
  name: "Header",
  props: ['data'],
  data() {
    return {
      toggleStatus: false,
      sideBar: false,
    };
  },
  methods: {
    openSidebar() {
      this.toggleStatus = !this.toggleStatus;
      this.sideBar = !this.sideBar;
      document.body.classList.toggle("overlay");
    },
  },
};
</script>
