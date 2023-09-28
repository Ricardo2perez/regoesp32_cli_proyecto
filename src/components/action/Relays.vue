<template>
    <div class="col-md-4 col-xl-4">
        <p class="text-uppercase fs-sm fw-bold text-center mt-2 mb-4">
            {{ control }}
        </p>
        <a class="block block-rounded block-link-pop" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="col-md-4">
                    <button class="btn btn-info text-white text-uppercase " @click="handleclick('LR')"> <h2> {{ automatico
                    }}  <i :class="iconautman"></i></h2></button>
                </div>
                
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="me-3">
                    <button :disabled="manual" class="btn btn-warning text-white text-uppercase "
                        @click="handleclick('S1')">Salida 1</button>
                </div>
                <div class="item">
                    <i :class="activado1"></i>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="me-3">
                    <button :disabled="manual" class="btn btn-warning text-white text-uppercase "
                        @click="handleclick('S2')">Salida 2</button>
                </div>
                <div class="item">
                    <i :class="activado2"></i>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="me-3">
                    <button :disabled="manual" class="btn btn-warning text-white text-uppercase "
                        @click="handleclick('S3')">Salida 3</button>
                </div>
                <div class="item">
                    <i :class="activado3"></i>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="me-3">
                    <button :disabled="manual" class="btn btn-warning text-white text-uppercase "
                        @click="handleclick('S4')">Salida 4</button>
                </div>
                <div class="item">
                    <i :class="activado4"></i>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="me-3">
                    <button :disabled="manual" class="btn btn-warning text-white text-uppercase"
                        @click="handleclick('A1')">Actuador1</button>
                </div>
                <div class="item">
                    <i :class="actuador1"></i>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
                <div class="me-3">
                    <button :disabled="manual" class="btn btn-warning text-white text-uppercase "
                        @click="handleclick('A2')">Actuador2</button>
                </div>
                <div class="item">
                    <i :class="actuador2"></i>
                </div>
            </div>
        </a>
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

        const { command, host, swal, reloadPage, ToastMsgError, ToastMsgSuccess, salidas_update } = useApp()

        const action = ref({
            SALIDA1_STATUS: false,
            SALIDA2_STATUS: false,
            SALIDA3_STATUS: false,
            SALIDA4_STATUS: false,
            ACTUADOR1_STATUS: false,
            ACTUADOR2_STATUS: false,
            LEDVERDE_STATUS: false,
            LEDROJO_STATUS: false,
            BOTON_STATUS: false,
            AUTOMATIC: false
        })



        // Cuando se monte el componente
        onMounted(() => {
            get_action_settings()
        })

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
                    post_action_settings()
                }
            })
        }

        // Método GET de los Datos
        const get_action_settings = async () => {
            const url = `http://${host}/api/action`
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((datos) => {
                    if (datos.code == 1) {
                        action.value = datos.data
                    } else {
                        ToastMsgError(`"Error no son datos válidos"`, "lightbulb", 5000)
                    }
                })
                .catch((error) => {
                    ToastMsgError(`Error : ${error}`, "lightbulb", 5000)
                })
        }

        // Método POST envío de los Datos
        const post_action_settings = async () => {
            const url = `http://${host}/api/action`
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.value)
            })
                .then((res) => res.json())
                .then((datos) => {
                    if (datos.save) {
                        ToastMsgSuccess(`"Configuración del control guardada correctamente"`, "lightbulb", 5000)
                        reloadPage("action", 7000)
                    }
                })
                .catch((error) => {
                    ToastMsgError(`Error : ${error}`, "lightbulb", 5000)
                })
        }
        const handleclick = (valor) => {
            let status = true
            if (valor == "S1") {
                action.value.SALIDA1_STATUS = !action.value.SALIDA1_STATUS
                status = action.value.SALIDA1_STATUS
                console.log("status S1")
                console.log(action.value.SALIDA1_STATUS)
            }
            if (valor == "S2") {
                action.value.SALIDA2_STATUS = !action.value.SALIDA2_STATUS
                status = action.value.SALIDA2_STATUS
                console.log("status S2")
                console.log(action.value.SALIDA2_STATUS)

            }
            if (valor == "S3") {
                action.value.SALIDA3_STATUS = !action.value.SALIDA3_STATUS
                status = action.value.SALIDA3_STATUS
                console.log("status S3")
                console.log(action.value.SALIDA3_STATUS)

            }
            if (valor == "S4") {
                action.value.SALIDA4_STATUS = !action.value.SALIDA4_STATUS
                status = action.value.SALIDA4_STATUS
                console.log("status S4")
                console.log(action.value.SALIDA4_STATUS)
            }
            if (valor == "A1") {
                action.value.ACTUADOR1_STATUS = !action.value.ACTUADOR1_STATUS
                status = action.value.ACTUADOR1_STATUS
                console.log("status A1")
                console.log(action.value.ACTUADOR1_STATUS)
            }
            if (valor == "A2") {
                action.value.ACTUADOR2_STATUS = !action.value.ACTUADOR2_STATUS
                status = action.value.ACTUADOR2_STATUS
                console.log("status A2")
                console.log(action.value.ACTUADOR2_STATUS)
            }
            if (valor == "LV") {
                action.value.LEDVERDE_STATUS = !action.value.LEDVERDE_STATUS
                status = action.value.LEDVERDE_STATUS
                console.log("status LV")
                console.log(action.value.LEDVERDE_STATUS)
            }
            if (valor == "LR") {
                action.value.LEDROJO_STATUS = !action.value.LEDROJO_STATUS
                status = action.value.LEDROJO_STATUS
                console.log("status LR")
                console.log(action.value.LEDROJO_STATUS)
            }
            command(`{"protocol": "WS", "output": "${valor}", "value": ${status} }`)
            console.log(valor)
            //return !action.value.SALIDA1_STATUS


        }

        // Computadas
        const activado1 = computed(() => {
            !action.value.SALIDA1_STATUS
            return action.value.SALIDA1_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const activado2 = computed(() => {
            !action.value.SALIDA2_STATUS
            return action.value.SALIDA2_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const activado3 = computed(() => {
            !action.value.SALIDA3_STATUS
            return action.value.SALIDA3_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const activado4 = computed(() => {
            !action.value.SALIDA4_STATUS
            return action.value.SALIDA4_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const actuador1 = computed(() => {
            !action.value.ACTUADOR1_STATUS
            return action.value.ACTUADOR1_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const actuador2 = computed(() => {
            !action.value.ACTUADOR2_STATUS
            return action.value.ACTUADOR2_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const ledverde = computed(() => {
            !action.value.LEDVERDE_STATUS
            return action.value.LEDVERDE_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const ledrojo = computed(() => {
            !action.value.LEDROJO_STATUS
            return action.value.LEDROJO_STATUS ? "fa fa-4x fa-lightbulb text-success" : "fa fa-2x fa-lightbulb text-danger"
        })
        const automatico = computed(() => {
            return action.value.LEDROJO_STATUS ? "manual" : "automatico"
        })
        const manual = computed(() => {
            return action.value.LEDROJO_STATUS ? false : true
        })
        const iconautman = computed(() => {
            return action.value.LEDROJO_STATUS ?  "fa fa-2x fa-hand-rock text-danger" : "fa fa-2x fa-play-circle text-warning"
        })
        //Actualizar los datos de temperatura y humedad recibidos por ws (websockets)
        watch(() => salidas_update.value,
            ({ SALIDA1_STATUS, SALIDA2_STATUS, SALIDA3_STATUS, SALIDA4_STATUS, ACTUADOR1_STATUS, ACTUADOR2_STATUS, LEDROJO_STATUS, LEDVERDE_STATUS }) => {
                action.value.SALIDA1_STATUS = SALIDA1_STATUS
                action.value.SALIDA2_STATUS = SALIDA2_STATUS
                action.value.SALIDA3_STATUS = SALIDA3_STATUS
                action.value.SALIDA4_STATUS = SALIDA4_STATUS
                action.value.ACTUADOR1_STATUS = ACTUADOR1_STATUS
                action.value.ACTUADOR2_STATUS = ACTUADOR2_STATUS
                action.value.LEDROJO_STATUS = LEDROJO_STATUS
                action.value.LEDVERDE_STATUS = LEDVERDE_STATUS
            })

        return {
            action,
            activado1,
            activado2,
            activado3,
            activado4,
            actuador1,
            actuador2,
            ledverde,
            ledrojo,
            handleclick,
            automatico,
            manual,
            iconautman,

        }

    }
}
</script>