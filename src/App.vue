<template>
  <!-- Page Container -->
  <div id="page-container" class="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed page-header-dark">
    <!-- Sidebar -->
    <Sidebar/>
    <!-- End Sidebar -->
    <!-- Header -->
    <Header/>
    <!-- End Header -->
    <!-- Main Container 
      @ToastMsg = "ToastMsg"
      @ToastMsgError = "ToastMsgError"
      @ToastMsgWarning = "ToastMsgWarning"
      @ToastMsgInfo = "ToastMsgInfo"
      @ToastMsgSuccess = "ToastMsgSuccess"
    -->
    <router-view />
    <!-- End Main Container -->
    <!-- Footer -->
    <Footer/>
    <!-- End Footer -->
  </div>
  <!-- END Page Container -->
</template>

<script>

import { loadScript } from 'vue-plugin-load-script'
import { onMounted } from "vue";
 
import Sidebar from "@/components/Sidebar.vue"
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

import useApp from "@/composables/useApp"

export default { 
  components: { 
    Sidebar,
    Header,
    Footer 
  },
  name: "App",
  setup(){

     onMounted(()=>{
       loadScript("../../js/dashmix.app.min.js")
       createWebSockets()
     })

    const {
      createWebSockets
    } = useApp()    

    return{
     // 
    }
    
  }
}
</script>
