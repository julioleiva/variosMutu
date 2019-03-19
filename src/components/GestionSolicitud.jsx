const msgErrorContratar =
  "Ha sucedido un error inesperado. Si el problema persiste, por favor, ponte en contacto con la Mutualidad. Gracias.";
const msgSolicitudOK = "La solicitud se ha realizado con éxito";

function ModificarFallecimiento(padre, poliza, importe) {
  var api = cargarApiSolicitudes(
    "contratacionContratacionModificarFallecimientoPUA"
  );

  var Fecha = UnoMesSiguienteFormatoIngles(Date.now());
  fetch(
    api +
      "" +
      sessionStorage.idDato +
      "/" +
      Fecha +
      "/" +
      poliza +
      "/" +
      importe +
      "/false",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
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
            Titulo:
              "Error: Solicitud de contratación - modificación de fallecimiento",
            openAlert: true,
            botonActivo: false,
            Importe: 0,
            CuotaNuevaFallecimiento: 0
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: "La solicitud ha sido efectuada",
            Titulo: "Solicitud de contratación - modificación de fallecimiento",
            openAlert: true,
            botonActivo: false,
            Importe: 0,
            CuotaNuevaFallecimiento: 0
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo: "Solicitud de contratación - modificación de fallecimiento",
          openAlert: true,
          botonActivo: false,
          Importe: 0,
          CuotaNuevaFallecimiento: 0
        });
      }
    );
}

function ReanudarServicioComplementario(padre) {
  debugger;
  var peticion = {
    IdDato: sessionStorage.idDato,
    CodigoPoliza: padre.state.poliza,
    IncluirPagoCuotasPendientesAportacion: "?????????????",
    NoIncluirPagoCuotasPendientesAportacion: "????????????",
    AportacionPeriodica: padre.state.AportacionPeriodica,
    PorcentajeCrecimiento: padre.state.Crecimiento,
    CapitalAdicionalFallecimiento: padre.state.ImporteFallecimiento,
    RentaMensualIncapacidad: padre.state.RentaIncapacidad,
    CapitalAdicionalIncapacidad: padre.state.CapitalIncapacidad,
    GarantiaBasicaITP: "??????????????",
    GarantiaAdicionalITP: false,
    PeriodoCarencia: false,
    FechaCarencia: false,
    RentaMensualDependencia: "???????????",
    CargoDependenciaCCC: false,
    CargaDependenciaValAcumAhorroJubilacion: false,
    VencimientoDependencia: null,
    CuentaBancaria: padre.state.CCC,
    PeriodicidadPago: padre.state.FormaPago,
    DomiciliarTodosProductos: false,
    ExtenderPeriodicidad: false
  };

  /* IdDato: sessionStorage.idDato,
    FechaEfecto: moment(inicioPeriodos).format("DD/MM/YYYY"),
    ImporteAportacionExtraordinaria: null,
    ImporteAportacionPeriodica: null,
    PorcentajeCrecimientoAnual: null,
    FechaRecibirPrestacion: "",
    CapitalAdicionalFallecimiento: null,
    RentaMensualIncapacidad: "",
    CapitalAdicionalIncapacidad: null,
    ModalidadITP: "",
    GarantiasAdicionalesITP: "1$0$2$0$3$0",
    SolicitaPeriodoCarencia: false,
    FechaCarencia: "",
    RentaMensualDependencia: "",
    ContratarDependencia: false,
    VencimientoCoberturaDependencia: "",
    HerederosLegales: true,
    CuentaBancaria: "",
    PeriodicidadPago: "",
    DomiciliarTodosProductos: false,
    ExtenderPeriodicidad: false,
    ImporteAportacionExtraordinaria : null,
    ImporteAportacionPeriodica : null*/

  /*if (padre.state != null) {
      padre.state.CCC != "" ? (peticion.CuentaBancaria = padre.state.CCC) : null;

      //Fallecimiento
      padre.state.ImporteFallecimiento != 0
        ? (peticion.CapitalAdicionalFallecimiento =
            padre.state.ImporteFallecimiento) 
        : null;
      
      //IP
      padre.state.ImporteCapitalIP != 0 && padre.state.ImporteCapitalIP != null ? (peticion.CapitalAdicionalIncapacidad = padre.state.ImporteCapitalIP) : null;
      padre.state.ImporteRentaIP != 0 && padre.state.ImporteRentaIP != null ? (peticion.RentaMensualIncapacidad = padre.state.indRenta) : "";
      // Se establece como capital adicional de fallecimiento el mismo valor que el capital de IP, en caso de que no quiera contratar capital de IP, por defecto se contrata
      // un capital mínimo adicional de fallecimiento ya que es obligatorio tenerlo.
      if(padre.state.ImporteCapitalIP > 0 || padre.state.ImporteRentaIP > 0){  
          if(padre.state.ImporteCapitalIP > 0){
              peticion.CapitalAdicionalFallecimiento = padre.state.ImporteCapitalIP ;
          }else{
              peticion.CapitalAdicionalFallecimiento = 10000;
          }           
      }

      //ITP
      if (padre.state.Chk30 != null && (padre.state.Chk30 || padre.state.Chk60 || padre.state.Chk90)) {
          if (padre.state.Chk30) peticion.ModalidadITP = 1;
          if (padre.state.Chk60) peticion.ModalidadITP = 2;
          if (padre.state.Chk90) peticion.ModalidadITP = 3;
          peticion.GarantiasAdicionalesITP = "1$".concat(+padre.state.Hospitalizacion,
              "2$", +padre.state.Intervenciones, "3$", +padre.state.Incapacidad);
          peticion.SolicitaPeriodoCarencia = padre.state.PeriodoCarencia;
          padre.state.PeriodoCarencia ? (peticion.FechaCarencia = padre.state.FechaEfectoSeguroOrigen.format("DD/MM/YYYY")) : null;
      }

      //Dependencia

      padre.state.ImporteRentaDependencia != 0 && padre.state.ImporteRentaDependencia != null ? (peticion.RentaMensualDependencia = padre.state.ImporteRentaDependencia) : "";
      padre.state.EdadVencimiento != 0 && padre.state.EdadVencimiento != null ? (peticion.VencimientoCoberturaDependencia = padre.state.EdadVencimiento) : "";
      if(padre.state.EdadVencimiento != null && padre.state.ImporteRentaDependencia != 0){
          peticion.ContratarDependencia = (padre.state.EdadVencimiento != 0) ? "" : true;
      }*/

  var api = cargarApiSolicitudes("ReanudarServicioComplementarioApiSolicitdes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            Titulo:
              "Error: Solicitud de contratación - modificación de fallecimiento",
            openAlert: true,
            botonActivo: false,
            Importe: 0,
            CuotaNuevaFallecimiento: 0
          });
        }
      }
    })
    .then(Entidad => {
      if (res.ok) {
        return res.json();
      } else {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: res.statusText,
          Titulo:
            "Error: Solicitud de contratación - modificación de fallecimiento",
          openAlert: true,
          botonActivo: false,
          Importe: 0,
          CuotaNuevaFallecimiento: 0
        });
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: "La solicitud ha sido efectuada",
            Titulo: "Solicitud de contratación - modificación de fallecimiento",
            openAlert: true,
            botonActivo: false,
            Importe: 0,
            CuotaNuevaFallecimiento: 0
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo: "Solicitud de contratación - modificación de fallecimiento",
          openAlert: true,
          botonActivo: false,
          Importe: 0,
          CuotaNuevaFallecimiento: 0
        });
      }
    );
}

