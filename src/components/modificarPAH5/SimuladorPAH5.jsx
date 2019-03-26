import SimuladorAhorroPAH5 from "./SimuladorAhorroPAH5.jsx";
import ResumenModificacionPAH5 from "../Resumen/ResumenModificacionPAH5";
import { SimulacionJubilacion } from "../../Scripts/JS/Clases.js";
import StepWizard from "react-step-wizard";
import moment from "moment";

const MAX_APORT_PAH5 = 5000;

export default class SimuladorPAH5 extends React.Component {
  constructor(props) {
    super(props);

    var messig = moment().set({
      year: moment()
        .add(1, "month")
        .year(),
      month: moment()
        .add(1, "month")
        .month(),
      date: 1
    });
    let padre = this;

    let datosPrueba = new SimulacionJubilacion(
      null,
      null,
      null,
      this.props.ApExtraordinaria,
      this.props.ApExtraordinaria,
      moment(),
      moment(),
      this.props.ApPeriodica,
      this.props.ApPeriodica,
      this.props.Periodicidad,
      this.props.Periodicidad,
      this.props.Crecimiento,
      this.props.Crecimiento,
      messig,
      messig,
      this.props.FechaNacimiento,
      this.props.CodPol,
      this.props.CapitalActual,
      this.props.Producto,
      null,
      null,
      moment(this.props.FVencimiento),
      moment(this.props.FVencimiento)
    );


    this.state = {
      datos: [],
      CCC: "",
      isSim: false,
      error: null,
      datosSimulacion: datosPrueba,
      valido: null,
      ClaseErrorExtr: "",
      ClaseErrorAport: "",
      isSavingEx: false,
      isSavingAp: false,
      keysol: 0,
      MensajeSolicitud: "",
      isSaving: false,
      isSaved: false,
      showMessage: false,
    };
    this.reload = this.handleReload.bind(this);
  }

  componentDidMount() {
    this.CargarSimulacion();
  }

