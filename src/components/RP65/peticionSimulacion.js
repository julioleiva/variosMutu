function CargarSimulacionRP65(padre, modalidad, aportacion, anosMinimo, reversion, fecha, fechaBeneficiario) {
    debugger;
    var api = cargarApiSimulador("RentasCalcularCuotaRVR");

    var FechaBeneficario = null;
    var FechaIni = fecha.format("YYYY-MM-DD");

    if (fechaBeneficiario != null) {
        var FechaBeneficario = fechaBeneficiario.format("YYYY-MM-DD");
    }

    var FechaNacimiento = stringToDate(
        sessionStorage.Fnacimiento,
        "dd/mm/yyyy",
        "/"
    );

    fetch(
        api +
        sessionStorage.idDato +
        "/" +
        modalidad +
        "/RP65/" +
        FechaIni +
        "/" +
        FechaNacimiento +
        "/" +
        FechaBeneficario +
        "/H/" +
        reversion +
        "/" +
        aportacion +
        "/" +
        anosMinimo,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.Token
            }
        }
    )
        .then(function (res) {
            debugger
            if (res.ok) {
                return res.json();
            } else {
                if (res.status === 401) {
                    CerrarSession();
                    ComprobarLogeo();
                } else {
                    padre.setState({ SimulationIsLoaded: true, error: true });
                }
            }
        })
        .then(
            res => {
                //Aqui mete los datos de la llamada en la propiedad de estado
                debugger;
                let DatosTabla = [];
                let values = res;
                let Renta = values.Renta;

                if (modalidad === 5) {
                    DatosTabla.push(["Importe aportacion", aportacion]);
                    DatosTabla.push(["Valor rescate", aportacion]);
                    DatosTabla.push(["Capital fallecimiento (1º Año)", aportacion * 0.95]);
                    DatosTabla.push(["Renta mensual", Renta]);
                }
                let colSize = [10, 10];
                let cols = [
                    { Id: 0, Nombre: "Concepto" },
                    { Id: 1, Nombre: "Importe" }
                ];

                //Montamos el componente react
                padre.setState({
                    DatosTablaRVR: DatosTabla,
                    poliza: null,
                    columnas: cols,
                    thsize: colSize,
                    SimulationIsLoaded: true,
                    error: false
                });
            },
            error => {
                padre.setState({ DatosTablaRVR: null });
            }
        );
}