function ModificarProductoIP(padre, poliza, renta, capital, idproducto) {
  var api = cargarApiSolicitudes("contratacionContratacionModificacionIP");
  debugger;
  var Fecha = UnoMesSiguienteFormatoIngles(Date.now());

  fetch(
    api +
      sessionStorage.idDato +
      "/" +
      Fecha +
      "/" +
      poliza +
      "/" +
      renta +
      "/" +
      capital +
      "/" +
      idproducto,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
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
            Titulo: "Error: Solicitud de incapacidad permanente",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado.Error) {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: resultado.Mensaje,
            Titulo: "Solicitud de incapacidad permanente",
            openAlert: true,
            botonActivo: false
          });
        } else {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: msgSolicitudOK,
            Titulo: "Solicitud de incapacidad permanente",
            openAlert: true,
            botonActivo: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo: "Solicitud de incapacidad permanente",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function ModificarProductoDependecia(
  padre,
  poliza,
  renta,
  formaPago,
  cargo,
  EdadVencimiento,
  IdProducto
) {
  var CargoAcuenta;
  var CargoASaldo;

  if (formaPago != 6) {
    CargoAcuenta = false;
    CargoASaldo = false;
  } else {
    if (cargo == "1") {
      CargoAcuenta = true;
      CargoASaldo = false;
    } else {
      CargoAcuenta = false;
      CargoASaldo = true;
    }
  }

  var api = cargarApiSolicitudes(
    "contratacionContratacionModificacionDependencia"
  );

  var Fecha = UnoMesSiguienteFormatoIngles(Date.now());

  fetch(
    api +
      sessionStorage.idDato +
      "/" +
      Fecha +
      "/" +
      poliza +
      "/" +
      renta +
      "/" +
      CargoAcuenta +
      "/" +
      CargoASaldo +
      "/" +
      EdadVencimiento +
      "/" +
      IdProducto,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
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
            Titulo: "Error: Solicitud de dependencia",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        var entidad = res;
        if (entidad > 0) {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: msgSolicitudOK,
            Titulo: "Solicitud de dependencia",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo: "Solicitud de dependencia",
          openAlert: true
        });
      }
    );
}

function ModificarProductoITP(
  padre,
  poliza,
  garantiasBasica,
  hospitalizacion,
  intervenciones,
  incapacidad,
  eliminarPeriodoCarencia,
  fechaEfectoSeguroOrigen
) {
  if (eliminarPeriodoCarencia == false) {
    FechaOrigen = null;
  }

  if (fechaEfectoSeguroOrigen != null) {
    var FechaOrigen = UnoMesSiguienteFormatoIngles(fechaEfectoSeguroOrigen);
  } else {
    FechaOrigen = null;
  }

  var Fecha = UnoMesSiguienteFormatoIngles(Date.now());

  var api = cargarApiSolicitudes(
    "contratacionContratacionModificarITPApiSolicitudes"
  );

  fetch(
    api +
      sessionStorage.idDato +
      "/" +
      Fecha +
      "/" +
      poliza +
      "/" +
      garantiasBasica +
      "/" +
      hospitalizacion +
      "/" +
      intervenciones +
      "/" +
      incapacidad +
      "/" +
      eliminarPeriodoCarencia +
      "/" +
      FechaOrigen,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
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
            Titulo: "Error: Solicitud de incapacidad temporal profesional",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;

        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: msgSolicitudOK,
            Titulo:
              "Solicitud de modificación de incapacidad temporal profesional",
            openAlert: true,
            botonActivo: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo:
            "Solicitud de modificación de incapacidad temporal profesional",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function ContratarProductoITP(
  padre,
  poliza,
  garantiasBasica,
  hospitalizacion,
  intervenciones,
  incapacidad,
  eliminarPeriodoCarencia,
  fechaEfectoSeguroOrigen
) {
  if (eliminarPeriodoCarencia == false) {
    FechaOrigen = null;
  }

  if (fechaEfectoSeguroOrigen != null) {
    var FechaOrigen = UnoMesSiguienteFormatoIngles(fechaEfectoSeguroOrigen);
  } else {
    FechaOrigen = null;
  }

  var Fecha = UnoMesSiguienteFormatoIngles(Date.now());

  var api = cargarApiSolicitudes(
    "contratacionContratacionModificarITPApiSolicitudes"
  );

  fetch(
    api +
      sessionStorage.idDato +
      "/" +
      Fecha +
      "/" +
      poliza +
      "/" +
      garantiasBasica +
      "/" +
      hospitalizacion +
      "/" +
      intervenciones +
      "/" +
      incapacidad +
      "/" +
      eliminarPeriodoCarencia +
      "/" +
      FechaOrigen,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
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
            Titulo: "Error: Solicitud de incapacidad temporal profesional",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: msgSolicitudOK,
            Titulo:
              "Solicitud de contratación de incapacidad temporal profesional",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo:
            "Solicitud de contratación de incapacidad temporal profesional",
          openAlert: true
        });
      }
    );
}

