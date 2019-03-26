import ValoresSimulacionPAH5 from "./ValoresSimulacionPAH5.jsx";
import LineSimCapitalEst from "../Graficos/LineSimCapitalEst";
import TablaPreChartPAH5 from "../Tablas/TablaPreChartPAH5";
import SolicitarSimJubilacion from "../Otros/SolicitarSimJubilacion";
import AñadirCuenta from "../Otros/AñadirCuenta";
import ErrorBoundary from "../Otros/ErrorBoundary.jsx";

const MAX_APORT_PAH5 = 5000;


export default class SimuladorAhorroPAH5 extends React.Component {
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
        return (
            <section className="section jubilacion">
                <h2 className="section-title">
                    Simulador Plan De Ahorro 5{" "}
                    <button className="reload" onClick={this.reload} />
                </h2>
                <div className="card">
                    <div className="card-body">
                        <div className="form-group-container">
                            <ErrorBoundary>
                                <ValoresSimulacionPAH5
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
                                    <TablaPreChartPAH5
                                        datosSimulacion={this.props.datosSimulacion}
                                    />
                                </ErrorBoundary>
                                <span className="clearfix" />
                                <ErrorBoundary>
                                    <LineSimCapitalEst
                                        loaded={this.props.isSim}
                                        datos={this.props.datos}
                                    />
                                </ErrorBoundary>
                            </div>
                            <ErrorBoundary>
                                <SolicitarSimJubilacion
                                    handleChangeCCC={this.handleChangeCCC.bind(this)}
                                />
                            </ErrorBoundary>
                        </div>
                        <span className="clearfix" />
                        <div id="footerStep">
                            <button className="btn-success float-right"
                                disabled={
                                    !(
                                        (this.props.datosSimulacion.ApExtraordinaria > 0 &&
                                            this.props.datosSimulacion.ApExtraordinaria <= MAX_APORT_PAH5) ||
                                        (this.props.datosSimulacion.ApPeriodica > 0 &&
                                            this.props.datosSimulacion.ApPeriodica <= MAX_APORT_PAH5)
                                    )
                                }
                                onClick={() => { this.lastStep(); }}><span>Siguiente</span></button>
                        </div>
                        <ErrorBoundary>
                            <AñadirCuenta />
                        </ErrorBoundary>
                    </div>
                </div>
            </section>
        );
    }
}
