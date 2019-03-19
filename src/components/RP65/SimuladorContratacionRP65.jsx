import ValoresContratacionRP65 from "./ValoresContratacionRP65.jsx";
import SolicitarCuentaBancariaDoble from "../Otros/SolicitarCuentaBancariaDoble";
import TablaBaseExport from "../Tablas/TablaBaseExport.jsx";


export default class SimualdorContratacionRP65 extends React.Component {
    constructor(props) {
        super(props);
        // this.ChangeAportacion = this.ChangeAportacion.bind(this);
        this.ChangeAportacionInput = this.ChangeAportacionInput.bind(this);
        this.handleChangeCCCCuotaMensual = this.handleChangeCCCCuotaMensual.bind(this);
        this.handleChangeCCCPrestacion = this.handleChangeCCCPrestacion.bind(this);
        this.state = { intervalId: 0 };
        // this.handleOnSolicitar=this.handleOnSolicitar.bind(this)
    }

     //Input de aportación
    ChangeAportacionInput(value) {
        this.props.ChangeAportacionInput(value);
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
        debugger;
        this.props.lastStep.call();
        this.scrollToTop();
    }

    render() {
        const cccMensualidad = this.props.CCCCuotaMensual;
        const aportValue = this.props.Aportacion > 0
        const defValueCCC = "Seleccione una cuenta";

        return (
            <section className="section jubilacion">
                <h2 className="section-title">
                    Renta Patrimonio 65<button
                    className="reload"
                    onClick={this.reload.bind(this)}
                />
            </h2>
            <div className="card">
                <div className="card-body">
                    <div className="form-group-container">
                        <ValoresContratacionRP65
                            AnosMinimo={this.props.AnosMinimo}
                            Modalidad={this.props.Modalidad}
                            FechaInicio={this.props.FechaInicio}
                            Aportacion={this.props.Aportacion}
                            SimulationIsLoaded={this.props.SimulationIsLoaded}
                            FechaNacimientoBeneficiario={this.props.FechaNacimientoBeneficiario}                            
                            ChangeAportacionInput={this.ChangeAportacionInput.bind(this)}
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
                    disabled={!cccMensualidad || cccMensualidad === defValueCCC || !aportValue}
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
