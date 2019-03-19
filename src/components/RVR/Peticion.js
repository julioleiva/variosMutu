// CONTRATACIÓN RVR
function ContratarRVR(padre) {
    let fechaSolicitud = moment().format("L");
    let fechaEfecto = moment(padre.state.FechaInicio).format("DD/MM/YYYY");

    console.log(fechaEfecto);

    let peticion = {
        IdDato: sessionStorage.idDato,
        ImporteAportacion: padre.state.Aportacion,
        CuentaBancariaRVMensual: padre.state.CCCCuotaMensual,
        CuentaBancariaReciboAportacion: padre.state.CCCCobroPrestacion,
        ModalidadContratacionRVR: Number(padre.state.ModalidadSeleted),
        FechaEfecto: fechaEfecto,
        FechaSolicitud: fechaSolicitud
    };

    let api = cargarApiSolicitudes("ContratarRentaVitaliciaRemunerada");

    fetch(api, {
        method: "POST",
        body: JSON.stringify(peticion),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.Token
        }
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                if (res.status === 401) {
                    CerrarSession();
                    ComprobarLogeo();
                } else {
                    padre.setState({
                        isSaving: false,
                        mensaje: res.statusText,
                        header: "Error: Solicitud de contratación",
                        openAlert: true
                    });
                }
            }
        })
        .then(
            res => {
                var resultado = res;
                if (resultado > 0) {
                    padre.setState({
                        isSaving: false,
                        mensaje: msgSolicitudOK,
                        header: "Solicitud de contratación",
                        openAlert: true,
                        openPop: false
                    });
                }
            },
            error => {
                padre.setState({
                    isSaving: false,
                    mensaje: "Error al realizar la solicitud",
                    header: "Error: Solicitud de contratación",
                    openAlert: true
                });
            }
        );
}