function RetrasoEdadJubilacion(padre, valoresSimulacion) {
  var api = cargarApiSolicitudes(
    "RetrasoEdadJubilacionVencPlanUniversalApiSolicitudes"
  );

  fetch(
    api +
      sessionStorage.idDato +
      "/" +
      valoresSimulacion.CodPol +
      "/" +
      null +
      "/" +
      valoresSimulacion.EdadJubilacion,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
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
            isSavingJub: false,
            MensajeSolicitud:
              padre.state.MensajeSolicitud +
              "Ocurrió un error con la solicitud de retraso de edad de jubilación: " +
              res.statusText +
              " <br/>",
            Titulo: "Solicitud de modificación de PUA",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            isSavingJub: false,
            MensajeSolicitud:
              padre.state.MensajeSolicitud +
              "La solicitud de retraso de jubilación se realizó correctamente <br/>",
            Titulo: "Solicitud de modificación de retraso de jubilación",
            openAlert: true,
            botonActivo: false
          });
          padre.setState({
            datosSimulacion: {
              ...padre.state.datosSimulacion,
              EdadJubilacionActual: valoresSimulacion.EdadJubilacion
            }
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          isSavingJub: false,
          MensajeSolicitud:
            padre.state.MensajeSolicitud +
            "Ocurrió un error con la solicitud de retraso de edad de jubilación <br/>",
          Titulo: "Solicitud de modificación de retraso de jubilación",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function AportacionPeriodica(padre, valoresSimulacion) {
  var api = cargarApiSolicitudes("AportacionPeriodicaPUAApiSolicitudes");

  var FVencimiento = moment(valoresSimulacion.FVencimiento).format(
    "YYYY-MM-DD"
  );
  debugger;
  var inicioPeriodos = UnoMesSiguienteFormatoInclinado(Date.now());

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: inicioPeriodos,
    Importe: valoresSimulacion.ApPeriodica,
    CodigoPoliza: valoresSimulacion.CodPol,
    CuentaBancaria: padre.state.CCC,
    CodSec: valoresSimulacion.CodSec,
    Crecimiento: valoresSimulacion.Crecimiento,
    FormaPago: valoresSimulacion.Periodicidad,
    IdDatoJunior: null
  };

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            isSavingAp: false,
            MensajeSolicitud:
              padre.state.MensajeSolicitud +
              "Ocurrió un error en la solicitud de aportación periódica : " +
              res.statusText +
              "<br/>",
            Titulo: "Solicitud de modificación de PUA",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            isSavingAp: false,
            MensajeSolicitud:
              padre.state.MensajeSolicitud +
              "Solicitud de Aportación Periódica realizada correctamente. <br/>",
            Titulo: "Solicitud de modificación de PUA.",
            openAlert: true,
            botonActivo: false
          });
          padre.setState({
            datosSimulacion: {
              ...padre.state.datosSimulacion,
              ApPeriodicaInicial: valoresSimulacion.ApPeriodica
            }
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          isSavingAp: false,
          MensajeSolicitud:
            padre.MensajeSolicitud +
            "Ha habido un error al realizar la Solicitud de Aportación Periódica <br/>",
          Titulo: "Solicitud de modificación de PUA.",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function AportacionExtra(padre, valoresSimulacion) {
  var api = cargarApiSolicitudes("AportacionExtraordinariaPuaApiSolicitudes");

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: moment(valoresSimulacion.FechaApExtraordinaria).format(
      "YYYY-MM-DD"
    ),
    Importe: valoresSimulacion.ApExtraordinaria,
    CodigoPoliza: valoresSimulacion.CodPol,
    CuentaBancaria: valoresSimulacion.CCC,
    CodSec: valoresSimulacion.CodSec,
    Crecimiento: valoresSimulacion.Crecimiento,
    FormaPago: valoresSimulacion.Periodicidad,
    IdDatoJunior: null
  };

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            isSavingEx: false,
            MensajeSolicitud:
              padre.state.MensajeSolicitud +
              "Ocurrió un error en la Solicitud de Aportación Extraordinaria :" +
              res.statusText +
              "<br/>",
            Titulo: "Solicitud de modificación de PUA",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            isSavingEx: false,
            MensajeSolicitud:
              padre.state.MensajeSolicitud +
              "La solicitud de aportación extraordinaria se realizó correctamente.<br/>",
            Titulo: "Solicitud de modificación de PUA",
            openAlert: true,
            botonActivo: false
          });

          padre.setState({
            datosSimulacion: {
              ...padre.state.datosSimulacion,
              ApExtraordinariaInicial: valoresSimulacion.ApExtraordinaria
            }
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          isSavingEx: false,
          MensajeSolicitud:
            padre.state.MensajeSolicitud +
            "Ocurrió un error en la solicitud de aportación extraordinaria. <br/>",
          Titulo: "Solicitud de modificación de PUA",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function ModificarExtraPH5(padre, valoresSimulacion) {
  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: moment(valoresSimulacion.FechaApExtraordinaria).format(
      "YYYY-MM-DD"
    ),
    Importe: valoresSimulacion.ApExtraordinaria,
    CodigoPoliza: valoresSimulacion.CodPol,
    CuentaBancaria: valoresSimulacion.CCC,
    CodSec: valoresSimulacion.CodSec,
    Crecimiento: valoresSimulacion.Crecimiento,
    FormaPago: valoresSimulacion.Periodicidad,
    IdDatoJunior: null
  };

  var api = cargarApiSolicitudes("AportacionExtraordinariaPAH5ApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            isSavingEx: false,
            MensajeSolicitud1:
              "Error al realizar la solicitud extraordinaria :" +
              res.statusText,
            Titulo: "Solicitud de modificación",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            isSavingEx: false,
            MensajeSolicitud1:
              "La solicitud de aportación extraordinaria se ha realizado correctamente.",
            Titulo: "Solicitud de modificación",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          isSavingEx: false,
          MensajeSolicitud1:
            "Ha habido un error al realizar la solicitud de aportación extraordinaria",
          Titulo: "Solicitud de modificación",
          openAlert: true
        });
      }
    );
}

function ModificarPeriodicaPH5(padre, valoresSimulacion) {
  var FVencimiento = moment(valoresSimulacion.FVencimiento).format(
    "YYYY-MM-DD"
  );

  var inicioPeriodos = UnoMesSiguienteFormatoInclinado(Date.now());

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: inicioPeriodos,
    Importe: valoresSimulacion.ApPeriodica,
    CodigoPoliza: valoresSimulacion.CodPol,
    CuentaBancaria: valoresSimulacion.CCC,
    CodSec: valoresSimulacion.CodSec,
    Crecimiento: valoresSimulacion.Crecimiento,
    FormaPago: valoresSimulacion.Periodicidad,
    IdDatoJunior: null
  };

  var api = cargarApiSolicitudes("AportacionPeriodicaPAH5ApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            isSavingAp: false,
            MensajeSolicitud2:
              "Error al realizar la solicitud periódica: " + res.statusText,
            Titulo: "Solicitud de modificación",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            isSavingAp: false,
            MensajeSolicitud2:
              "La solicitud de la aportación periódica se realizó correctamente.",
            Titulo: "Solicitud de modificación",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          isSavingAp: false,
          MensajeSolicitud2:
            "Ha habido un error al realizar la solicitud de aportación periódica",
          Titulo: "Solicitud de modificación",
          openAlert: true
        });
      }
    );
}

function ContratarPH5(padre, valoresSimulacion) {
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
    FechaVencimiento: moment(valoresSimulacion.FVencimiento).format(
      "DD/MM/YYYY"
    ),
    AñosDuracion: null,
    EdadVencimiento: null,
    CuentaCorriente: valoresSimulacion.CCC,
    FormaPago: valoresSimulacion.Periodicidad,
    CheckAplicarPeriocidadRestoPlanes: false,
    CheckDomiciliarTodosRecibos: false
  };

  debugger;

  var api = cargarApiSolicitudes("ContratarPlanAhorro5ApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            MensajeSolicitud: msgSolicitudOK,
            Titulo: "Solicitud de contratación de Plan Ahorro 5",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Ha habido un error al realizar la solicitud",
          Titulo: "Solicitud de contratación de Plan Ahorro 5",
          openAlert: true
        });
      }
    );
}

