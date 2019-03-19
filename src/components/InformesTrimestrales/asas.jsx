// CONTRATACIÓN RP65
function ContratarRP65(padre) {
    debugger
    let fechaSolicitud = moment().format("L");
    let fechaEfecto = moment(padre.state.FechaInicio).format("DD/MM/YYYY")

    var peticion = {
        IdDato: sessionStorage.idDato,
        FechaEfecto: fechaEfecto,
        FechaSolicitud: fechaSolicitud,
        ImporteAportacion: padre.state.Aportacion,
        CuentaBancariaRVP65Mensual: padre.state.CCCCuotaMensual,
        CuentaBancariaDomiciliarRecibo: padre.state.CCCCobroPrestacion,
        ModalidadContratacion: 5 || Number(padre.state.ModalidadSeleted)
    };

    var api = cargarApiSolicitudes("ContratarRentaVitaliciaPatrimonio65");

    fetch(api, {
        method: "POST",
        body: JSON.stringify(peticion),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.Token
        }
    }).then(function(res) {
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
                    header: "Error: Solicitud de contratación de Plan Ahorro 5",
                    openAlert: true
                });
            }
        }
    }).then(res => {
        var resultado = res;
        if (resultado > 0) {
            padre.setState({
                isSaving: false,
                mensaje: msgSolicitudOK,
                header: "Solicitud de contratación de Plan Ahorro 5",
                openAlert: true,
                openPop: false
            });
        }
    },error => {
        padre.setState({
            isSaving: false,
            mensaje: msgErrorContratar,
            header: "Solicitud de contratación de Plan Ahorro 5",
            openAlert: true,
            openPop: false
        });
    });
}
