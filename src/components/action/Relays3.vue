<template>
    <div class="col-md-4 ">
        <div class="col-md-6 col-xl-6">
            <p class="text-uppercase fs-sm fw-bold text-center mt-2 mb-4">
                {{ control }}
            </p>
        </div>

        <table class="table">
            
            <tbody>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.SALIDA1_STATUS"
                                    @click="relayOnOff('S1')"> Salida_1
                                <i :class="activado1"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.SALIDA2_STATUS"
                                    @click="relayOnOff('S2')"> Salida_2
                                <i :class="activado2"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.SALIDA3_STATUS"
                                    @click="relayOnOff('S3')"> Salida_3
                                <i :class="activado3"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.SALIDA4_STATUS"
                                    @click="relayOnOff('S4')"> Salida_4
                                <i :class="activado4"></i>
                            </label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.ACTUADOR1_STATUS"
                                    @click="relayOnOff('A1')"> Actuad_1
                                <i :class="actuador1"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.ACTUADOR2_STATUS"
                                    @click="relayOnOff('A2')"> Actuad_2
                                <i :class="actuador2"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.LEDVERDE_STATUS"
                                    @click="relayOnOff('LV')"> LedVerde
                                <i :class="ledverde"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-switch">
                            <label class="checkbox-inline">
                                <input class="form-check-input" type="checkbox" v-model="action.LEDROJO_STATUS"
                                    @click="relayOnOff('LR')"> LedRojo
                                <i :class="ledrojo"></i>
                            </label>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>



    <!-- END Pop Out Block Modal -->
</template>

<script>

import useApp from "@/composables/useApp"
import { ref, computed, onMounted } from 'vue'

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

        const { command, host, swal, reloadPage, ToastMsgError, ToastMsgSuccess } = useApp()

        const action = ref({
            SALIDA1_STATUS: false,
            SALIDA2_STATUS: false,
            SALIDA3_STATUS: false,
            SALIDA4_STATUS: false,
            ACTUADOR1_STATUS: false,
            ACTUADOR2_STATUS: false,
            LEDVERDE_STATUS: false,
            LEDROJO_STATUS: false,
            RELAY_STATUS: false,
            RELAY_LOGICA: 0,
            RELAY_PIN: 2,
            RELAY_NAME: "RELAY 01",
            RELAY_DESCRIPTION: "Control de Luces"
        })

        const relayOnOff = (valor) => {
            // enviar dato de On Off por WS
            //command(`{"protocol": "WS", "output": "${action.value.RELAY_NAME}", "value": ${!action.value.RELAY_STATUS} }`)
            let status = true
            if (valor == "S1") {
                console.log(!action.value.SALIDA1_STATUS)
                status = !action.value.SALIDA1_STATUS
            }
            if (valor == "S2") {
                console.log(!action.value.SALIDA2_STATUS)
                status = !action.value.SALIDA2_STATUS
            }
            if (valor == "S3") {
                console.log(!action.value.SALIDA3_STATUS)
                status = !action.value.SALIDA3_STATUS
            }
            if (valor == "S4") {
                console.log(!action.value.SALIDA4_STATUS)
                status = !action.value.SALIDA4_STATUS
            }
            if (valor == "A1") {
                console.log(!action.value.ACTUADOR1_STATUS)
                status = !action.value.ACTUADOR1_STATUS
            }
            if (valor == "A2") {
                console.log(!action.value.ACTUADOR2_STATUS)
                status = !action.value.ACTUADOR2_STATUS
            }
            if (valor == "LV") {
                console.log(!action.value.LEDVERDE_STATUS)
                status = !action.value.LEDVERDE_STATUS
            }
            if (valor == "LR") {
                console.log(!action.value.LEDROJO_STATUS)
            }
            command(`{"protocol": "WS", "output": "${valor}", "value": ${status} }`)
            console.log(valor)
            //return !action.value.SALIDA1_STATUS
        }

        // Cuando se monte el componente
        onMounted(() => {
            get_action_settings()
        })
        // manejador del evento submit
        const handleSubmit = () => {
            showAlertConfirm("Guardar Control ON/OFF", "¿Está seguro de guardar la Configuración actual?", "question")
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


        // Computadas
        const activado1 = computed(() => {
            !action.value.SALIDA1_STATUS
            return action.value.SALIDA1_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const activado2 = computed(() => {
            !action.value.SALIDA2_STATUS
            return action.value.SALIDA2_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const activado3 = computed(() => {
            !action.value.SALIDA3_STATUS
            return action.value.SALIDA3_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const activado4 = computed(() => {
            !action.value.SALIDA4_STATUS
            return action.value.SALIDA4_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const actuador1 = computed(() => {
            !action.value.ACTUADOR1_STATUS
            return action.value.ACTUADOR1_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const actuador2 = computed(() => {
            !action.value.ACTUADOR2_STATUS
            return action.value.ACTUADOR2_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const ledverde = computed(() => {
            !action.value.LEDVERDE_STATUS
            return action.value.LEDVERDE_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })
        const ledrojo = computed(() => {
            !action.value.LEDROJO_STATUS
            return action.value.LEDROJO_STATUS ? "fa fa-x fa-circle text-success" : "fa fa-circle text-danger"
        })



        return {
            action,
            relayOnOff,
            activado1,
            activado2,
            activado3,
            activado4,
            actuador1,
            actuador2,
            ledverde,
            ledrojo,
            handleSubmit
        }

    }
}
</script>