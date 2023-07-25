<template>
    <div class="col-md-12 col-xl-6">
        <p class="text-uppercase fs-sm fw-bold text-center mt-2 mb-4">
            {{ control }}
        </p>
        <button type="button" class="btn btn-primary push" data-bs-toggle="modal" data-bs-target="#modal-block-popout"><i
                class="fa fa-wrench"></i></button>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block block-rounded bg-gd-sublime">
                            <div class="block-content block-content-full">
                                <div class="row text-center">
                                    <div class="col-4 border-end border-black-op">
                                        <div class="py-3">
                                            <div class="item item-circle bg-black-25 mx-auto">
                                                <i class="fa fa-thermometer-half text-white"></i>
                                            </div>
                                            <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                {{ valuesth.temperatura_ambiente }}º
                                            </p>
                                            <p class="text-white-65 fs-6 mb-0">
                                                Temperat. Ambiente
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-4 border-end border-black-op">
                                        <div class="py-3">
                                            <div class="item item-circle bg-black-25 mx-auto">
                                                <i class="fa fa-percent text-white"></i>
                                            </div>
                                            <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                {{ valuesth.humedad_ambiente }}%
                                            </p>
                                            <p class="text-white-65 mb-0">
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
                                                {{ valuesth.humedad_suelo }}%
                                            </p>
                                            <p class="text-white-65 mb-0">
                                                Humedad Suelo 1
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
   
   
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block block-rounded bg-gd-sublime">
                            <div class="block-content block-content-full">
                                <div class="row text-center">
                                    
                                        <div class="col-4 border-end border-black-op">
                                            <div class="py-3">
                                                <div class="item item-circle bg-black-25 mx-auto">
                                                    <i class="fa fa-percentage text-white"></i>
                                                </div>
                                                <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                    {{ valuesth.humedad_suelo2 }}%
                                                </p>
                                                <p class="text-white-65 mb-0">
                                                    Humedad Suelo 2
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-4 border-end border-black-op">
                                            <div class="py-3">
                                                <div class="item item-circle bg-black-25 mx-auto">
                                                    <i class="fa fa-percentage text-white"></i>
                                                </div>
                                                <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                    {{ valuesth.humedad_suelo3 }}%
                                                </p>
                                                <p class="text-white-65 mb-0">
                                                    Humedad Suelo 3
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="py-3">
                                                <div class="item item-circle bg-black-25 mx-auto">
                                                    <i class="fa fa-percentage text-white"></i>
                                                </div>
                                                <p class="text-white fs-1 fw-medium mt-3 mb-0">
                                                    {{ valuesth.humedad_suelo4 }}%
                                                </p>
                                                <p class="text-white-65 mb-0">
                                                    Humedad Suelo 4
                                                </p>
                                            </div>
                                        </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>



    <!-- Pop Out Block Modal -->
    <div class="modal fade" id="modal-block-popout" tabindex="-1" role="dialog" aria-labelledby="modal-block-popout"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-popout modal-lg" role="document">
            <div class="modal-content">
                <div class="block block-rounded block-themed block-transparent mb-0">
                    <div class="block-header bg-primary-dark">
                        <h3 class="block-title">OFFSET VALORES SENSORES</h3>
                        <div class="block-options">
                            <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
                                <i class="fa fa-fw fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="block-content">
                        <form class="form form-vertical" @submit.prevent="handleSubmit()">
                            <div class="row push">
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-group">
                                        <fieldset class="form-group">
                                            <label class="form-label" for="relay_pin">Correción Temperatura Ambiente</label>
                                            <select class="form-select" id="relay_pin" v-model.number="valuesth.temp_amb_offs">
                                                <option value="-5">-5</option>
                                                <option value="-4">-4</option>
                                                <option value="-3">-3</option>
                                                <option value="-2">-2</option>
                                                <option value="-1">-1</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-group">
                                        <fieldset class="form-group">
                                            <label class="form-label" for="relay_pin">Correción Humedad Ambiente</label>
                                            <select class="form-select" id="relay_pin" v-model.number="valuesth.hum_amb_offs">
                                                <option value="-30">-30</option>
                                                <option value="-20">-20</option>
                                                <option value="-10">-10</option>
                                                <option value="0">0</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-group">
                                        <fieldset class="form-group">
                                            <label class="form-label" for="relay_pin">Correción Humedad Suelo 1</label>
                                            <select class="form-select" id="relay_pin" v-model.number="valuesth.hum_sue_offs">
                                                <option value="-30">-30</option>
                                                <option value="-20">-20</option>
                                                <option value="-10">-10</option>
                                                <option value="0">0</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-group">
                                        <fieldset class="form-group">
                                            <label class="form-label" for="relay_pin">Correción Humedad Suelo 2</label>
                                            <select class="form-select" id="relay_pin" v-model.number="valuesth.hum_sue2_offs">
                                                <option value="-30">-30</option>
                                                <option value="-20">-20</option>
                                                <option value="-10">-10</option>
                                                <option value="0">0</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-group">
                                        <fieldset class="form-group">
                                            <label class="form-label" for="relay_pin">Correción Humedad Suelo 3</label>
                                            <select class="form-select" id="relay_pin" v-model.number="valuesth.hum_sue3_offs">
                                                <option value="-30">-30</option>
                                                <option value="-20">-20</option>
                                                <option value="-10">-10</option>
                                                <option value="0">0</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 mb-2">
                                    <div class="form-group">
                                        <fieldset class="form-group">
                                            <label class="form-label" for="relay_pin">Correción Humedad Suelo 4</label>
                                            <select class="form-select" id="relay_pin" v-model.number="valuesth.hum_sue4_offs">
                                                <option value="-30">-30</option>
                                                <option value="-20">-20</option>
                                                <option value="-10">-10</option>
                                                <option value="0">0</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>



                                <div class="mb-2 mt-2">
                                    <button type="submit" class="btn btn-alt-success me-1">
                                        <i class="fa fa-fw fa-save opacity-50 me-1"></i> Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END Pop Out Block Modal -->
