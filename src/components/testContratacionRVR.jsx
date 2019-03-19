import ValoresContratacionRVR from "./ValoresContratacionRVR.jsx";
import { SimulacionJubilacion } from "../../Scripts/JS/Clases.js";
import moment from "moment";
import ResumenContratacionRVR from "../Resumen/ResumenContratacionRVR";
import TablaBaseExport from "../Tablas/TablaBaseExport.jsx";
import SolicitarCuentaBancariaDoble from "../Otros/SolicitarCuentaBancariaDoble";
import StepWizard from "react-step-wizard";

// Eliminar cuando acabe desarrollo
import PopSolRVR from "../PopUp/PopSolRVR";
import Alert from "../PopUp/Alert.jsx";

export default class ContratacionRVR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Modalidad: this.props.Modalidad,
            ModalidadSeleted: 4,
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
            isLoaded: this.props.isLoaded,
            error: false,
            Beneficiarios: 1,
            HerederosLegales: null,
            isLoading: this.props.isLoading
        };
        let padre = this;
        this.CargarCuota = this.CargarCuota.bind(this);
    }

    componentDidMount() {
        this.CargamosCuota();
    }

    solicitarContratacion() {
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
                padre.state.Aportacion,
                padre.state.AnosMinimo,
                padre.state.Reversion,
                padre.state.FechaInicio,
                padre.state.FechaNacimientoBeneficiario
            );
        });
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

    // Validación pre-carga de cuota
    CargamosCuota() {
        let padre = this;

        var value = this.state.ModalidadSeleted;

        /* if (value == "01") {
          if (padre.state.FechaInicio != null) {
            this.CargarCuota();
          }
        }
        if (value == "02") {
          if (padre.state.FechaInicio != null || this.state.AnosMinimo > 0) {
            this.CargarCuota();
          }
        }
        if (value == "03") {
          if (
            padre.state.FechaInicio != null ||
            this.state.FechaNacimientoBeneficiario != null ||
            this.state.Reversion != null
          ) {
            this.CargarCuota();
          }
        }
        */
        debugger;
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

    //evento Slider aportación
    ChangeAportacion(value) {
        this.setState({ Aportacion: value });
        this.CargamosCuota();
    }

    ChangeNacimientoBeneficiario(value) {
        this.setState({ FechaNacimientoBeneficiario: moment(value) });
        this.CargamosCuota();
    }

    // Evento al cambiar el combo de modalidad
    ChangeModalidad(value) {
        this.setState({ ModalidadSeleted: value });
        this.CargamosCuota();
        this.ValoresPorDefecto();
        /* if (value == "01") {
          this.setState({ DisabledReversion: false });
          this.setState({ DisabledSliderAnios: false });
          this.setState({ DisabledBeneficiarios: false });
          this.setState({ DisabledControlBeneficiarios: false });
        }
        if (value == "02") {
          this.setState({ DisabledReversion: false });
          this.setState({ DisabledSliderAnios: true });
          this.setState({ DisabledBeneficiarios: false });
          this.setState({ DisabledControlBeneficiarios: false });
        }
        if (value == "03") {
          this.setState({ DisabledReversion: true });
          this.setState({ DisabledSliderAnios: false });
          this.setState({ DisabledBeneficiarios: true });
          this.setState({ DisabledControlBeneficiarios: true });
        } */

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

    //combo de fecha
    ChangeFecha(value) {
        this.setState({ FechaInicio: moment(value) });
        this.CargamosCuota();
    }

    handleOnSolicitar() {
        this.setState({ openPop: true });
    }

    //cerrar alert
    closeAlert() {
        this.setState({ openAlert: false });
    }

    //Evento al cerrar el PopUp
    closeModal() {
        this.setState({ openPop: false });
    }

    // Maneja Evento combo cuenta bancaria cuota
    handleChangeCCCCuotaMensual(value, ccc) {
        this.setState({ CodSec: value, CCCCuotaMensual: ccc });
    }

    // Maneja Evento combo cuenta bancaria cobro prestación
    handleChangeCCCPrestacion(value, ccc) {
        this.setState({ CodSec: value, CCCCobroPrestacion: ccc });
    }

    reload(e) {
        this.ValoresPorDefecto();
    }

    render() {
        const aportValue = this.state.Aportacion > 0;
        const cccMensualidad = this.state.CCCCuotaMensual;
        const defValueCCC = "Seleccione una cuenta";

        return (
            <section className="section jubilacion">
                <h2 className="section-title">
                    Renta Vitalicia{" "}
                    <button className="reload" onClick={this.reload.bind(this)} />
                </h2>
                <div className="card">
                    <div className="form-sim">
                        <div className="form-group-container">
                            <ValoresContratacionRVR
                                AnosMinimo={this.state.AnosMinimo}
                                Modalidad={this.state.Modalidad}
                                ModalidadSelected={this.state.ModalidadSelected}
                                FechaInicio={this.state.FechaInicio}
                                Aportacion={this.state.Aportacion}
                                FechaNacimientoBeneficiario={
                                    this.state.FechaNacimientoBeneficiario
                                }
                                ChangeModalidad={this.ChangeModalidad.bind(this)}
                                DisabledReversion={this.state.DisabledReversion}
                                DisabledSliderAnios={this.state.DisabledSliderAnios}
                                DisabledBeneficiarios={this.state.DisabledBeneficiarios}
                                ChangeFecha={this.ChangeFecha.bind(this)}
                                ChangeAportacion={this.ChangeAportacion.bind(this)}
                                ChangeNacimientoBeneficiario={this.ChangeNacimientoBeneficiario.bind(
                                    this
                                )}
                            />
                            <section>
                                <TablaBaseExport
                                    datos={this.state.DatosTablaRVR}
                                    poliza={null}
                                    columnas={this.state.columnas}
                                    thsize={this.state.thsize}
                                    isLoaded={this.state.isLoaded}
                                    error={this.state.error}
                                />

                                <SolicitarCuentaBancariaDoble
                                    handleChangeCCCCuotaMensual={this.handleChangeCCCCuotaMensual.bind(
                                        this
                                    )}
                                    handleChangeCCCPrestacion={this.handleChangeCCCPrestacion.bind(
                                        this
                                    )}
                                />

                                <div className="col-lg-12 col-sm-12">
                                    <input
                                        type="button"
                                        className="btn-no-product"
                                        onClick={this.handleOnSolicitar.bind(this)}
                                        disabled={
                                            !cccMensualidad ||
                                            cccMensualidad === defValueCCC ||
                                            !aportValue
                                        }
                                        value="Solicitar"
                                    />
                                </div>
                            </section>
                            <Alert
                                header={this.state.header}
                                mensaje={this.state.mensaje}
                                openAlert={this.state.openAlert}
                                closeAlert={this.closeAlert.bind(this)}
                            />
                            <PopSolRVR
                                isSaving={this.state.isSaving}
                                Modalidad={this.state.Modalidad}
                                AnosMinimo={this.state.AnosMinimo}
                                Aportacion={this.state.Aportacion}
                                openPop={this.state.openPop}
                                closeModal={this.closeModal.bind(this)}
                                CCCCuotaMensual={this.state.CCCCuotaMensual}
                                solicitarContratacion={this.solicitarContratacion.bind(this)}
                                CCCCobroPrestacion={this.state.CCCCobroPrestacion}
                            />
                            <ResumenContratacionRVR
                                isSaving={this.state.isSaving}
                                Modalidad={this.state.Modalidad}
                                AnosMinimo={this.state.AnosMinimo}
                                Aportacion={this.state.Aportacion}
                                openPop={this.state.openPop}
                                closeModal={this.closeModal.bind(this)}
                                CCCCuotaMensual={this.state.CCCCuotaMensual}
                                solicitarContratacion={this.solicitarContratacion.bind(this)}
                                CCCCobroPrestacion={this.state.CCCCobroPrestacion}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
