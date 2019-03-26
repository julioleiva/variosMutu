import ContratacionAhorroPAH5 from "./ContratacionAhorroPAH5";
import ResumenContratacionPAH5 from "../Resumen/ResumenContratacionPAH5";
import { SimulacionJubilacion } from "../../Scripts/JS/Clases.js";
import moment from "moment";
import StepWizard from "react-step-wizard";

const MAX_APORT_PAH5 = 5000;

export default class ContratacionPAH5 extends React.Component {
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
        var ano5 = moment().set({
            year:
                moment()
                    .add(1, "month")
                    .year() + 5,
            month: moment()
                .add(1, "month")
                .month(),
            date: 1
        });

        let fechaJub = moment().set({
            year: moment(sessionStorage.Fnacimiento, "DD/MM/YYYY")
                .add(65, "years")
                .add(1, "month")
                .year(),
            month: moment(sessionStorage.Fnacimiento, "DD/MM/YYYY")
                .add(1, "month")
                .month(),
            date: 1
        });
        let edadJubilacion = fechaJub.diff(moment(sessionStorage.Fnacimiento, "DD/MM/YYYY"), 'years');


        let datosPrueba = new SimulacionJubilacion(
            0,
            0,
            edadJubilacion,
            0,
            0,
            messig,
            messig,
            0,
            0,
            12,
            12,
            0,
            0,
            messig,
            messig,
            sessionStorage.Fnacimiento,
            "",
            0,
            "",
            "",
            "",
            ano5,
            ano5
        );

        this.state = {
            isSimrenta: false,
            CCC: "",
            FormaPago: 12,
            datosSimulacion: datosPrueba,
            ClaseErrorExtr: "",
            ClaseErrorAport: "",
            isSaved: false,
            showMessage: false,
            key: 0,
            datos: [],
            isSim: false,
            error: null,
            valido: null,
            MensajeSolicitud: "",
            Titulo: "",
            isSaving: false,
            MensajeSolicitud: "",
            isSaved: false,
            showMessage: false,
        };
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

    //--------LANZA SOLICITUD CONTRATACIÓN--------
    SolicitarContratacion() {
        let padre = this;
        this.setState({ isSaving: true });
        $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
            ContratarPH5(padre, padre.state.datosSimulacion);
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
            this.setState({ valido: valido });
            $.getScript("/Scripts/JS/GestionValidaciones.jsx", function () {
                ValidarMaximosPAH5(padre, padre.state.datosSimulacion);
            });
        }
    }

    //--------MANEJA EVENTO CAMBIO CANTIDAD APORTACIÓN PERIÓDICA-------------- 
    handleOnEndAP(value, event) {
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

    //--------MANEJA EVENTO CAMBIO FECHA APORTACION PERIÓDICA-------------- 
    handleChangeFAPER(value) {
        this.setState({
            datosSimulacion: {
                ...this.state.datosSimulacion,
                FechaAper: moment(value)
            }
        });
        this.CargarSimulacion();
    }

    //--------MANEJA EVENTO CAMBIO FECHA VENCIMIENTO----------- 
    handlechangeFVEN(value) {
        let fVencimiento = moment(value);
        let edadJubilacion = fVencimiento.diff(moment(sessionStorage.Fnacimiento, "DD/MM/YYYY"), 'years');
        this.setState({
            datosSimulacion: {
                ...this.state.datosSimulacion,
                FVencimiento: moment(value),
                EdadJubilacion: edadJubilacion
            }
        });
        this.CargarSimulacion();
    }
    //--------MANEJA EVENTO CAMBIO CUENTA BANCARIA-------------- 
    handleChangeCCC(value, ccc) {
        this.setState({
            datosSimulacion: {
                ...this.state.datosSimulacion,
                CodSec: value,
                CCC: ccc
            },
            CCC: ccc
        });
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

    RefrescarKey() {
        this.setState({ key: this.state.key + 1 });
    }

    reload(e) {
        this.RefrescarKey();
    }

    /* handleOnSolicitar() {
         debugger;
         this.SolicitarContratacion();
     } */

    render() {
        const edadActual = moment().diff(moment(sessionStorage.Fnacimiento, "DD/MM/YYYY"), 'years');

        return (
            <div id="stepContratarPH5">
                <StepWizard>
                    <ContratacionAhorroPAH5
                        datosSimulacion={this.state.datosSimulacion}
                        CCC={this.state.CCC}
                        FormaPago={this.state.FormaPago}
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
                    <ResumenContratacionPAH5
                        datosSimulacion={this.state.datosSimulacion}
                        SolicitarContratacion={this.SolicitarContratacion.bind(this)}
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
