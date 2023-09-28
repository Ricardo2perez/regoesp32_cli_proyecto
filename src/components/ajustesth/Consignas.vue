<template>
    <div class="col-md-4 col-xl-4">
        <p class="text-uppercase fs-sm fw-bold text-center mt-2 mb-4">
            {{ control }}
        </p>
        <div class="block-content block-content-full d-flex align-items-center justify-content-between">
            <button  class="btn btn-alt-success me-1" @click="handleSubmit">
                <i class="fa fa-fw fa-save opacity-50 me-1"></i> Guardar
            </button>
        </div>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">

                <div class="btn-group btn-group-lg" role="group" aria-label="Large Horizontal Primary">
                    <button type="button" class="btn btn-primary" @click="handleclickdownTemperCon">
                        <i class="fa fa-arrow-down"></i>
                    </button>
                    <button type="button" class="btn btn-light js-click-ripple-enabled" data-toggle="click-ripple"
                        style="overflow: hidden; position: relative; z-index: 1;">{{ temp_conexion }}</button>
                    <button type="button" class="btn btn-primary" @click="handleclickupTemperCon">
                        <i class="fa fa-arrow-up"></i></button>
                </div>
                <div class="me-3">
                    <button class="btn btn-warning text-white text-uppercase ">Tempera. Conexión</button>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">

                <div class="btn-group btn-group-lg" role="group" aria-label="Large Horizontal Primary">
                    <button type="button" class="btn btn-primary" @click="handleclickdownTemperDes">
                        <i class="fa fa-arrow-down"></i>
                    </button>
                    <button type="button" class="btn btn-light js-click-ripple-enabled" data-toggle="click-ripple"
                        style="overflow: hidden; position: relative; z-index: 1;">{{ temp_desconexion }}</button>
                    <button type="button" class="btn btn-primary" @click="handleclickupTemperDes">
                        <i class="fa fa-arrow-up"></i></button>
                </div>
                <div class="me-3">
                    <button class="btn btn-warning text-white text-uppercase ">Tempera. Desconex</button>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">

                <div class="btn-group btn-group-lg" role="group" aria-label="Large Horizontal Primary">
                    <button type="button" class="btn btn-primary" @click="handleclickdownHumCon">
                        <i class="fa fa-arrow-down"></i>
                    </button>
                    <button type="button" class="btn btn-light js-click-ripple-enabled" data-toggle="click-ripple"
                        style="overflow: hidden; position: relative; z-index: 1;">{{ hum_conexion }}</button>
                    <button type="button" class="btn btn-primary" @click="handleclickupHumCon">
                        <i class="fa fa-arrow-up"></i></button>
                </div>
                <div class="me-3">
                    <button class="btn btn-warning text-white text-uppercase ">Humedad Conexión</button>
                </div>
            </div>
        </a>
        <a class="block block-rounded block-link-pop bg-xinspire-darker" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">

                <div class="btn-group btn-group-lg" role="group" aria-label="Large Horizontal Primary">
                    <button type="button" class="btn btn-primary" @click="handleclickdownHumDes">
                        <i class="fa fa-arrow-down"></i>
                    </button>
                    <button type="button" class="btn btn-light js-click-ripple-enabled" data-toggle="click-ripple"
                        style="overflow: hidden; position: relative; z-index: 1;">{{ hum_desconexion }}</button>
                    <button type="button" class="btn btn-primary" @click="handleclickupHumDes">
                        <i class="fa fa-arrow-up"></i></button>
                </div>
                <div class="me-3">
                    <button class="btn btn-warning text-white text-uppercase ">Humedad Desconex</button>
                </div>
            </div>
        </a>

    </div>
</template>

<script>

import useApp from "@/composables/useApp"
import { ref, computed, onMounted, watch } from 'vue'

