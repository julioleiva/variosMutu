import moment from "moment";
import StepWizard from "react-step-wizard";
import SimuladorContratacionRVR from "./SimuladorContratacionRVR.jsx";
import ResumenContratacionRVR from "../Resumen/ResumenContratacionRVR";

const minAport = 10000;
const maxAport = 250000000;


export default class ContratacionRVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Modalidad: this.props.Modalidad,
      ModalidadSeleted: 4,
      Aportacion: 10000,
      FechaInicio: moment().set({
        year: moment()
          .add(1, "month")
          .year(),
        month: moment()
          .add(1, "month")
          .month(),
        date: 1
      }),
      FechaNacimientoBeneficiario: moment(),
      AnosMinimo: this.props.AnosMinimo,
      Reversion: 50,
      key: 0,
      CodSec: "",
      CCCCobroPrestacion: this.props.CCCCobroPrestacion,
      CCCCuotaMensual: this.props.CCCCuotaMensual,
      DisabledBeneficiarios: false,
      openPop: false,
      header: "",
      mensaje: "",
      openAlert: false,
      openAlert2: false,
      columnas: this.props.columnas,
      DatosTablaRVR: this.props.DatosTablaRVR,
      thsize: this.props.thsize,
      error: false,
      Beneficiarios: 1,
      HerederosLegales: null,
      isLoading: this.props.isLoading,
      isSaving: false,
      isSaved: false,
      isLoaded: this.props.isLoaded,
      ClaseErrorAport: "",
      aportMin: 10000,
      aportMax: 250000000
    };
    let padre = this;
    this.CargarCuota = this.CargarCuota.bind(this);
  }

  componentDidMount() {
    this.CargamosCuota();
  }

  SolicitarContratacionRVR() {
    this.setState({ isSaving: true });
    let padre = this;
    $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
      ContratarRVR(padre);
    });
  }

  // Maneja evento cambio de valor en aportación. Refresca valores simulación
  CargarCuota() {
    let padre = this;
    $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
      CargarSimulacionRVR(
        padre,
        Number(padre.state.ModalidadSeleted),
        Number(padre.state.Aportacion) || 0,
        padre.state.AnosMinimo,
        padre.state.Reversion,
        padre.state.FechaInicio,
        padre.state.FechaNacimientoBeneficiario
      );
    });
  }

  ValoresPorDefecto() {
    this.setState({ Aportacion: 10000 });
    this.setState({
      FechaInicio: moment().set({
        year: moment()
          .add(1, "month")
          .year(),
        month: moment()
          .add(1, "month")
          .month(),
        date: 1
      })
    });
    this.setState({ FechaNacimientoBeneficiario: moment() });
    this.setState({ AnosMinimo: 0 });
    this.setState({ Reversion: "50" });
    var DatosTabla = [];
    DatosTabla.push(["Importe aportacion", 0]);
    DatosTabla.push(["Valor rescate", 0]);
    DatosTabla.push(["Capital fallecimiento", 0]);
    DatosTabla.push(["Renta mensual", 0]);
    this.setState({ DatosTablaRVR: DatosTabla });
  }

  // Validación pre-carga de cuota
  CargamosCuota() {
    let padre = this;

    var value = this.state.ModalidadSeleted;

    if (value == 4) {
      if (padre.state.FechaInicio != null) {
        this.CargarCuota();
      }
    }
    if (value == 5) {
      if (padre.state.FechaInicio != null) {
        this.CargarCuota();
      }
    }
  }

  SolicitarContratacionRVR() {
    this.setState({ isSaving: true });
    let padre = this;
    $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
      ContratarRVR(padre);
    });
  }

  //evento Slider aportación
  ChangeAportacion(value) {
    this.setState({ Aportacion: value });
    this.CargamosCuota();
  }

  // Evento al cambiar el combo de modalidad
  ChangeModalidad(value) {
    this.setState({ ModalidadSeleted: value });
    this.CargamosCuota();
    this.ValoresPorDefecto();
    if (value === 4) {
      this.setState({ DisabledReversion: false });
      this.setState({ DisabledSliderAnios: false });
      this.setState({ DisabledBeneficiarios: false });
      this.setState({ DisabledControlBeneficiarios: true });
      this.setState({ ModalidadSeleted: 4 });
    }
    if (value === 5) {
      this.setState({ DisabledReversion: false });
      this.setState({ DisabledSliderAnios: false });
      this.setState({ DisabledBeneficiarios: false });
      this.setState({ DisabledControlBeneficiarios: true });
      this.setState({ ModalidadSeleted: 5 });
    }
  }

  ChangeAportacionInput(value) {

    this.setState({ Aportacion: Number(value) });
    this.CargamosCuota();

  }


  handleChangeAport(value, event) {
    debugger
    if (event.currentTarget.value === "") {
      this.setState({
        Aportacion: 0,
        ClaseErrorExtr: ""
      }),
        this.CargamosCuota();
    } else if (value >= 0 && value <= maxAport && value >= minAport && !isNaN(value)) {
      this.setState({
        Aportacion: value,
        ClaseErrorExtr: ""
      }),
        this.CargamosCuota();
    }
    else {
      this.setState({
        Aportacion: 0,
        ClaseErrorExtr: "errorRango"
      });
      this.CargamosCuota();
    }
  }


  handleOnSolicitar() {
    this.setState({ openPop: true });
  }


  // Maneja Evento combo cuenta bancaria cuota
  handleChangeCCCCuotaMensual(value, ccc) {
    this.setState({ CodSec: value, CCCCuotaMensual: ccc });
  }

  // Maneja Evento combo cuenta bancaria cobro prestación
  handleChangeCCCPrestacion(value, ccc) {
    this.setState({ CodSec: value, CCCCobroPrestacion: ccc });
  }

  // Evento al pulsar el botón solicitar
  SolicitarContratacion() {
    this.setState({ isSaving: true });
    this.SolicitarContratacionRVR();
  }

  reload(e) {
    this.ValoresPorDefecto();
  }

  render() {
    return (
      <StepWizard>
        <SimuladorContratacionRVR
          Modalidad={this.props.Modalidad}
          ClaseErrorExtr={this.state.ClaseErrorExtr}
          AnosMinimo={this.props.AnosMinimo}
          FechaInicio={this.state.FechaInicio}
          Aportacion={this.state.Aportacion}
          DatosTablaRVR={this.state.DatosTablaRVR}
          AnosMinimo={this.state.AnosMinimo}
          Reversion={this.state.Reversion}
          columnas={this.state.columnas}
          thsize={this.state.thsize}
          poliza={this.state.poliza}
          CCCCuotaMensual={this.state.CCCCuotaMensual}
          CCCCobroPrestacion={this.state.CCCCobroPrestacion}
          SimulationIsLoaded={this.state.SimulationIsLoaded}
          ChangeAportacionInput={this.handleChangeAport.bind(this)}
          ChangeModalidad={this.ChangeModalidad.bind(this)}
          handleChangeCCCCuotaMensual={this.handleChangeCCCCuotaMensual.bind(this)}
          handleChangeCCCPrestacion={this.handleChangeCCCPrestacion.bind(this)}
          ValoresPorDefecto={this.ValoresPorDefecto.bind(this)}
        />
        <ResumenContratacionRVR
          isSaving={this.state.isSaving}
          Modalidad={this.state.Modalidad}
          AnosMinimo={this.state.AnosMinimo}
          Aportacion={this.state.Aportacion}
          CCC={this.state.CCCCuotaMensual}
          CCCPrestacion={this.state.CCCCobroPrestacion}
          SolicitarContratacion={this.SolicitarContratacion.bind(this)}
          Titulo={this.state.Titulo}
          FechaInicio={this.state.FechaInicio}
          MensajeSolicitud={this.state.MensajeSolicitud}
          openAlert={this.state.openAlert}
        />
      </StepWizard>
    );
  }
}