function ModificarCuentaFormaPago(padre, codpol, cuenta, formaPago) {
  var api = cargarApiSolicitudes("CambioDatosBancariosApiSolicitudes");

  if (formaPago == "") {
    formaPago = null;
  }

  if (cuenta == "") {
    cuenta = null;
  } else {
    cuenta = cuenta.replace(/ /g, "$");
  }

  fetch(
    api + sessionStorage.idDato + "/" + codpol + "/" + cuenta + "/" + formaPago,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Beared " + sessionStorage.Token
      }
    }
  )
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 401) {
          CerrarSession();
          ComprobarLogeo();
        }
      }
    })
    .then(
      function(res) {
        let msj = "";
        if (res.ok) {
          padre.setState({
            isSaving: false,
            errorSaving: false,
            erroMensaje: msj
          });
        } else {
          if (res.status == 1) {
            msj = res.statusText;
          }
          padre.setState({
            isSaving: false,
            errorSaving: true,
            erroMensaje: msj
          });
        }

        if (padre.onGuardado != null) {
          padre.onGuardado();
        }
      },
      error => {
        padre.setState({ isSaving: false, errorSaving: true });
      }
    );
}

function SolicitarModificacionACCU(padre) {
  debugger;
  var inicioPeriodos = UnoMesSiguienteFormatoInclinado(Date.now());

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: inicioPeriodos,
    CodPol: padre.state.poliza.CODPOL,
    UsoMoto250: padre.state.moto250,
    Fallecimiento: padre.state.fallecimiento,
    FallecimientoCirculacion: padre.state.fallCirculacion,
    Incapacidad: padre.state.incapacidad,
    IncapacidadCirculacion: padre.state.incCirculacion,
    CuentaBanco: padre.state.CCC,
    FormaPago: padre.state.periodicidad,
    CheckDomiciliarTodosRecibos: false,
    CheckAplicarPeriocidadRestoPlanes: false
  };

  var api = cargarApiSolicitudes("ModificarAccidentesUniversalApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            MensajeSolicitud: data.Mensaje,
            Titulo: "Error: Solicitud de modificación de Accidentes Universal",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(function(data) {
      if (data.Error == false) {
        return data.Entidad;
      } else {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: data.Mensaje,
          Titulo: "Error: Solicitud de modificación de Accidentes Universal",
          openAlert: true,
          botonActivo: false
        });
      }
    })
    .then(
      Entidad => {
        if (Entidad > 0) {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: "La solicitud ha sido modificada",
            Titulo: "Solicitud de modificación de Accidentes Universal",
            openAlert: true,
            botonActivo: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Ha habido un error al realizar la solicitud",
          Titulo: "Solicitud de modificación de Accidentes Universal",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function ContratacionPIAS(padre, valoresSimulacion) {
  var FVencimiento = moment(valoresSimulacion.FVencimiento).format(
    "DD/MM/YYYY"
  );
  var inicioPeriodos = UnoMesSiguiente(Date.now());

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: inicioPeriodos,
    AportacionInicialExtraOrdinaria: valoresSimulacion.ApExtraordinaria,
    AportacionPeriodica: valoresSimulacion.ApPeriodica,
    CrecimientoAnual: valoresSimulacion.Crecimiento,
    FechaPrestacion: FVencimiento,
    CuentaCorriente: valoresSimulacion.CCC,
    FormaPago: valoresSimulacion.Periodicidad,
    CheckAplicarPeriocidadRestoPlanes: false,
    CheckDomiciliarTodosRecibos: false
  };

  var api = cargarApiSolicitudes("ContratarPlanUniversalPIASApiSolicitudes");
  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            Titulo: "Error: Solicitud de contratación",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: "La solicitud ha sido modificada",
            Titulo: "Solicitud de contratación",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Error al realizar la solicitud",
          Titulo: "Error: Solicitud de contratación",
          openAlert: true
        });
      }
    );
}

