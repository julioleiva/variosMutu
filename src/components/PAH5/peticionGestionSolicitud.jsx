function ContratarPH5(padre, valoresSimulacion) {
    debugger;
    var inicioPeriodos = moment().set({
        year: moment()
          .add(1, "month")
          .year(),
        month: moment()
          .add(1, "month")
          .month(),
        date: 1
    });

    var peticion = {
        IdDato: sessionStorage.idDato,
        FechaEfecto: moment(inicioPeriodos).format("DD/MM/YYYY"),
        AportacionInicialExtraOrdinaria: valoresSimulacion.ApExtraordinaria,
        AportacionPeriodica: valoresSimulacion.ApPeriodica,
        CrecimientoAnual: valoresSimulacion.Crecimiento,
        EdadVencimiento: valoresSimulacion.EdadJubilacion,
        FechaVencimiento: moment(valoresSimulacion.FVencimiento).format("DD/MM/YYYY"),
        AñosDuracion: null,
        EdadVencimiento: null,
        CuentaCorriente: valoresSimulacion.CCC,
        FormaPago: valoresSimulacion.Periodicidad,
        CheckAplicarPeriocidadRestoPlanes: false,
        CheckDomiciliarTodosRecibos: false
    };

    var api = cargarApiSolicitudes("ContratarPlanAhorro5");

    fetch(api, {
        method: "POST",
        body: JSON.stringify(peticion),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.Token
        }
    })
      .then(function(res) {
          if (res.ok) {
              return res.json();
          } else {
              if (res.status === 401) {
                  CerrarSession();
                  ComprobarLogeo();
              } else {
                  padre.setState({
                      isSaving: false,
                      MensajeSolicitud: res.statusText,
                      Titulo: "Error: Solicitud de contratación de Plan Ahorro 5",
                      isSaved: true,
                      showMessage: true
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
                    MensajeSolicitud: "La solicitud ha sido registrada con el número " + resultado,
                    Titulo: "Solicitud de contratación de Plan Ahorro 5",
                    isSaved: true,
                    showMessage: true
                });
            }
        },
        error => {
            padre.setState({
                isSaving: false,
                MensajeSolicitud: "Ha habido un error al realizar la solicitud",
                Titulo: "Solicitud de contratación de Plan Ahorro 5",
                isSaved: true,
                showMessage: true
            });
        }
      );
}