  //--------CARGA DATOS SIMULACIÓN---------
  CargarSimulacion() {
    let padre = this;
    this.setState({ isSim: false });
    $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
      CargarSimulacionPAH5(padre, padre.state.datosSimulacion);
    });
  }

  //--------LANZA SOLICITUD MODIFICACIÓN--------
  ModificarPH5() {
    let padre = this;
    $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
      if (padre.state.datosSimulacion.ApExtraordinaria > 1) {
        padre.setState({ isSavingEx: true });
        ModificarExtraPH5(padre, padre.state.datosSimulacion);
      }

      if (padre.state.datosSimulacion.ApPeriodica > 1) {
        padre.setState({ isSavingAp: true });
        ModificarPeriodicaPH5(padre, padre.state.datosSimulacion);
      }
    });
  }

  //-----VALIDA DATOS ANTES DE LANZAR PETICIÓN DE SIMULACIÓN------      
  ValidarAportaciones() {
    var valido = true;

    if (this.state.datosSimulacion.ApExtraordinaria > MAX_APORT_PAH5) {
      valido = false;
    }

    if (
      this.state.datosSimulacion.ApPeriodica *
      this.state.datosSimulacion.Periodicidad > MAX_APORT_PAH5
    ) {
      valido = false;
    }

    if (
      this.state.datosSimulacion.ApPeriodica *
      this.state.datosSimulacion.Periodicidad +
      this.state.datosSimulacion.ApExtraordinaria > MAX_APORT_PAH5
    ) {
      valido = false;
    }

    if (valido == false) {
      this.setState({ openAlertAviso: true });
    }

    if (valido) {
      let padre = this;
      this.setState({ valido: null });
      $.getScript("/Scripts/JS/GestionValidaciones.jsx", function () {
        ValidarMaximosPAH5(padre, padre.state.datosSimulacion);
      });
    }
  }

  //--------MANEJA EVENTO CAMBIO CANTIDAD APORTACIÓN PERIÓDICA-------------- 
  handleOnEndAP(value, event) {
    debugger;
    if (event.currentTarget.value == "") {
      this.setState({
        datosSimulacion: {
          ...this.state.datosSimulacion,
          ApPeriodica: 0
        },
        ClaseErrorAport: ""
      });
      if (this.state.datosSimulacion.ApExtraordinaria != "--") {
        this.CargarSimulacion();
      }
    } else if (value >= 0 && value <= MAX_APORT_PAH5 && !isNaN(value)) {
      this.setState({
        datosSimulacion: {
          ...this.state.datosSimulacion,
          ApPeriodica: value
        },
        ClaseErrorAport: ""
      });
      if (this.state.datosSimulacion.ApExtraordinaria != "--") {
        this.CargarSimulacion();
      }
    } else {
      this.setState({
        datosSimulacion: {
          ...this.state.datosSimulacion,
          ApPeriodica: "--"
        },
        ClaseErrorAport: "errorRango"
      });
    }
  }

  //--------MANEJA EVENTO CAMBIO CANTIDAD APORTACIÓN EXTRAORDINARIA PAGO ÚNICO--------------
  handleOnEndAEPU(value, event) {
    debugger;
    if (event.currentTarget.value == "") {
      this.setState({
        datosSimulacion: {
          ...this.state.datosSimulacion,
          ApExtraordinaria: 0
        },
        ClaseErrorExtr: ""
      });
      if (this.state.datosSimulacion.ApPeriodica != "--") {
        this.CargarSimulacion();
      }
    } else if (value >= 0 && value <= MAX_APORT_PAH5 && !isNaN(value)) {
      this.setState({
        datosSimulacion: {
          ...this.state.datosSimulacion,
          ApExtraordinaria: value
        },
        ClaseErrorExtr: ""
      });
      if (this.state.datosSimulacion.ApPeriodica != "--") {
        this.CargarSimulacion();
      }
    } else {
      this.setState({
        datosSimulacion: {
          ...this.state.datosSimulacion,
          ApExtraordinaria: "--"
        },
        ClaseErrorExtr: "errorRango"
      });
    }
  }

  //--------MANEJA EVENTO CAMBIO SELECT PERIODICIDAD-------------- 
  handleSelectPeriodicidad(value) {
    this.setState({
      datosSimulacion: { ...this.state.datosSimulacion, Periodicidad: value }
    });
    this.CargarSimulacion();
  }


  //--------MANEJA EVENTO CAMBIO SELECT CRECIMIENTO ANUAL ACUMULATIVO--------
  handleSelectCrecimiento(value) {
    this.setState({
      datosSimulacion: { ...this.state.datosSimulacion, Crecimiento: value }
    });
    this.CargarSimulacion();
  }

  //--------MANEJA EVENTO CAMBIO FECHA APORTACION EXTRAORDINARIA--------------   
  handleChangeFAPE(value) {
    this.setState({
      datosSimulacion: {
        ...this.state.datosSimulacion,
        FechaApExtraordinaria: moment(value)
      }
    });
    this.CargarSimulacion();
  }

  handleChangeFAPER(value) {
    this.setState({
      datosSimulacion: {
        ...this.state.datosSimulacion,
        FechaAper: moment(value)
      }
    });
    this.CargarSimulacion();
  }

  handlechangeFVEN(value) {
    this.setState({
      datosSimulacion: {
        ...this.state.datosSimulacion,
        FVencimiento: moment(value)
      }
    });
    this.CargarSimulacion();
  }


  // ------MANEJA EVENTO REFRESCO DE DATOS---------
  handleReload(e) {
    e.preventDefault();
    this.setState({
      datosSimulacion: {
        ...this.state.datosSimulacion,
        FVencimiento: this.state.datosSimulacion.FVencimientoInicial,
        ApExtraordinaria: this.state.datosSimulacion.ApExtraordinariaInicial,
        ApPeriodica: this.state.datosSimulacion.ApPeriodicaInicial,
        Periodicidad: this.state.datosSimulacion.PeriodicidadInicial,
        Crecimiento: this.state.datosSimulacion.CrecimientoInicial,
        FechaApExtraordinaria: this.state.datosSimulacion
          .FechaApExtraordinariaInicial,
        FechaAper: this.state.datosSimulacion.FechaAperInicial
      }
    });

    if (
      this.state.datosSimulacion.ApExtraordinariaInicial > 0 &&
      this.state.datosSimulacion.ApExtraordinariaInicial < 300
    ) {
      this.setState({
        datosSimulacion: { ...this.state.datosSimulacion, ApExtraordinaria: 0 }
      });
    }

    this.CargarSimulacion();
  }

  //--------MANEJA EVENTO CAMBIO CUENTA BANCARIA--------------   
  handleChangeCCC(value, ccc) {
    this.setState({
      datosSimulacion: {
        ...this.state.datosSimulacion,
        CodSec: value,
        CCC: ccc
      }
    });
  }

  //---------------------------
  SolicitarModicacion() {
    this.setState({ isSaving: true });
    this.ModificarPH5();
  }

  render() {
    return (
      <div id="stepContratarPH5">
        <StepWizard>
          <SimuladorAhorroPAH5
            datosSimulacion={this.state.datosSimulacion}
            CCC={this.state.CCC}
            ClaseErrorExtr={this.state.ClaseErrorExtr}
            ClaseErrorAport={this.state.ClaseErrorAport}
            isSim={this.state.isSim}
            datos={this.state.datos}
            changeFVEN={this.handlechangeFVEN.bind(this)}
            onEndAEPU={this.handleOnEndAEPU.bind(this)}
            onEndAP={this.handleOnEndAP.bind(this)}
            MostraFechaExtraordinaria={true}
            selectPeriodicidad={this.handleSelectPeriodicidad.bind(this)}
            selectCrecimiento={this.handleSelectCrecimiento.bind(this)}
            changeFAPE={this.handleChangeFAPE.bind(this)}
            changeFAPER={this.handleChangeFAPER.bind(this)}
            handleChangeCCC={this.handleChangeCCC.bind(this)}
            reload={this.handleReload.bind(this)}
          />
          <ResumenModificacionPAH5
            datosSimulacion={this.state.datosSimulacion}
            SolicitarModicacion={this.SolicitarModicacion.bind(this)}
            FechaEfectoSeguroOrigen={this.state.FechaEfectoSeguroOrigen}
            EdadVencimiento={this.state.EdadVencimiento}
            MensajeSolicitud={this.state.MensajeSolicitud}
            isSaving={this.state.isSaving}
            showMessage={this.state.showMessage}
            isSaved={this.state.isSaved}
          />
        </StepWizard>
      </div>
    );
  }
}
