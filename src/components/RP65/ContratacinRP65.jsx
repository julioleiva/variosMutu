import moment from "moment";
import StepWizard from "react-step-wizard";
import SimuladorContratacionRP65 from "./SimuladorContratacionRP65.jsx";
import ResumenContratacionRP65 from "../Resumen/ResumenContratacionRP65.jsx";

export default class ContratacionRP65 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Modalidad: this.props.Modalidad,
            ModalidadSeleted: 5,
            Aportacion: 0,
            FechaInicio: moment().set({
                year: moment()
                    .add(1, "month")
                    .year(),
                month: moment()
                    .add(1, "month")
                    .month(),
                date: 1
            }),
            AnosMinimo: this.props.AnosMinimo,
            key: 0,
            CodSec: "",
            CodSec2: "",
            CCCCobroPrestacion: "",
            CCCCuotaMensual: "",
            columnas: this.props.columnas,
            DatosTablaRVR: this.props.DatosTablaRVR,
            thsize: this.props.thsize,
            poliza: this.props.poliza,
            SimulationIsLoaded: this.props.SimulationIsLoaded,
            error: this.props.error,
            MensajeSolicitud: "",
            Titulo: "",
            openAlert: false,
            isSaving: false,
            FechaNacimientoBeneficiario: moment(),
            AnosMinimo: this.props.AnosMinimo,
            Reversion: 50,
        };
        let padre = this;
        this.CargamosCuota = this.CargamosCuota.bind(this);
    }

    ////Evento cuando cambia el combo de valor
    CargarCuota() {
        let padre = this;

        $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
            CargarSimulacionRP65(
                padre,
                Number(padre.state.ModalidadSeleted),
                padre.state.Aportacion,
                padre.state.AnosMinimo,
                padre.state.Reversion,
                padre.state.FechaInicio,
                padre.state.FechaNacimientoBeneficiario
            );
        });
    }

    //Lanza la contratación desde PopUp
    SolicitarContratacionRP65() {
        this.setState({ isSaving: true });
        let padre = this;
        $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
            ContratarRP65(padre);
        });
    }

    componentDidMount() {
        this.CargamosCuota();
    }

    ValoresPorDefecto() {
        this.setState({ Aportacion: 0 });
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

    //Validamos los datos antes de cargar la cuota
    CargamosCuota() {
        let padre = this;

        var value = this.state.ModalidadSeleted;
        if (value == "05") {
            if (padre.state.FechaInicio != null) {
                this.CargarCuota();
            }
        }
    }

    //Evento que se lanza cuando se mueve el slider de apotación
    ChangeAportacion(value) {
        this.setState({ Aportacion: value });
        this.CargamosCuota();
    }

    ////Evento al cambiar el combo de modalidad
    ChangeModalidad(value) {
        this.ValoresPorDefecto();
        this.setState({ ModalidadSeleted: value });

        if (value == "05") {
            this.setState({ DisabledReversion: false });
            this.setState({ DisabledSliderAnios: false });
            this.setState({ DisabledBeneficiarios: false });
            this.setState({ DisabledControlBeneficiarios: true });
            this.setState({ ModalidadSeleted: 5 });
        }
        this.CargamosCuota();
    }

    //combo de fecha
    ChangeFecha(value) {
        this.setState({ FechaInicio: moment(value) });
        this.CargamosCuota();
    }

    // Maneja Evento combo cuenta bancaria cuota
    handleChangeCCCCuotaMensual(value, ccc) {
        this.setState({ CodSec: value, CCCCuotaMensual: ccc });
    }

    // Maneja Evento combo cuenta bancaria cobro prestación
    handleChangeCCCPrestacion(value, ccc) {
        this.setState({ CodSec: value, CCCCobroPrestacion: ccc });
    }

    //Evento al pulsar el botón solicitar del POP
    SolicitarContratacion() {
        this.setState({ isSaving: true });
        //this.setState({ openAlert: false });
        this.SolicitarContratacionRP65();
    }

    render() {
        // console.log("SimulatiosIsLoaded en contrataciónRP65",this.props.simulatiosIsLoaded)
        // console.log("CCCCobroPrestacion en contratacion", this.state.CCCCobroPrestacion);
        // console.log("CCCCuotaMensual en contratacion", this.state.CCCCuotaMensual);
        return (
            <StepWizard>
                <SimuladorContratacionRP65
                    Modalidad={this.props.Modalidad}
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
                    ChangeModalidad={this.ChangeModalidad.bind(this)}
                    ChangeAportacion={this.ChangeAportacion.bind(this)}
                    ChangeFecha={this.ChangeFecha.bind(this)}
                    handleChangeCCCCuotaMensual={this.handleChangeCCCCuotaMensual.bind(this)}
                    handleChangeCCCPrestacion={this.handleChangeCCCPrestacion.bind(this)}
                />
                <ResumenContratacionRP65
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