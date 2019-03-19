import ValoresContratacionRVR from "./ValoresContratacionRVR.jsx";
import SolicitarCuentaBancariaDoble from "../Otros/SolicitarCuentaBancariaDoble";
import TablaBaseExport from "../Tablas/TablaBaseExport.jsx";


export default class SimualdorContratacionRVR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        };
        this.ChangeAportacionInput = this.ChangeAportacionInput.bind(this);
        this.ChangeModalidad = this.ChangeModalidad.bind(this)
        this.handleChangeCCCCuotaMensual = this.handleChangeCCCCuotaMensual.bind(this);
        this.handleChangeCCCPrestacion = this.handleChangeCCCPrestacion.bind(this);
        this.ValoresPorDefecto = this.ValoresPorDefecto.bind(this);
    }

    //Input de aportación
    ChangeAportacionInput(value, event) {
        this.props.ChangeAportacionInput(value, event);
    }

    ValoresPorDefecto(value) {
        this.props.ValoresPorDefecto(value)
    }

    ChangeModalidad(value) {
        this.props.ChangeModalidad(value)
    }

    handleChangeCCCCuotaMensual(value, ccc) {
        this.props.handleChangeCCCCuotaMensual(value, ccc);
    }

    handleChangeCCCPrestacion(value, ccc) {
        this.props.handleChangeCCCPrestacion(value, ccc);
    }

    reload(e) {
        this.ValoresPorDefecto();
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
        this.props.lastStep.call();
        this.scrollToTop();
    }

    render() {

        const cccMensualidad = this.props.CCCCuotaMensual;
        const aportValue = this.props.Aportacion > 0
        const defValueCCC = "Seleccione una cuenta";
        const minAport = 0;
        const maxAport = 0;
        const range = minAport >= 10000 && maxAport <= 250000000;

        console.log("¿En rango?:", range);

        return (
            <section className="section jubilacion">
                <h2 className="section-title">
                    Renta Variable Remunerada<button
                        className="reload"
                        onClick={this.reload.bind(this)}
                    />
                </h2>
                <div className="card">
                    <div className="card-body">
                        <div className="form-group-container">
                            <ValoresContratacionRVR
                                ClaseErrorExtr={this.props.ClaseErrorExtr}
                                AnosMinimo={this.props.AnosMinimo}
                                Modalidad={this.props.Modalidad}
                                FechaInicio={this.props.FechaInicio}
                                Aportacion={this.props.Aportacion}
                                SimulationIsLoaded={this.props.SimulationIsLoaded}
                                FechaNacimientoBeneficiario={this.props.FechaNacimientoBeneficiario}
                                ChangeAportacionInput={this.ChangeAportacionInput.bind(this)}
                                ChangeModalidad={this.ChangeModalidad.bind(this)}
                            />
                            <TablaBaseExport
                                datos={this.props.DatosTablaRVR}
                                poliza={null}
                                columnas={this.props.columnas}
                                thsize={this.props.thsize}
                                SimulationIsLoaded={this.props.SimulationIsLoaded}
                                error={this.props.error}
                            />

                            <SolicitarCuentaBancariaDoble
                                handleChangeCCCCuotaMensual={this.handleChangeCCCCuotaMensual.bind(this)}
                                handleChangeCCCPrestacion={this.handleChangeCCCPrestacion.bind(this)}
                            />
                        </div>
                        <div id="footerStep">
                            <button
                                className="btn-success float-right"
                                disabled={!cccMensualidad || cccMensualidad === defValueCCC || !aportValue || range}
                                onClick={() => { this.lastStep() }}   >
                                <span>Solicitar contratación</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
