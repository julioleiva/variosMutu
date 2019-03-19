import ValoresContratacionSVA from "./ValoresContratacionSVA.jsx";
import LineSimCapitalEst from "../Graficos/LineSimCapitalEst";
import TablaPreChart from "../Tablas/TablaPreChart";
import TablaRentaCalculada from "../Tablas/TablaRentaCalculada";
import SolicitarSimJubilacion from "../Otros/SolicitarSimJubilacion";
import { SimulacionJubilacion } from "../../Scripts/JS/Clases.js";
import moment from "moment";
import ErrorBoundary from "../Otros/ErrorBoundary.jsx";

const maxAportacionSVA = 50000;

export default class ContratacionAhorroSVA extends React.Component {
    constructor(props) {
        super(props);
        this.changeFVEN = this.changeFVEN.bind(this);
        this.onEndAEPU = this.onEndAEPU.bind(this);
        this.onEndAP = this.onEndAP.bind(this);
        this.changeFAPE = this.changeFAPE.bind(this);
        this.changeFAPER = this.changeFAPER.bind(this);
        this.selectPeriodicidad = this.selectPeriodicidad.bind(this);
        this.selectCrecimiento = this.selectCrecimiento.bind(this);
        this.handleChangeCCC = this.handleChangeCCC.bind(this);
        this.reload = this.reload.bind(this);
        this.state = { intervalId: 0 };
    }

    ///Eventos
    onEndAEPU(value, event) {
        this.props.onEndAEPU(value, event);
    }

    onEndAP(value, event) {
        this.props.onEndAP(value, event);
    }

    selectPeriodicidad(value) {
        this.props.selectPeriodicidad(value);
    }

    selectCrecimiento(value) {
        this.props.selectCrecimiento(value);
    }

    changeFAPE(value) {
        this.props.changeFAPE(value);
    }

    changeFAPER(value) {
        this.props.changeFAPER(value);
    }

    changeFVEN(value) {
        this.props.changeFVEN(value);
    }

    handleChangeCCC(value, ccc) {
        this.props.handleChangeCCC(value, ccc);
    }

    reload(e) {
        this.props.reload(e);
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    nextStep() {
        this.props.nextStep.call();
        this.scrollToTop();
    }

    lastStep() {
        debugger;
        this.props.lastStep.call();
        this.scrollToTop();
    }

    render() {
        const edadActual = moment().diff(moment(sessionStorage.Fnacimiento, "DD/MM/YYYY"), 'years');
        return (
            <section className="section jubilacion">
                <h2 className="section-title">
                    Ahorro{" "}
                    <button className="reload" onClick={this.reload.bind(this)} />
                </h2>
                <div className="card">
                    <div className="card-body">
                        <div className="form-group-container">
                            <ErrorBoundary>
                                <ValoresContratacionSVA
                                    datosSimulacion={this.props.datosSimulacion}
                                    CCC={this.props.CCC}
                                    FormaPago={this.props.FormaPago}
                                    ClaseErrorExtr={this.props.ClaseErrorExtr}
                                    ClaseErrorAport={this.props.ClaseErrorAport}
                                    rangemax={this.props.rangemax}
                                    changeFVEN={this.changeFVEN.bind(this)}
                                    onEndAEPU={this.onEndAEPU.bind(this)}
                                    onEndAP={this.onEndAP.bind(this)}
                                    MostraFechaExtraordinaria={true}
                                    selectPeriodicidad={this.selectPeriodicidad.bind(this)}
                                    selectCrecimiento={this.selectCrecimiento.bind(this)}
                                    changeFAPE={this.changeFAPE.bind(this)}
                                    changeFAPER={this.changeFAPER.bind(this)}
                                />
                            </ErrorBoundary>
                            <div className="col-lg-6 col-sm-12 graph-window">
                                <ErrorBoundary>
                                    <TablaPreChart datosSimulacion={this.props.datosSimulacion} />
                                </ErrorBoundary>
                                <span className="clearfix" />
                                <ErrorBoundary>
                                    <LineSimCapitalEst
                                        loaded={this.props.isSim}
                                        datosSimulacion={this.props.datosSimulacion}
                                        datos={this.props.datos}
                                    />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    {this.props.datosSimulacion.ApExtraordinaria != "--" &&
                                        this.props.datosSimulacion.ApPeriodica != "--" && (
                                            <TablaRentaCalculada
                                                loaded={this.props.isSim}
                                                RentaSaldo={this.props.RentaSaldo}
                                                Renta15={this.props.Renta15}
                                                RentaMutualista={this.props.RentaMutualista}
                                            />
                                        )}
                                </ErrorBoundary>
                            </div>
                            <ErrorBoundary>
                                <SolicitarSimJubilacion handleChangeCCC={this.handleChangeCCC.bind(this)} />
                            </ErrorBoundary>
                        </div>
                        <span className="clearfix" />
                        <div id="footerStep">
                            {edadActual <= 69 &&
                                <button className="btn-danger aniadir"
                                    disabled={
                                        !(
                                            (this.props.datosSimulacion.ApExtraordinaria > 0 &&
                                                this.props.datosSimulacion.ApExtraordinaria <= maxAportacionSVA) ||
                                            (this.props.datosSimulacion.ApPeriodica > 0 &&
                                                this.props.datosSimulacion.ApPeriodica <= maxAportacionSVA)
                                        )
                                    }
                                    onClick={() => { this.nextStep(); }}><span>Añadir coberturas de riesgo</span></button>
                            }
                            <button className="btn-success float-right"
                                disabled={
                                    !(
                                        (this.props.datosSimulacion.ApExtraordinaria > 0 &&
                                            this.props.datosSimulacion.ApExtraordinaria <= maxAportacionSVA) ||
                                        (this.props.datosSimulacion.ApPeriodica > 0 &&
                                            this.props.datosSimulacion.ApPeriodica <= maxAportacionSVA)
                                    )
                                }
                                onClick={() => { this.lastStep(); }}><span>Solicitar contratación</span></button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}