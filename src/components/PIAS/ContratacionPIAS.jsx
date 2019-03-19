import ContratacionAhorroPIAS from "./ContratacionAhorroPIAS.jsx";
import SolicitarSimJubilacion from "../Otros/SolicitarSimJubilacion";
import ResumenContratacionPIAS from "../Resumen/ResumenContratacionPIAS";
import { SimulacionJubilacion } from "../../Scripts/JS/Clases.js";
import moment from "moment";
import StepWizard from "react-step-wizard";

const maxAportacionPIAS = 8000;

export default class ContratacionPIAS extends React.Component {
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
        let padre = this;

        //  let datosPrueba = new SimulacionJubilacion(0,0,0,0,0,0,messig,messig,0,0,12,0,0,0,messig,messig,'',0,'PIAS' ,'',null,moment(),fechaJub,fechaJub);
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
            "SAF",
            "",
            "",
            fechaJub,
            fechaJub
        );
        // let datosPrueba = new SimulacionJubilacion(0,0,0,600,600,messig,messig,1,1,12,12,0,0,messig,messig,'01/01/1983','PAH110',3000,"Plan De Ahorro 5",null,null,moment().add(5,"year"),moment().add(5,"year"));
        this.state = {
            isSim: false,
            isSimrenta: false,
            CCC: "",
            FormaPago: 12,
            datosSimulacion: datosPrueba,
            ClaseErrorExtr: "",
            ClaseErrorAport: "",
            error: null,
            datos: [],
            RentaSaldo: "--- €",
            Renta15: "--- €",
            RentaMutualista: "--- €",
            isSaving: false,
            MensajeSolicitud: "",
            isSaved: false,
            showMessage: false,
            key: 0
        };
        this.reload = this.reload.bind(this);
    }

    ///Eventos
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
        } else if (value >= 0 && value <= maxAportacionPIAS && !isNaN(value)) {
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
        } else if (value >= 0 && value <= maxAportacionPIAS && !isNaN(value)) {
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

    handleSelectPeriodicidad(value) {
        this.setState({
            datosSimulacion: { ...this.state.datosSimulacion, Periodicidad: value }
        });
        this.CargarSimulacion();
    }

    handleSelectCrecimiento(value) {
        this.setState({
            datosSimulacion: { ...this.state.datosSimulacion, Crecimiento: value }
        });
        this.CargarSimulacion();
    }

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

    //Es la misma simulacion que la de PH5
    CargarSimulacion() {
        let padre = this;
        if (
            this.state.datosSimulacion.FechaAper != null &&
            this.state.datosSimulacion.FechaApExtraordinaria != null
        ) {
            this.setState({ isSim: false });
            $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
                CargarSimulacionJubilacionCodProducto(padre, padre.state.datosSimulacion);
            });
        }
    }

    ValidarAportaciones() {
        var valido = true;

        if (this.state.datosSimulacion.ApExtraordinaria > maxAportacionPIAS) {
            valido = false;
        }

        if (this.state.datosSimulacion.ApPeriodica * this.state.datosSimulacion.Periodicidad > maxAportacionPIAS) {
            valido = false;
        }

        if (this.state.datosSimulacion.ApPeriodica * this.state.datosSimulacion.Periodicidad + this.state.datosSimulacion.ApExtraordinaria > maxAportacionPIAS) {
            valido = false;
        }

        if (valido) {
            let padre = this;
            this.setState({ valido: valido });
            $.getScript("/Scripts/JS/GestionValidaciones.jsx", function () {
                ValidarMaximosPAH5(padre, padre.state.datosSimulacion);
            });
        }
    }

    reload(e) {
        e.preventDefault();
        this.setState({
            datosSimulacion: {
                ...this.state.datosSimulacion,
                FVencimiento: this.state.datosSimulacion.FVencimientoInicial,
                ApExtraordinaria: this.state.datosSimulacion.ApExtraordinariaInicial,
                ApPeriodica: this.state.datosSimulacion.ApPeriodicaInicial,
                Periodicidad: this.state.datosSimulacion.PeriodicidadInicial,
                Crecimiento: this.state.datosSimulacion.CrecimientoInicial,
                FechaApExtraordinaria: this.state.datosSimulacion.FechaApExtraordinariaInicial,
                FechaAper: this.state.datosSimulacion.FechaAperInicial
            }
        });
        this.CargarSimulacion();
    }

    handleOnSolicitar() {
        this.ValidarAportaciones();
        this.SolicitarContratacion();
    }

    //Función que contratar
    SolicitarContratacion() {
        let padre = this;
        this.setState({ isSaving: true });
        $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
            ContratacionSolPIAS(padre);
        });
    }

    componentDidMount() {
        this.CargarSimulacion();
    }


    render() {
        return (
            <div id="stepContratarPIAS">
                <StepWizard>
                    <ContratacionAhorroPIAS
                        datosSimulacion={this.state.datosSimulacion}
                        CCC={this.state.CCC}
                        FormaPago={this.state.FormaPago}
                        ClaseErrorExtr={this.state.ClaseErrorExtr}
                        ClaseErrorAport={this.state.ClaseErrorAport}
                        rangemax={this.state.rangemax}
                        isSim={this.state.isSim}
                        datos={this.state.datos}
                        RentaSaldo={this.state.RentaSaldo}
                        Renta15={this.state.Renta15}
                        RentaMutualista={this.state.RentaMutualista}
                        changeFVEN={this.handlechangeFVEN.bind(this)}
                        onEndAEPU={this.handleOnEndAEPU.bind(this)}
                        onEndAP={this.handleOnEndAP.bind(this)}
                        MostraFechaExtraordinaria={true}
                        selectPeriodicidad={this.handleSelectPeriodicidad.bind(this)}
                        selectCrecimiento={this.handleSelectCrecimiento.bind(this)}
                        changeFAPE={this.handleChangeFAPE.bind(this)}
                        changeFAPER={this.handleChangeFAPER.bind(this)}
                        handleChangeCCC={this.handleChangeCCC.bind(this)}
                        reload={this.reload.bind(this)}
                    />
                    <ResumenContratacionPIAS
                        datosSimulacion={this.state.datosSimulacion}
                        SolicitarContratacion={this.SolicitarContratacion.bind(this)}
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
