<template>
    <main id="main-container">
        <!-- Hero -->
        <Hero :title="title" :page="page" />
        <!-- END Hero -->
        <!-- Page Content -->

        <div class="content">
            <h2 class="content-heading">VUE32 Admin Tool</h2>
            <div class="row">
                <div class="col-md-12">
                    <div class="block block-rounded block-themed">
                        <div class="block-header bg-xeco-light">
                            <h3 class="block-title">{{ page }}</h3>
                        </div>
                        <div class="block-content">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="block block-rounded bg-gd-sublime">
                                        <div class="block-content block-content-full">
                                            <div class="row text-center">
                                                <div class="col-4 border-end border-black-op">
                                                    <div class="py-3">
                                                        <div class="item item-circle bg-black-25 mx-auto">
                                                            <i class="fa fa-thermometer-half text-white"></i>
                                                        </div>
                                                        <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                            °C
                                                        </p>
                                                        <p class="text-white-75 mb-0">
                                                            Temperatura Ambiente
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-4 border-end border-black-op">
                                                    <div class="py-3">
                                                        <div class="item item-circle bg-black-25 mx-auto">
                                                            <i class="fa fa-percent text-white"></i>
                                                        </div>
                                                        <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                            %HR
                                                        </p>
                                                        <p class="text-white-75 mb-0">
                                                            Humedad Ambiente
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="py-3">
                                                        <div class="item item-circle bg-black-25 mx-auto">
                                                            <i class="fa fa-percentage text-white"></i>
                                                        </div>
                                                        <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                            %HR
                                                        </p>
                                                        <p class="text-white-75 mb-0">
                                                            Humedad Suelo
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- END Timer Block -->








        <!-- END Page Content -->




    </main>
</template>

<script setup>
import Hero from "@/components/common/Hero.vue"


name: "Temperaturas"

const title = "Temperatura y Humedad"
const page = "Temperatura y Humedad"


</script>