export default {
    name: "Consignas",
    props: {
        control: {
            type: String,
            default: "VUE32 Admin Tool"
        }
    },
    setup() {

        // Variables 

        //const numero = ref(0)


        const { command, host, swal, reloadPage, ToastMsgError, ToastMsgSuccess, ajustesth_update } = useApp()

        const ajustesth = ref({
            temperatura_conexion: 28,
            temperatura_desconexion: 20,
            humedad_conexion: 30,
            humedad_desconexion: 82,

        })



        // Cuando se monte el componente
        onMounted(() => {
            get_ajustesth_settings()
        })
        // manejador del evento submit
        const handleSubmit = () => {
            showAlertConfirm("Guardar Ajustes", "¿Está seguro de guardar la Configuración actual?", "question")
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
        const get_ajustesth_settings = async () => {
            const url = `http://${host}/api/ajustesth`
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((datos) => {
                    if (datos.code == 1) {
                        ajustesth.value = datos.data
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
            const url = `http://${host}/api/ajustesth`
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ajustesth.value)
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
        //evento pulsador aumentar consigna apertura trampilla
        const handleclickupTemperCon = () => {
            if (ajustesth.value.temperatura_conexion < 99) {
                ajustesth.value.temperatura_conexion++
            }
        }
        //evento pulsador disminuir consigna apertura trampilla
        const handleclickdownTemperCon = () => {
            if ((ajustesth.value.temperatura_conexion >= 1) && (ajustesth.value.temperatura_conexion > (ajustesth.value.temperatura_desconexion + 2))) {
                ajustesth.value.temperatura_conexion--
            }
        }
        //evento pulsador aumentar consigna cierre trampilla
        const handleclickupTemperDes = () => {
            if ((ajustesth.value.temperatura_desconexion < 99) && ((ajustesth.value.temperatura_desconexion + 2) < ajustesth.value.temperatura_conexion)) {
                ajustesth.value.temperatura_desconexion++
            }
        }
        //evento pulsador disminuir consigna cierre trampilla
        const handleclickdownTemperDes = () => {
            if (ajustesth.value.temperatura_desconexion >= 1) {
                ajustesth.value.temperatura_desconexion--
            }
        }
        //evento pulsador aumentar consigna apertura electroválvula
        const handleclickupHumCon = () => {
            if ((ajustesth.value.humedad_conexion) < 99 && (ajustesth.value.humedad_conexion < (ajustesth.value.humedad_desconexion - 2))) {
                ajustesth.value.humedad_conexion++
            }
        }
        //evento pulsador disminuir consigna apertura electroválvula
        const handleclickdownHumCon = () => {
            if (ajustesth.value.humedad_conexion >= 1) {
                ajustesth.value.humedad_conexion--
            }
        }
        //evento pulsador aumentar consigna cierre trampilla
        const handleclickupHumDes = () => {
            if (ajustesth.value.humedad_desconexion < 99) {
                ajustesth.value.humedad_desconexion++
            }
        }
        //evento pulsador disminuir consigna cierre trampilla
        const handleclickdownHumDes = () => {
            if ((ajustesth.value.humedad_desconexion >= 1) && (((ajustesth.value.humedad_desconexion - 2) > ajustesth.value.humedad_conexion))) {
                ajustesth.value.humedad_desconexion--
            }
        }
        // Computadas
        const temp_conexion = computed(() => {
            return ajustesth.value.temperatura_conexion
        })
        const temp_desconexion = computed(() => {
            return ajustesth.value.temperatura_desconexion
        })
        const hum_conexion = computed(() => {
            return ajustesth.value.humedad_conexion
        })
        const hum_desconexion = computed(() => {
            return ajustesth.value.humedad_desconexion
        })

        //Actualizar los datos de temperatura y humedad recibidos por ws (websockets)
        watch(() => ajustesth_update.value,
            ({ temperatura_conexion, temperatura_dexconexion, humedad_conexion, humedad_desconexion }) => {
                ajustesth.value.temperatura_conexion = temperatura_conexion
                ajustesth.value.temperatura_desconexion = temperatura_dexconexion
                ajustesth.value.humedad_conexion = humedad_conexion
                ajustesth.value.humedad_desconexion = humedad_desconexion
            })

        return {
            ajustesth,
            handleclickupTemperCon,
            handleclickdownTemperCon,
            handleclickdownTemperDes,
            handleclickupTemperDes,
            handleclickupHumCon,
            handleclickdownHumCon,
            handleclickupHumDes,
            handleclickdownHumDes,
            temp_conexion,
            temp_desconexion,
            hum_conexion,
            hum_desconexion,
            handleSubmit,







        }

    }
}
</script>