function ContratacionSolSVA(padre) {
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
    ImporteAportacionExtraordinaria: null,
    ImporteAportacionPeriodica: null,
    PorcentajeCrecimientoAnual: null,
    FechaRecibirPrestacion: "",
    CapitalAdicionalFallecimiento: null,
    RentaMensualIncapacidad: "",
    CapitalAdicionalIncapacidad: null,
    ModalidadITP: "",
    GarantiasAdicionalesITP: "1$0$2$0$3$0",
    SolicitaPeriodoCarencia: false,
    FechaCarencia: "",
    RentaMensualDependencia: "",
    ContratarDependencia: false,
    VencimientoCoberturaDependencia: "",
    HerederosLegales: true,
    CuentaBancaria: "",
    PeriodicidadPago: "",
    DomiciliarTodosProductos: false,
    ExtenderPeriodicidad: false,
    ImporteAportacionExtraordinaria: null,
    ImporteAportacionPeriodica: null
  };

  if (padre.state.datosSimulacion != null) {
    peticion.ImporteAportacionExtraordinaria =
      padre.state.datosSimulacion.ApExtraordinaria != 0
        ? padre.state.datosSimulacion.ApExtraordinaria
        : null;
    peticion.ImporteAportacionPeriodica =
      padre.state.datosSimulacion.ApPeriodica != 0
        ? padre.state.datosSimulacion.ApPeriodica
        : null;
    peticion.PorcentajeCrecimientoAnual =
      padre.state.datosSimulacion.Crecimiento;
    peticion.PeriodicidadPago = padre.state.datosSimulacion.Periodicidad;
    peticion.CuentaBancaria = padre.state.datosSimulacion.CCC;
    peticion.FechaRecibirPrestacion = padre.state.datosSimulacion.FVencimiento.format(
      "DD/MM/YYYY"
    );
    peticion.FechaEfecto =
      padre.state.datosSimulacion.FechaApExtraordinaria >
      padre.state.datosSimulacion.FechaAper
        ? padre.state.datosSimulacion.FechaAper.format("DD/MM/YYYY")
        : padre.state.datosSimulacion.FechaApExtraordinaria.format(
            "DD/MM/YYYY"
          );
  }

  if (padre.state != null) {
    padre.state.CCC != "" ? (peticion.CuentaBancaria = padre.state.CCC) : null;

    //Fallecimiento
    padre.state.ImporteFallecimiento != 0
      ? (peticion.CapitalAdicionalFallecimiento =
          padre.state.ImporteFallecimiento)
      : null;

    //IP
    padre.state.ImporteCapitalIP != 0 && padre.state.ImporteCapitalIP != null
      ? (peticion.CapitalAdicionalIncapacidad = padre.state.ImporteCapitalIP)
      : null;
    padre.state.ImporteRentaIP != 0 && padre.state.ImporteRentaIP != null
      ? (peticion.RentaMensualIncapacidad = padre.state.indRentaIP)
      : "";
    // Se establece como capital adicional de fallecimiento el mismo valor que el capital de IP, en caso de que no quiera contratar capital de IP, por defecto se contrata
    // un capital mínimo adicional de fallecimiento ya que es obligatorio tenerlo.
    if (padre.state.ImporteCapitalIP > 0 || padre.state.ImporteRentaIP > 0) {
      if (padre.state.ImporteCapitalIP > 0) {
        peticion.CapitalAdicionalFallecimiento = padre.state.ImporteCapitalIP;
      } else {
        peticion.CapitalAdicionalFallecimiento = 10000;
      }
    }

    //ITP
    if (
      padre.state.Chk30 != null &&
      (padre.state.Chk30 || padre.state.Chk60 || padre.state.Chk90)
    ) {
      if (padre.state.Chk30) peticion.ModalidadITP = 1;
      if (padre.state.Chk60) peticion.ModalidadITP = 2;
      if (padre.state.Chk90) peticion.ModalidadITP = 3;
      peticion.GarantiasAdicionalesITP = "1$".concat(
        +padre.state.Hospitalizacion,
        "2$",
        +padre.state.Intervenciones,
        "3$",
        +padre.state.Incapacidad
      );
      peticion.SolicitaPeriodoCarencia = padre.state.PeriodoCarencia;
      padre.state.PeriodoCarencia
        ? (peticion.FechaCarencia = padre.state.FechaEfectoSeguroOrigen.format(
            "DD/MM/YYYY"
          ))
        : null;
    }

    //Dependencia

    padre.state.ImporteRentaDependencia != 0 &&
    padre.state.ImporteRentaDependencia != null
      ? (peticion.RentaMensualDependencia = padre.state.ImporteRentaDependencia)
      : "";
    padre.state.EdadVencimiento != 0 && padre.state.EdadVencimiento != null
      ? (peticion.VencimientoCoberturaDependencia = padre.state.EdadVencimiento)
      : "";
    if (
      padre.state.EdadVencimiento != null &&
      padre.state.ImporteRentaDependencia != 0
    ) {
      peticion.ContratarDependencia =
        padre.state.EdadVencimiento != 0 ? "" : true;
    }
  }

  /*var FVencimiento = moment(padre.state.datosSimulacion.FVencimiento).format(
  "YYYY-MM-DD"
);

var FechaPrestacion = moment(
  padre.state.datosSimulacion.FechaApExtraordinaria
).format("YYYY-MM-DD");

if (padre.state.FechaEfectoITP != null) {
  var FechaEfectoITP = moment(padre.state.FechaEfectoITP).format(
    "YYYY-MM-DD"
  );
}*/

  var api = cargarApiSolicitudes("PlanUniversalAhorroFlexibleApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            Titulo: "Error: Solicitud de contratación",
            openAlert: true,
            botonActivo: false
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
            MensajeSolicitud: "La solicitud ha sido realizada",
            Titulo: "Solicitud de contratación",
            openAlert: true,
            ImporteFallecimiento: 0,
            CuotaNuevaFallecimiento: 0,
            botonActivo: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Error al realizar la solicitud",
          Titulo: "Error: Solicitud de contratación",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function ContratacionSolPPA(padre) {
  debugger;
  var inicioPeriodos = UnoMesSiguiente(Date.now());

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: inicioPeriodos,
    AportacionUnica: null,
    APPeriodica: null,
    FechaVencimiento: "",
    VenceDiaMesSiguienteEdad: null,
    HerederosLegales: true,
    CheckDomiciliarTodosRecibos: false,
    CheckAplicarPeriocidadRestoPlanes: false,
    Generica: null,
    Texto: null,
    FechaPrestacion: "",
    GarantiaBasica: "",
    GarantiasAdicionales: null,
    Hospitalizacion: null,
    Intervenciones: null,
    Incapacidad: null,
    ElimininarPeriodoCarencia: null,
    FechaEfectoITP: null,
    EdadVencimiento: null,
    AñosDuracion: null,
    FormaPago: padre.state.FormaPago,
    RentaMensualIP: "",
    ChekCargoCuentaCorriente: false
  };

  if (padre.state.datosSimulacion != null) {
    peticion.AportacionInicialExtraOrdinaria =
      padre.datosSimulacion.ApExtraordinaria;
    peticion.AportacionPeriodica = padre.datosSimulacion.ApPeriodica;
    peticion.CrecimientoAnual = padre.datosSimulacion.Crecimiento;
    //peticion.FormaPago = padre.datosSimulacion.Periodicidad;
    //peticion.CuentaCorriente = padre.datosSimulacion.CCC;
  }

  padre.state.Importe != 0
    ? (peticion.CapitalAdicionalFallecimiento =
        padre.state.ImporteFallecimiento)
    : null;

  padre.state.CCC != "" ? (peticion.CuentaCorriente = padre.state.CCC) : null;

  var api = cargarApiSolicitudes("ContratarPLanUniversalPPAApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            Titulo: "Error: Solicitud de contratación",
            openAlert: true,
            botonActivo: false
          });
          padre.setState({
            isSaving: false,
            MensajeSolicitud: res.statusText,
            Titulo: "Error: Solicitud de contratación de Accidentes Universal",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(
      res => {
        var resultado = res;
        if (resultado == "OK") {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: "Solicitud realizada correctamente",
            Titulo: "Solicitud de contratación de Accidentes Universal",
            openAlert: true,
            botonActivo: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Ha habido un error al realizar la solicitud",
          Titulo: "Solicitud de contratación de Accidentes Universal",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function SolicitarContratacionACCU(padre) {
  var inicioPeriodos = UnoMesSiguienteFormatoInclinado(Date.now());

  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: inicioPeriodos,
    CodPol: padre.state.poliza,
    UsoMoto250: padre.state.moto250,
    Fallecimiento: padre.state.fallecimiento,
    FallecimientoCirculacion: padre.state.fallCirculacion,
    Incapacidad: padre.state.incapacidad,
    IncapacidadCirculacion: padre.state.incCirculacion,
    CuentaBanco: padre.state.CCC,
    FormaPago: padre.state.periodicidad,
    CheckDomiciliarTodosRecibos: false,
    CheckAplicarPeriocidadRestoPlanes: false
  };

  var api = cargarApiSolicitudes("ContratarAccidentesUniversalApiSolicitudes");
  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
    }
  })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 401) {
          CerrarSession();
          ComprobarLogeo();
        }
      }
    })
    .then(function(data) {
      if (data.Error == false) {
        return data.Entidad;
      } else {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: res.statusText,
          Titulo: "Error: Solicitud de contratación de Accidentes Universal",
          openAlert: true,
          botonActivo: false
        });
      }
    })
    .then(
      Entidad => {
        if (Entidad > 0) {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: "La contratación ha sido solicitada",
            Titulo: "Solicitud de contratación",
            openAlert: true,
            botonActivo: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Error al realizar la solicitud",
          Titulo: "Error: Solicitud de contratación",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function SolicitarDuplicadoPoliza(padre) {
  var api = cargarApiSolicitudes("DuplicadosApiSolicitudes");
  var controller;
  var tipoDuplicado;

  switch (padre.state.codprod.trim()) {
    case "ACCU":
      tipoDuplicado = 1;
      break;
    case "RVR":
      tipoDuplicado = 5;
      break;
    case "RP65":
      controller = "RentaVitaliciaPatrimonio65/";
      break;
    case "PAH5":
      tipoDuplicado = 3;
      break;
    case "PSPP":
    case "PSPT":
    case "SAF":
    case "SAF1":
    case "PPA":
    case "PPA1":
    case "SVA":
      tipoDuplicado = 7;
      break;
    case "PUJ":
    case "PUJA":
    case "PUJR":
      tipoDuplicado = 6;
      break;
  }

  var Duplicado = {
    idDato: sessionStorage.idDato,
    FechaSolicitud: "",
    CodigoPoliza: padre.state.codpol,
    idCanalComunicacion: padre.state.canal,
    idCanalConcatenado: padre.state.destino,
    ListadoRecibos: "",
    DevolverCopiaFirmada: padre.state.copia,
    tipoDuplicado: tipoDuplicado
  };

  fetch(api, {
    method: "POST",
    body: JSON.stringify(Duplicado),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            Titulo: "Error: Solicitud de duplicado de pólizas",
            openAlert: true
          });
        }
      }
    })
    .then(
      res => {
        if (res.Error) {
          padre.setState({
            isSaving: false,
            MensajeSolicitud: res.Mensaje,
            Titulo: "Error: Solicitud de duplicados",
            openAlert: true
          });
        } else {
          padre.setState({
            isSaving: false,
            MensajeSolicitud:
              "La solicitud del duplicado se ha realizado correctamente",
            Titulo: "Solicitud de duplicados",
            openAlert: true
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Error al realizar la solicitud",
          Titulo: "Error: Solicitud de duplicados",
          openAlert: true
        });
      }
    );
}