</template>

<script>

import useApp from "@/composables/useApp"
import { ref, computed, onMounted, watch } from 'vue'

export default {
    name: "Relays",
    props: {
        control: {
            type: String,
            default: "VUE32 Admin Tool"
        }
    },
    setup() {

        // Variables 

        const { command, host, swal, reloadPage, ToastMsgError, ToastMsgSuccess, temperature_update } = useApp()

        const valuesth = ref({
            temperatura_ambiente: "0",
            humedad_ambiente: "0",
            humedad_suelo: "0",
            humedad_suelo2: "0",
            humedad_suelo3: "0",
            humedad_suelo4: "0",
            temp_amb_offs: 0,
            hum_amb_offs: 0,
            hum_sue_offs: 0,
            hum_sue2_offs: 0,
            hum_sue3_offs: 0,
            hum_sue4_offs: 0
        })

        

        // Cuando se monte el componente
        onMounted(() => {
            get_valuesth_settings()
        })
        // manejador del evento submit
        const handleSubmit = () => {
            showAlertConfirm("Guardar Ajustes de los Sensores", "¿Está seguro de guardar la Configuración actual?", "question")
        }

        // swal
        const showAlertConfirm = (title, text, icon) => {
            swal({
                title: `${title}`,
                text: `${text}`,
                icon: `${icon}`,
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    post_valuesth_settings()
                }
            })
        }

        // Método GET de los Datos
        const get_valuesth_settings = async () => {
            const url = `http://${host}/api/valoresth`
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((datos) => {
                    if (datos.code == 1) {
                        valuesth.value = datos.data
                    } else {
                        ToastMsgError(`"Error no son datos válidos"`, "lightbulb", 5000)
                    }
                })
                .catch((error) => {
                    ToastMsgError(`Error : ${error}`, "lightbulb", 5000)
                })
        }

        // Método POST envío de los Datos
        const post_valuesth_settings = async () => {
            const url = `http://${host}/api/valoresth`
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valuesth.value)
            })
                .then((res) => res.json())
                .then((datos) => {
                    if (datos.save) {
                        ToastMsgSuccess(`"Configuración valores temp/hum guardada correctamente"`, "lightbulb", 5000)
                        reloadPage("temperature", 7000)
                    }
                })
                .catch((error) => {
                    ToastMsgError(`Error : ${error}`, "lightbulb", 5000)
                })
        }

        //Actualizar los datos de temperatura y humedad recibidos por ws (websockets)
        watch(() => temperature_update.value,
            ({ temperatura_ambiente, humedad_ambiente, humedad_suelo, humedad_suelo2, humedad_suelo3, humedad_suelo4 }) => {
                valuesth.value.temperatura_ambiente = temperatura_ambiente
                valuesth.value.humedad_ambiente = humedad_ambiente
                valuesth.value.humedad_suelo = humedad_suelo
                valuesth.value.humedad_suelo2 = humedad_suelo2
                valuesth.value.humedad_suelo3 = humedad_suelo3
                valuesth.value.humedad_suelo4 = humedad_suelo4
                
            })

        return {
            valuesth,
            handleSubmit
            
        }

    }
}
</script>