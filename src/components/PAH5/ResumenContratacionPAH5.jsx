export default class ResumenContratacionPAH5 extends React.Component {
    constructor(props) {
        super(props);
        this.SolicitarContratacion = this.SolicitarContratacion.bind(this);
    }

    SolicitarContratacion() {
        this.props.SolicitarContratacion();
    }


    render() {
        return (
            <section className="section jubilacion">
                <h2 className="section-title">Resumen de la solicitud</h2>
                <div className="card">
                    <div className="card-body">
                        <h3>Solicitud de contratación Plan Ahorro 5</h3>
                        {this.props.datosSimulacion.ApExtraordinaria > 0 &&
                            <>
                                <p className="parrafo3Popup">* Aportación extraordinaria:</p>
                                <div className="recResaltado">
                                    <label>Importe:</label><label>{Importe(this.props.datosSimulacion.ApExtraordinaria)}</label>
                                    <label>Fecha:</label><label> {this.props.datosSimulacion.FechaApExtraordinaria.format('DD [de] MMMM [de] YYYY')}</label>
                                </div>
                            </>
                        }

                        {this.props.datosSimulacion.ApPeriodica > 0 &&
                            <>
                                <p className="parrafo3Popup">* Aportación periódica:</p>
                                <div className="recResaltado">
                                    <div>
                                        <label>Importe:</label><label>{Importe(this.props.datosSimulacion.ApPeriodica)}</label>
                                        <label>Periodicidad:</label><label>{Periodicidad(this.props.datosSimulacion.Periodicidad)}</label>
                                    </div>
                                    <div>
                                        <label>Crecimiento:</label><label>{this.props.datosSimulacion.Crecimiento} %</label>
                                        <label>Fecha:</label><label> {this.props.datosSimulacion.FechaAper.format('DD [de] MMMM [de] YYYY')}</label>
                                    </div>
                                </div>
                            </>
                        }

                        {this.props.ImporteRentaDependencia > 0 &&
                            <>
                                <p className="parrafo3Popup">* Dependencia:</p>
                                <div className="recResaltado">
                                    <label>Edad de vencimiento:</label><label>{this.props.EdadVencimiento}</label>
                                    <label>Importe:</label><label>{Importe(this.props.ImporteRentaDependencia)}</label>
                                </div>
                            </>
                        }

                        <p className="parrafo3Popup">* Cuenta corriente: <span className="etiquetas1Popup">{this.props.datosSimulacion.CCC}</span></p>
                        {!this.props.isSaved &&
                            <div id="footerStep">
                                <button className="btn-danger" disabled={this.props.isSaving} onClick={this.props.previousStep}><span>Volver</span></button>
                                <button className="btn-success float-right" disabled={this.props.isSaving} onClick={this.SolicitarContratacion.bind(this)}><span>Solicitar contratación</span></button>
                            </div>
                        }
                        {this.props.isSaving &&
                            <div className="cajaCargando"><span>Guardando solicitud... <img src="/Content/img/hLoader.gif" /></span></div>
                        }
                        {this.props.showMessage &&
                            <div className="MensajeSolicitud"><p>{this.props.MensajeSolicitud}</p></div>
                        }
                    </div>
                </div>
            </section>
        );
    }
}