function SolicitarDuplicadoRecibos(padre) {
  var recibos = "";

  for (var i = 0; i < padre.state.duplicadoRecibos.length; i++) {
    recibos = recibos + "&" + padre.state.duplicadoRecibos[i];
  }
  debugger;
  var Duplicado = {
    idDato: sessionStorage.idDato,
    FechaSolicitud: "",
    CodigoPoliza: padre.state.poliza,
    idCanalComunicacion: padre.state.Canal,
    idCanalConcatenado: padre.state.Destino,
    ListadoRecibos: recibos,
    DevolverCopiaFirmada: "false",
    tipoDuplicado: 9
  };
  var api = cargarApiSolicitudes("DuplicadosApiSolicitudes");
  debugger;
  fetch(api, {
    method: "POST",
    body: JSON.stringify(Duplicado),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
    }
  })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: res.statusText,
          Titulo: "Error: Solicitud de duplicado de recibos",
          openAlert: true
        });
      }
    })
    .then(
      res => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Solicitud de duplicado realizada correctamente",
          Titulo: "Solicitud de duplicados",
          openAlert: true
        });
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: "Error al realizar la solicitud",
          Titulo: "Error: Solicitud de duplicados",
          openAlert: true
        });
      }
    );
}

function SolicitarMisSolicitudes(padre) {
  let datos = [];
  let cols = [
    { Id: 0, Nombre: "Solicitud" },
    { Id: 1, Nombre: "Fecha de registro" },
    { Id: 2, Nombre: "Medio de entrada" },
    { Id: 3, Nombre: "Estado" },
    { Id: 4, Nombre: "Documentación pendiente" }
  ];

  var api = cargarApiSolicitudes("EstadosObtenerApiSolicitudes");

  fetch(api + sessionStorage.idDato + "/" + padre.state.paginaActual, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
          padre.setState({ isLoaded: true, error: true });
        }
      }
    })
    .then(
      res => {
        let numeroPaginas = res[0].NumeroPaginas;
        res.forEach(function(value, index) {
          datos.push([
            value.TipoSolicitud,
            value.FechaRegistro,
            value.Medio,
            value.Estado,
            value.PendienteDocumentacion
          ]);
        });

        padre.setState({
          isLoaded: true,
          columnas: cols,
          datos: datos,
          NumeroPaginas: numeroPaginas
        });
      },
      error => {
        padre.setState({ isLoaded: true, error: error });
      }
    );
}

