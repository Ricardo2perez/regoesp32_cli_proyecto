import { ref, onMounted, computed } from 'vue'
import useApp from './useApp'

const useWifi = (props, { emit }) => {

    const {
        ToastMsg,
        ToastMsgError,
        ToastMsgWarning,
        ToastMsgSuccess,
        swal,
        host
    } = useApp()

    // Objeto del WIFI en el Settings
    const wifi = ref({
        wifi_ssid: "iotmaster",
        wifi_password: "",
        wifi_ip_static: false,
        wifi_ipv4: "",
        wifi_subnet: "",
        wifi_gateway: "",
        wifi_dns_primary: "",
        wifi_dns_secondary: "",
        ap_mode: false,
        ap_ssid: "",
        ap_password: "",
        ap_visibility: false,
        ap_chanel: 0,
        ap_connect: 0
    })
    const networks = ref({})
    const count = ref(0)
    const scan = ref(false)
    const find = ref(0)

    onMounted(() => {
        get_wifi_settings()
    })

    const handleSubmit = () => {
        showAlertConfirm("Guardar WiFi", "¿Está seguro de guardar las configuraciones WiFi?", "question")
    }

    const showAlertConfirm = (title, text, icon) => {
        swal({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                post_wifi_settings()
            }
        })
    }

    const get_wifi_settings = async() => {
        const url = `http://${host}/api/wifi`
        await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then((res) => res.json())
            .then((datos) => {
                if (datos.code == 1) {
                    wifi.value = datos.wifi
                } else {
                    ToastMsgError(`"Error no son datos válidos"`, "wifi", 5000)
                }
            })
            .catch((error) => {
                ToastMsgError(`Error : ${error}`, "wifi", 5000)
            })
    }

    const post_wifi_settings = async() => {
        const url = `http://${host}/api/wifi`
        await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(wifi.value)
            })
            .then((res) => res.json())
            .then((datos) => {
                if (datos.save) {
                    ToastMsgSuccess(`"Configuración WiFi guardada correctamente"`, "wifi", 5000)
                    get_wifi_settings()
                }
            })
            .catch((error) => {
                ToastMsgError(`Error : ${error}`, "wifi", 5000)
            })
    }

    const get_wifi_scan = async() => {

        scan.value = true
        find.value = 0
        count.value = 0
        networks.value = {}

        const url = `http://${host}/api/scan`
        await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then((res) => res.json())
            .then((datos) => {
                networks.value = datos
                find.value = networks.value.code
                count.value = networks.value.meta.count
                scan.value = false
                if (find.value > 0) {
                    ToastMsg(`"${count.value} Redes WiFi encontradas"`, "wifi", 5000)
                } else {
                    ToastMsgWarning(`"No se encontraron Redes WiFi cercanas"`, "wifi", 5000)
                }
            })
            .catch((error) => {
                scan.value = false
                ToastMsgError(`Error : ${error}`, "wifi", 5000)
            })
    }

    const seguridad = (seguridad) => {
        if (seguridad == "Open") {
            return "fa fa-fw fa-lock-open text-success"
        } else {
            return "fa fa-fw fa-lock text-danger"
        }
    }

    const selectWiFi = (ssid) => {
        wifi.value.wifi_ssid = ssid
        ToastMsg(`"Red ( ${ssid} ) seleccionada"`, "wifi", 5000)
    }


    /* const ToastMsg = (msg, icon, time) => {
        emit("ToastMsg", msg, icon, time)
    }

    const ToastMsgError = (msg, icon, time) => {
        emit("ToastMsgError", msg, icon, time)
    }

    const ToastMsgWarning = (msg, icon, time) => {
        emit("ToastMsgWarning", msg, icon, time)
    }

    const ToastMsgInfo = (msg, icon, time) => {
        emit("ToastMsgInfo", msg, icon, time)
    } */

    const wifi_ip_static = computed(() => {
        return wifi.value.wifi_ip_static ? "Si" : "No"
    })
    const ap_mode = computed(() => {
        return wifi.value.ap_mode ? "Si" : "No"
    })
    const ap_visibility = computed(() => {
        return wifi.value.ap_visibility ? "Si" : "No"
    })
    const scanning = computed(() => {
        return scan.value ? "Escaneando redes WiFi cercanas" : "Ninguna Red WiFi Encontrada"
    })


    return {
        wifi,
        count,
        scan,
        find,
        networks,
        wifi_ip_static,
        ap_mode,
        ap_visibility,
        scanning,
        handleSubmit,
        get_wifi_scan,
        seguridad,
        selectWiFi
    }

}

export default useWifi