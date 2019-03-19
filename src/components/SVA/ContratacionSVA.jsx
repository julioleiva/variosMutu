import ContratacionAhorroSVA from "./ContratacionAhorroSVA.jsx";
import ContratacionRiesgoSVA from "./ContratacionRiesgoSVA.jsx";
import SolicitarSimJubilacion from "../Otros/SolicitarSimJubilacion";
import ResumenContratacionSVA from "../Resumen/ResumenContratacionSVA";
import { SimulacionJubilacion } from "../../Scripts/JS/Clases.js";
import moment from "moment";
import StepWizard from "react-step-wizard";
import NavStepper from "../Otros/NavStepper";

const maxAportacionSVA = 50000;
const accionMaestroRentas = 4;

export default class ContratacionSVA extends React.Component {
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

        //let datosPrueba = new SimulacionJubilacion(0,0,0,0,0,0,messig,messig,0,0,12,0,0,0,messig,messig,'',0,'SVA' ,'',null,moment(),moment(),moment());
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
            "SAF1",
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
            ImporteFallecimiento: 0,
            CuotaNuevaFallecimiento: 0,
            MaestroValoresRentaIP: [],
            ImporteRentaIP: 0,
            indRentaIP: "",
            ImporteCapitalIP: 0,
            CuotaNuevaRentaIP: 0,
            CuotaNuevaCapitalIP: 0,
            Chk30: false,
            Chk60: false,
            Chk90: false,
            Hospitalizacion: false,
            Intervenciones: false,
            Incapacidad: false,
            PeriodoCarencia: false,
            DateEnabledFESO: false,
            FechaEfectoSeguroOrigen: moment(),
            CuotaNuevaITP: 0,
            MaestroValoresRentaDependencia: [],
            ImporteRentaDependencia: 0,
            indRentaDependencia: "",
            CuotaNuevaRentaDependencia: 0,
            MaestroValoresEdadVencimiento: [],
            EdadVencimiento: edadJubilacion,
            indEdadVencimiento: null,
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
        } else if (value >= 0 && value <= maxAportacionSVA && !isNaN(value)) {
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
        } else if (value >= 0 && value <= maxAportacionSVA && !isNaN(value)) {
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

    handleReload(e) {
        e.preventDefault();
        this.setState({
            datosSimulacion: {
                ...this.state.datosSimulacion,
                FVencimiento: this.state.datosSimulacion.FVencimientoInicial,
                ApExtraordinaria: 0,
                ApPeriodica: 0,
                Periodicidad: 12,
                Crecimiento: 0,
                FechaApExtraordinaria: this.state.datosSimulacion.FechaApExtraordinariaInicial,
                FechaAper: this.state.datosSimulacion.FechaAperInicial
            }
        });
        this.CargarSimulacion();
    }


    //Simulación jubilación para un nuevo producto
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

    //*****************************************EVENTOS FALLECIMIENTO******************************************************
    //Función que carga el simulador de cuotas
    CargarSimuladorFallecimiento() {
        let padre = this;
        $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
            CargarSimulacionFallecimientoPUA(
                padre,
                padre.state.datosSimulacion.Producto,
                null,
                padre.state.ImporteFallecimiento,
                padre.state.datosSimulacion.Periodicidad,
                sessionStorage.nMutu
            );
        });
    }
    //Evento que se lanza cuando se mueve el slider
    ChangeCapitalFallecimiento(value) {
        this.setState({ ImporteFallecimiento: value });
        this.CargarSimuladorFallecimiento();
    }

    //*********************************************EVENTOS IP************************************************

    //Función que carga el simulador de cuotas para rentas
    CargarSimuladorRentasIP() {
        let padre = this;
        debugger;
        $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
            CargarSimulacionIncapacidadNoPSPTPUA(
                padre,
                padre.state.datosSimulacion.Producto,
                padre.state.ImporteRentaIP,
                padre.state.datosSimulacion.Periodicidad
            );
        });
    }

    //Función que carga el simulador de cuotas
    CargarSimuladorCapitalIP() {
        let padre = this;
        $.getScript("/Scripts/JS/GestionSimulacion.jsx", function () {
            CargarSimulacionIncapacidadPermanentePUA(
                padre,
                padre.state.datosSimulacion.Producto,
                padre.state.ImporteCapitalIP,
                padre.state.datosSimulacion.Periodicidad
            );
        });
    }

    //Evento que se lanza cuando se mueve el slider de rentas
    ChangeCapitalRentasIP(value) {
        this.setState({ ImporteRentaIP: value });
        this.CargarSimuladorRentasIP();
    }

    //Evento que se lanza cuando se mueve el slider de capital
    ChangeCapitalCapitalIP(value) {
        this.setState({ ImporteCapitalIP: value });
        this.CargarSimuladorCapitalIP();
    }

    //Carga el maestro de valores de dependencia
    CargarMaestroValoresRentaIP() {
        let padre = this;
        $.getScript("/Scripts/JS/GestionSimulacionSeguros.jsx", function () {
            CargarValoresRentasIP(padre, accionMaestroRentas);
        });
    }

    // *************************************** EVENTOS DE DEPENDENCIA *******************************************

    //Función que carga la cuota de dependencia despues de simular
    CargarSimuladorRentasDependencia() {
        let padre = this;

        $.getScript("/Scripts/JS/GestionSimulacionSeguros.jsx", function () {
            CargarCuotaDependenciaPUA(
                padre,
                padre.state.ImporteRentaDependencia,
                padre.state.EdadVencimiento,
                padre.state.datosSimulacion.Periodicidad,
                padre.state.Acumulado
            );
        });
    }

    //Evento que se lanza cuando se mueve el slider de edad de vencimiento
    ChangeEdadVencimiento(value) {
        this.setState({ EdadVencimiento: value });
        this.CargarSimuladorRentasDependencia();
    }

    //Evento que se lanza cuando se mueve el slider de renta 
    ChangeRentaDependencia(value) {
        this.setState({ ImporteRentaDependencia: value });
        this.setState({});
        this.CargarSimuladorRentasDependencia();
    }

    //Carga el maestro de valores de dependencia
    CargarMaestroValoresRentaDependencia() {
        let padre = this;
        $.getScript("/Scripts/JS/GestionSimulacionSeguros.jsx", function () {
            CargarValoresRentasDependencia(padre, accionMaestroRentas);
        });
    }

    //Carga el maestro de valores de edad de vencimiento
    CargarMaestroValoresEdadVencimiento() {
        let padre = this;
        $.getScript("/Scripts/JS/GestionSimulacionSeguros.jsx", function () {
            CargarValoresEdadVencimiento(padre, accionMaestroRentas);
        });
    }


    // *************************************** EVENTOS DE ITP *******************************************

    //Se carga la cuota
    CargarCuotaITP() {
        let padre = this;

        $.getScript("/Scripts/JS/GestionSimulacionSeguros.jsx", function () {
            CargarCuotaITP(
                padre,
                padre.state.Chk30,
                padre.state.Chk60,
                padre.state.Chk90,
                padre.state.Hospitalizacion,
                padre.state.Intervenciones,
                padre.state.Incapacidad,
                padre.state.datosSimulacion.Periodicidad,
                padre.state.datosSimulacion.Producto
            );
        });
    }

    //Evento al pulsar radio button 30
    handleChange30(value) {
        this.setState({ Chk30: true, Chk60: false, Chk90: false });
        this.CargarCuotaITP();
    }

    //Evento al pulsar radio button 60
    handleChange60(value) {
        this.setState({ Chk30: false, Chk60: true, Chk90: false });
        this.CargarCuotaITP();
    }

    //Evento al pulsar radio button 90
    handleChange90(value) {
        this.setState({ Chk30: false, Chk60: false, Chk90: true });
        this.CargarCuotaITP();
    }

    //check de hospitalización
    handleChangeHospitalizacion(evt) {
        if (this.state.Hospitalizacion == false) {
            this.setState({ Hospitalizacion: true });
        } else {
            this.setState({ Hospitalizacion: false });
        }
        this.CargarCuotaITP();
    }

    //check de intervenciones
    handleChangeIntervenciones(evt) {
        if (this.state.Intervenciones == false) {
            this.setState({ Intervenciones: true });
        } else {
            this.setState({ Intervenciones: false });
        }
        this.CargarCuotaITP();
    }

    //check de incapacidad
    handleChangeIncapacidad(evt) {
        if (this.state.Incapacidad == false) {
            this.setState({ Incapacidad: true });
        } else {
            this.setState({ Incapacidad: false });
        }
        this.CargarCuotaITP();
    }

    //check de periodo
    handleChangePeriodoCarencia(evt) {
        if (this.state.PeriodoCarencia == false) {
            this.setState({ PeriodoCarencia: true });
            this.setState({ DateEnabledFESO: true });

            //this.changeFEfecto(null);
        } else {
            this.setState({ PeriodoCarencia: false });
            this.setState({ DateEnabledFESO: false });
            this.setState({ FechaEfectoSeguroOrigen: moment() });
        }
    }

    changeFEfectoSeguroOrigen(date) {
        this.setState({ FechaEfectoSeguroOrigen: moment(date) });
    }

    //***************************OTROS EVENTOS*********************
    RefrescarKey() {
        this.setState({ key: this.state.key + 1 });
    }

    reload(e) {
        this.RefrescarKey();
        reloadFallecimiento(e);
        reloadIP(e);
        reloadITP(e);
        reloadDependencia(e);
    }

    reloadFallecimiento(e) {
        this.setState({ ImporteFallecimiento: 0, CuotaNuevaFallecimiento: 0 });
    }

    reloadIP(e) {
        this.setState({
            ImporteRenta: 0,
            ImporteCapital: 0,
            CuotaNuevaRenta: 0,
            CuotaNuevaCapital: 0
        });
    }

    reloadITP(e) {
        this.setState({
            Hospitalizacion: false,
            Intervenciones: false,
            Incapacidad: false,
            Chk30: false,
            Chk60: false,
            Chk90: false,
            CuotaActual: 0,
            CuotaNueva: 0,
            Periodo: false,
            GarantiaBasica: 1,
            FechaEfectoITP: null,
            DateEnabled: true
        });
    }

    reloadDependencia(e) {
        this.setState({
            EdadVencimiento: 65,
            Importe: 0,
            CuotaNuevaRentaDependencia: 0,
            Acumulado: false
        });
    }

    //Función de contratar
    SolicitarContratacion() {
        let padre = this;
        this.setState({ isSaving: true });
        if (this.state.ImporteRentaIP > 0) this.state.indRentaIP = GetIndiceRenta(this.state.ImporteRentaIP, this.state.MaestroValoresRentaIP);
        if (this.state.ImporteRentaDependencia > 0) this.state.indRentaDependencia = GetIndiceRenta(this.state.ImporteRentaDependencia, this.state.MaestroValoresRentaDependencia);
        if (this.state.EdadVencimiento != null && this.state.ImporteRentaDependencia != 0) this.state.indEdadVencimiento = GetIndiceRenta(this.state.EdadVencimiento, this.state.MaestroValoresEdadVencimiento);

        $.getScript("/Scripts/JS/GestionSolicitud.jsx", function () {
            ContratacionSolSVA(padre);
        });
    }

    handleOnSolicitar() {
        this.SolicitarContratacion();
    }

    componentDidMount() {
        this.CargarSimulacion();
        this.CargarMaestroValoresRentaDependencia();
        this.CargarMaestroValoresRentaIP();
        this.CargarMaestroValoresEdadVencimiento();
    }

    render() {
        const edadActual = moment().diff(moment(sessionStorage.Fnacimiento, "DD/MM/YYYY"), 'years');
        return (
            <div id="stepContratarSAF1">
                {edadActual <= 69
                    ?
                    <StepWizard>
                        <ContratacionAhorroSVA
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
                            reload={this.handleReload.bind(this)}
                        />
                        <ContratacionRiesgoSVA
                            datosSimulacion={this.state.datosSimulacion}
                            FormaPago={this.state.FormaPago}
                            ImporteFallecimiento={this.state.ImporteFallecimiento}
                            CuotaNuevaFallecimiento={this.state.CuotaNuevaFallecimiento}
                            ImporteRentaIP={this.state.ImporteRentaIP}
                            ImporteCapitalIP={this.state.ImporteCapitalIP}
                            CuotaNuevaRentaIP={this.state.CuotaNuevaRentaIP}
                            CuotaNuevaCapitalIP={this.state.CuotaNuevaCapitalIP}
                            Chk30={this.state.Chk30}
                            Chk60={this.state.Chk60}
                            Chk90={this.state.Chk90}
                            Hospitalizacion={this.state.Hospitalizacion}
                            Intervenciones={this.state.Intervenciones}
                            Incapacidad={this.state.Incapacidad}
                            PeriodoCarencia={this.state.PeriodoCarencia}
                            DateEnabledFESO={this.state.DateEnabledFESO}
                            FechaEfectoSeguroOrigen={this.state.FechaEfectoSeguroOrigen}
                            CuotaNuevaITP={this.state.CuotaNuevaITP}
                            ImporteRentaDependencia={this.state.ImporteRentaDependencia}
                            CuotaNuevaRentaDependencia={this.state.CuotaNuevaRentaDependencia}
                            EdadVencimiento={this.state.EdadVencimiento}
                            ChangeCapitalFallecimiento={this.ChangeCapitalFallecimiento.bind(this)}
                            ChangeCapitalCapitalIP={this.ChangeCapitalCapitalIP.bind(this)}
                            ChangeCapitalRentasIP={this.ChangeCapitalRentasIP.bind(this)}
                            handleChange30={this.handleChange30.bind(this)}
                            handleChange60={this.handleChange60.bind(this)}
                            handleChange90={this.handleChange90.bind(this)}
                            handleChangeHospitalizacion={this.handleChangeHospitalizacion.bind(this)}
                            handleChangeIntervenciones={this.handleChangeIntervenciones.bind(this)}
                            handleChangeIncapacidad={this.handleChangeIncapacidad.bind(this)}
                            handleChangePeriodoCarencia={this.handleChangePeriodoCarencia.bind(this)}
                            changeFEfectoSeguroOrigen={this.changeFEfectoSeguroOrigen.bind(this)}
                            ChangeRentaDependencia={this.ChangeRentaDependencia.bind(this)}
                            ChangeEdadVencimiento={this.ChangeEdadVencimiento.bind(this)}
                        />
                        <ResumenContratacionSVA
                            datosSimulacion={this.state.datosSimulacion}
                            SolicitarContratacion={this.SolicitarContratacion.bind(this)}
                            ImporteFallecimiento={this.state.ImporteFallecimiento}
                            ImporteRentaIP={this.state.ImporteRentaIP}
                            ImporteCapitalIP={this.state.ImporteCapitalIP}
                            CuotaNuevaITP={this.state.CuotaNuevaITP}
                            Hospitalizacion={this.state.Hospitalizacion}
                            Intervenciones={this.state.Intervenciones}
                            Incapacidad={this.state.Incapacidad}
                            Chk30={this.state.Chk30}
                            Chk60={this.state.Chk60}
                            Chk90={this.state.Chk90}
                            PeriodoCarencia={this.state.PeriodoCarencia}
                            FechaEfectoSeguroOrigen={this.state.FechaEfectoSeguroOrigen}
                            EdadVencimiento={this.state.EdadVencimiento}
                            ImporteRentaDependencia={this.state.ImporteRentaDependencia}
                            MensajeSolicitud={this.state.MensajeSolicitud}
                            isSaving={this.state.isSaving}
                            showMessage={this.state.showMessage}
                            isSaved={this.state.isSaved}
                        />
                    </StepWizard>
                    :
                    <StepWizard>
                        <ContratacionAhorroSVA
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
                            reload={this.handleReload.bind(this)}
                        />
                        <ResumenContratacionSVA
                            datosSimulacion={this.state.datosSimulacion}
                            SolicitarContratacion={this.SolicitarContratacion.bind(this)}
                            ImporteFallecimiento={this.state.ImporteFallecimiento}
                            ImporteRentaIP={this.state.ImporteRentaIP}
                            ImporteCapitalIP={this.state.ImporteCapitalIP}
                            CuotaNuevaITP={this.state.CuotaNuevaITP}
                            Hospitalizacion={this.state.Hospitalizacion}
                            Intervenciones={this.state.Intervenciones}
                            Incapacidad={this.state.Incapacidad}
                            Chk30={this.state.Chk30}
                            Chk60={this.state.Chk60}
                            Chk90={this.state.Chk90}
                            PeriodoCarencia={this.state.PeriodoCarencia}
                            FechaEfectoSeguroOrigen={this.state.FechaEfectoSeguroOrigen}
                            EdadVencimiento={this.state.EdadVencimiento}
                            ImporteRentaDependencia={this.state.ImporteRentaDependencia}
                            MensajeSolicitud={this.state.MensajeSolicitud}
                            isSaving={this.state.isSaving}
                            showMessage={this.state.showMessage}
                            isSaved={this.state.isSaved}
                        />
                    </StepWizard>
                }</div>
        );
    }
}