function SolicitarContratacionPlusSalud(padre) {
  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: Fecha(UnoMesSiguienteFormatoInclinado(moment()._d)),
    FechaSolicitud: Fecha(moment()._d),
    idDatoTomador: sessionStorage.idDato,
    EliminarPeriodoCarencia: padre.state.ActivoCarencia,
    FechaEfectoSeguroOrigen: padre.state.FechaOrigen,
    idModalidadContrato: padre.state.idModalidad,
    CuentaBancaria: padre.state.CCC,
    PeriodicidadPago: padre.state.Periodicidad
  };

  if (padre.state.Beneficiarios.length > 1) {
    peticion.idDatoAsegurado1 = null;
    peticion.DatosPersonalesAsegurado1 = null;
    peticion.EliminarPeriodoCarenciaAsegurado1 =
      padre.state.Beneficiarios[1].Carencia;
    peticion.FechaEfectoSeguroOrigenAsegurado1 =
      padre.state.Beneficiarios[1].FechaCarencia;
    peticion.NombreAsegurado1 = padre.state.Beneficiarios[1].Nombre;
    peticion.Apellido1Asegurado1 = padre.state.Beneficiarios[1].Apellido1;
    peticion.Apellido2Asegurado1 = padre.state.Beneficiarios[1].Apellido2;
    peticion.idSexoAsegurado1 = padre.state.Beneficiarios[1].Sexo;
    peticion.FechaNacimientoAsegurado1 =
      padre.state.Beneficiarios[1].FechaNacimiento;
    peticion.DocumentoAsegurado1 = padre.state.Beneficiarios[1].NumDocumento;
    peticion.idTipoDocumentoAsegurado1 =
      padre.state.Beneficiarios[1].TipoDocumento;
  }

  if (padre.state.Beneficiarios.length > 2) {
    peticion.idDatoAsegurado2 = null;
    peticion.DatosPersonalesAsegurado2 = null;
    peticion.EliminarPeriodoCarenciaAsegurado2 =
      padre.state.Beneficiarios[2].Carencia;
    peticion.FechaEfectoSeguroOrigenAsegurado2 =
      padre.state.Beneficiarios[1].FechaCarencia;
    peticion.NombreAsegurado2 = padre.state.Beneficiarios[2].Nombre;
    peticion.Apellido1Asegurado2 = padre.state.Beneficiarios[2].Apellido1;
    peticion.Apellido2Asegurado = padre.state.Beneficiarios[2].Apellido2;
    peticion.idSexoAsegurado2 = padre.state.Beneficiarios[2].Sexo;
    peticion.FechaNacimientoAsegurado2 =
      padre.state.Beneficiarios[2].FechaNacimiento;
    peticion.DocumentoAsegurado2 = padre.state.Beneficiarios[2].NumDocumento;
    peticion.idTipoDocumentoAsegurado2 =
      padre.state.Beneficiarios[2].TipoDocumento;
  }

  if (padre.state.Beneficiarios.length > 3) {
    peticion.idDatoAsegurado3 = null;
    peticion.DatosPersonalesAsegurado3 = null;
    peticion.EliminarPeriodoCarenciaAsegurado3 =
      padre.state.Beneficiarios[3].Carencia;
    peticion.FechaEfectoSeguroOrigenAsegurado3 =
      padre.state.Beneficiarios[3].FechaCarencia;
    peticion.NombreAsegurado3 = padre.state.Beneficiarios[3].Nombre;
    peticion.Apellido1Asegurado3 = padre.state.Beneficiarios[3].Apellido1;
    peticion.Apellido2Asegurado3 = padre.state.Beneficiarios[3].Apellido2;
    peticion.idSexoAsegurado3 = padre.state.Beneficiarios[3].Sexo;
    peticion.FechaNacimientoAsegurado3 =
      padre.state.Beneficiarios[3].FechaNacimiento;
    peticion.DocumentoAsegurado3 = padre.state.Beneficiarios[3].NumDocumento;
    peticion.idTipoDocumentoAsegurado3 =
      padre.state.Beneficiarios[3].TipoDocumento;
  }

  if (padre.state.Beneficiarios.length > 4) {
    peticion.idDatoAsegurado4 = null;
    peticion.DatosPersonalesAsegurado4 = null;
    peticion.EliminarPeriodoCarenciaAsegurado4 =
      padre.state.Beneficiarios[4].Carencia;
    peticion.FechaEfectoSeguroOrigenAsegurado4 =
      padre.state.Beneficiarios[4].FechaCarencia;
    peticion.NombreAsegurado4 = padre.state.Beneficiarios[4].Nombre;
    peticion.Apellido1Asegurado4 = padre.state.Beneficiarios[4].Apellido1;
    peticion.Apellido2Asegurado4 = padre.state.Beneficiarios[4].Apellido2;
    peticion.idSexoAsegurado4 = padre.state.Beneficiarios[4].Sexo;
    peticion.FechaNacimientoAsegurado4 =
      padre.state.Beneficiarios[4].FechaNacimiento;
    peticion.DocumentoAsegurado4 = padre.state.Beneficiarios[4].NumDocumento;
    peticion.idTipoDocumentoAsegurado4 =
      padre.state.Beneficiarios[4].TipoDocumento;
  }

  if (padre.state.Beneficiarios.length > 5) {
    peticion.idDatoAsegurado5 = null;
    peticion.DatosPersonalesAsegurado5 = null;
    peticion.EliminarPeriodoCarenciaAsegurado5 =
      padre.state.Beneficiarios[4].Carencia;
    peticion.FechaEfectoSeguroOrigenAsegurado5 =
      padre.state.Beneficiarios[3].FechaCarencia;
    peticion.NombreAsegurado5 = padre.state.Beneficiarios[5].Nombre;
    peticion.Apellido1Asegurado5 = padre.state.Beneficiarios[5].Apellido1;
    peticion.Apellido2Asegurado5 = padre.state.Beneficiarios[5].Apellido2;
    peticion.idSexoAsegurado5 = padre.state.Beneficiarios[5].Sexo;
    peticion.FechaNacimientoAsegurado5 =
      padre.state.Beneficiarios[5].FechaNacimiento;
    peticion.DocumentoAsegurado5 = padre.state.Beneficiarios[5].NumDocumento;
    peticion.idTipoDocumentoAsegurado5 =
      padre.state.Beneficiarios[5].TipoDocumento;
  }

  var api = cargarApiSolicitudes("PlusSaludContratacionApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            AlertMensaje: data.Mensaje,
            AlertHeader: "Error: Solicitud de contratación de Plus Salud",
            openAlert: true,
            botonActivo: false
          });
        }
      }
    })
    .then(function(data) {
      if (data.Error == false) {
        return data.Entidad;
      } else {
        padre.setState({
          isSaving: false,
          AlertMensaje: data.Mensaje,
          AlertHeader: "Error: Solicitud de contratación de Plus Salud",
          openAlert: true,
          botonActivo: false
        });
      }
    })
    .then(
      Entidad => {
        if (Entidad > 0) {
          padre.setState({
            isSaving: false,
            AlertMensaje: "La contratación ha sido solicitada",
            AlertHeader: "Solicitud de contratación",
            openAlert: true,
            botonActivo: false,
            agregarAsegurado: false
          });
          let beneficiarios = padre.state.Beneficiarios;

          for (var i = 1; i < beneficiarios.length; i++) {
            beneficiarios.splice(i, beneficiarios.length);
          }
          if (padre.CalcularCuotaBeneficiarios != null) {
            padre.CalcularCuotaBeneficiarios();
          }
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          AlertMensaje: "Error al realizar la solicitud",
          AlertHeader: "Error: Solicitud de contratación",
          openAlert: true,
          botonActivo: false
        });
      }
    );
}

function SolicitarModificacionPlusSalud(padre) {
  if (padre.state.Beneficiarios.length > 1) {
    if (padre.state.CambioModalidad) {
      solicitarModificacionModalidadPlusSalud(padre);
    }
    SolicitarAgregarAseguradoPlusSalud(padre);
  } else {
    solicitarModificacionModalidadPlusSalud(padre);
  }
}

