var SimuladorPAH5 = require("babel-loader!../Simulaciones/SimuladorPAH5.jsx");

module.exports = SimuladorPAH5;

//function MontarSimulacionPAH5(ApExtraordinaria, ApPeriodica, Periodicidad, Crecimiento, CodPol, Producto) {
function MontarSimulacionPAH5(ApExtraordinaria, ApPeriodica, Periodicidad, Crecimiento, CodPol, Producto) {

    //Cargamos la situacion actual para obtener edad de jubilacion y capital actualk

    var api = cargarApiConsultasWeb("PolizaObtenerUnica");

    fetch(api + sessionStorage.idDato + "/" + CodPol, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.Token
        }
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
        else {
            if (res.status === 401) {
                CerrarSession();
                ComprobarLogeo();
            }
            else { }
        }
    }).then((res) => {
        if (res.CODPOL != null) {
            ReactDOM.render(React.createElement(SimuladorPAH5.default, { FVencimiento: res.F_VENCI, ApExtraordinaria: ApExtraordinaria, ApPeriodica: ApPeriodica, Periodicidad: Periodicidad, Crecimiento: Crecimiento, FechaNacimiento: sessionStorage.Fnacimiento, CodPol: res.CODPOL, CapitalActual: res.C_SUSCRITO, Producto: Producto }), document.getElementById('divSimulacion'));
        }
    }, (error) => {

    });
}

window.MontarSimulacionPAH5 = MontarSimulacionPAH5;