function SolicitarAgregarAseguradoPlusSalud(padre) {
  var listaAsegurados = [];

  var asegurados = padre.state.Beneficiarios;
  debugger;
  var peticion = {
    idDato: sessionStorage.idDato,
    FechaEfecto: Fecha(UnoMesSiguienteFormatoInclinado(moment()._d)),
    FechaSolicitud: Fecha(moment()._d),
    CodigoPoliza: padre.state.Poliza,
    idDatoTomador: sessionStorage.idDato,
    EliminarPeriodoCarencia: false,
    FechaEfectoSeguroOrigen: "",
    FechaEfectoSeguroOrigen_Internal: ""
  };

  for (var i = 1; i < asegurados.length; i++) {
    var Asegurado = {};
    Asegurado.idDatoAsegurado = null;
    Asegurado.DatosPersonales = null;
    asegurados[i].Carencia == ""
      ? (Asegurado.EliminarPeriodoCarencia = false)
      : (Asegurado.EliminarPeriodoCarencia = asegurados[i].Carencia);
    asegurados[i].FechaCarencia == ""
      ? (Asegurado.FechaEfectoSeguroOrigen = "")
      : (Asegurado.FechaEfectoSeguroOrigen = asegurados[i].FechaCarencia);
    Asegurado.Nombre = asegurados[i].Nombre;
    Asegurado.Apellido1 = asegurados[i].Apellido1;
    asegurados[i].Apellido2 == ""
      ? (Asegurado.Apellido2Asegurado = "")
      : (Asegurado.Apellido2Asegurado = asegurados[i].Apellido2);
    Asegurado.idSexo = asegurados[i].Sexo;
    Asegurado.FechaNacimiento = asegurados[i].FechaNacimiento;
    Asegurado.DocumentoAsegurado = asegurados[i].NumDocumento;
    Asegurado.idTipoDocumento = asegurados[i].TipoDocumento;

    listaAsegurados.push(Asegurado);
  }

  peticion.listaAsegurados = listaAsegurados;

  var api = cargarApiSolicitudes("PlusSaludAgregarAseguradoApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
    }
  })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 401) {
          CerrarSession();
          ComprobarLogeo();
        }
      }
    })
    .then(function(data) {
      if (data.Error == false) {
        return data.Entidad;
      } else {
        padre.state.mensajeResultado += "  " + data.Mensaje;
        padre.setState({
          isSaving: false,
          AlertMensaje: padre.state.mensajeResultado,
          AlertHeader: "Error: Solicitud de modificación de Plus Salud",
          openAlert: true,
          botonActivo: false,
          deshabilitarBoton: false
        });
      }
    })
    .then(
      Entidad => {
        if (Entidad > 0) {
          padre.state.mensajeResultado +=
            "  " + "La solicitud de alta de asegurado ha sido realizada";
          padre.setState({
            isSaving: false,
            AlertMensaje: padre.state.mensajeResultado,
            AlertHeader: "Solicitud de modificación",
            openAlert: true,
            botonActivo: true,
            deshabilitarBoton: false
          });
          let beneficiarios = padre.state.Beneficiarios;
          debugger;
          for (var i = 1; i < beneficiarios.length; i++) {
            beneficiarios.splice(i, beneficiarios.length);
          }
          if (padre.CalcularCuotaBeneficiarios != null) {
            padre.CalcularCuotaBeneficiarios();
          }
        }
      },
      error => {
        padre.state.mensajeResultado += "  " + "Error al realizar la solicitud";
        padre.setState({
          isSaving: false,
          AlertMensaje: padre.state.mensajeResultado,
          AlertHeader: "Error: Solicitud de modificación",
          openAlert: true,
          botonActivo: false,
          deshabilitarBoton: false
        });
      }
    );
}

function solicitarModificacionModalidadPlusSalud(padre) {
  var peticion = {
    IdDato: sessionStorage.idDato,
    FechaEfecto: padre.state.FechaEfecto,
    FechaSolicitud: "",
    CodigoPoliza: padre.props.poliza,
    ListadoIdDatoAsegurado: "",
    idModalidad: padre.state.idModalidad
  };

  var api = cargarApiSolicitudes("PlusSaludModificacionApiSolicitudes");

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
    }
  })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 401) {
          CerrarSession();
          ComprobarLogeo();
        }
      }
    })
    .then(function(data) {
      if (data.Error == false) {
        return data.Entidad;
      } else {
        padre.state.mensajeResultado += "  " + data.Mensaje;
        padre.setState({
          isSaving: false,
          AlertMensaje: padre.state.mensajeResultado,
          AlertHeader: "Error: Solicitud de modificación de Plus Salud",
          openAlert: true,
          botonActivo: false,
          deshabilitarBoton: false
        });
      }
    })
    .then(
      Entidad => {
        if (Entidad > 0) {
          padre.state.mensajeResultado +=
            "  " + "La modificación de la modalidad ha sido solicitada. ";

          padre.setState({
            isSaving: false,
            AlertMensaje: padre.state.mensajeResultado,
            AlertHeader: "Solicitud de modificación",
            openAlert: true,
            botonActivo: true,
            deshabilitarBoton: false
          });
        }
      },
      error => {
        padre.state.mensajeResultado += "  " + "Error al realizar la solicitud";
        padre.setState({
          isSaving: false,
          AlertMensaje: padre.state.mensajeResultado,
          AlertHeader: "Error: Solicitud de modificación",
          openAlert: true,
          botonActivo: false,
          deshabilitarBoton: false
        });
      }
    );
}

function ContratarFallecimientoConProducto(padre) {
  if (
    padre.state.codProd == "SVA" ||
    padre.state.codProd == "SAF" ||
    padre.state.codProd == "SAF1"
  ) {
    ContratacionSolSVA(padre);
  } else {
    ContratacionSolPPA(padre);
  }
}

// CONTRATACIÓN RVR
function ContratarRVR(padre) {
  let fechaEfecto = moment().set({
    year: moment()
      .add(1, "month")
      .year(),
    month: moment()
      .add(1, "month")
      .month(),
    date: 1
  });
  let fechaSolicitud = moment().format("L");

  let peticion = {
    IdDato: sessionStorage.idDato,
    ImporteAportacion: padre.state.Aportacion,
    CuentaBancariaRVMensual: padre.state.CCCCuotaMensual,
    CuentaBancariaReciboAportacion: padre.state.CCCCobroPrestacion,
    ModalidadContratacionRVR: Number(padre.state.ModalidadSeleted),
    FechaEfecto: padre.state.FechaInicio,
    FechaSolicitud: fechaSolicitud
  };

  let api = cargarApiSolicitudes(
    "ContratarRentaVitaliciaRemuneradaApiSolicitudes"
  );
  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
          mensaje: msgErrorContratar,
          header: "Error: Solicitud de contratación",
          openAlert: true,
          openPop: false
        });
      }
    );
}

// CONTRATACIÓN RP65
function ContratarRP65(padre) {

    let inicioPeriodos = UnoMesSiguienteFormatoInclinado(Date.now());
    let fechaSolicitud = moment().format("L");

  var peticion = {
      IdDato: sessionStorage.idDato,
      FechaEfecto:padre.state.FechaInicio,
      FechaSolicitud:fechaSolicitud,       
      ImporteAportacion: padre.state.Aportacion,
      CuentaBancariaRVP65Mensual: padre.state.CCCCuotaMensual,
      CuentaBancariaDomiciliarRecibo: padre.state.CCCCobroPrestacion,
      ModalidadContratacion: 5 || Number(padre.state.ModalidadSeleted) 
  };

  var api = cargarApiSolicitudes(
    "ContratarRentaVitaliciaPatrimonio65ApiSolicitudes"
  );

  fetch(api, {
    method: "POST",
    body: JSON.stringify(peticion),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Beared " + sessionStorage.Token
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
            mensaje: res.statusText,
            header: "Error: Solicitud de contratación de Plan Ahorro 5",
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
            header: "Solicitud de contratación de Plan Ahorro 5",
            openAlert: true,
            openPop: false
          });
        }
      },
      error => {
        padre.setState({
          isSaving: false,
          MensajeSolicitud: msgErrorContratar,
          Titulo: "Solicitud de contratación de Plan Ahorro 5",
          openAlert: true,
          openPop: false  
        });
      }
    );
}
