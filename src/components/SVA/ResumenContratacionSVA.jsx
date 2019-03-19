export default class ResumenContratacionSVA extends React.Component {
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
                        <h3>Solicitud de contratación Ahorro Flexible</h3>
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

                        {this.props.ImporteFallecimiento > 0 &&
                            <>
                                <p className="parrafo3Popup">* Capital Adicional de Fallecimiento:</p>
                                <div className="recResaltado">
                                    <label>Importe:</label><label>{Importe(this.props.ImporteFallecimiento)}</label>
                                </div>
                            </>
                        }

                        {this.props.ImporteRentaIP > 0 || this.props.ImporteCapitalIP > 0
                            ? <><p className="parrafo3Popup">* Incapacidad Permanente:</p>
                                <div className="recResaltado">
                                    <label>Importe Renta:</label><label>{Importe(this.props.ImporteRentaIP)}</label>
                                    <label>Importe Capital:</label><label>{Importe(this.props.ImporteCapitalIP)}</label></div></>
                            : <label></label>
                        }

                        {this.props.CuotaNuevaITP > 0 &&
                            <p className="parrafo3Popup">* Incapacidad Temporal Profesional:</p>
                        }
                        {this.props.Chk30 &&
                            <label className="parrafo2Popup">Cobertura básica 30 euros/día</label>
                        }
                        {this.props.Chk60 &&
                            <label className="parrafo2Popup">Cobertura básica 60 euros/día</label>
                        }
                        {this.props.Chk90 &&
                            <label className="parrafo2Popup">Cobertura básica 90 euros/día</label>
                        }
                        {this.props.Hospitalizacion == true || this.props.Intervenciones == true
                            || this.props.Incapacidad == true
                            ?
                            <label className="parrafo2Popup">Garantías adicionales</label>
                            : <label></label>
                        }
                        {this.props.Hospitalizacion &&
                            <label className="parrafo4Popup"> Hospitalización por enfermedad o accidente</label>
                        }
                        {this.props.Intervenciones &&
                            <label className="parrafo4Popup"> Intervenciones quirúrgicas y tratamientos</label>
                        }
                        {this.props.Incapacidad &&
                            <label className="parrafo4Popup"> Incapacidad temporal parcial</label>
                        }

                        {this.props.PeriodoCarencia &&
                            <>
                                <label className="parrafo2Popup"> Eliminar periodo de carencia</label>
                                <label className="parrafo4Popup">Fecha efecto seguro origen: <strong>{this.props.FechaEfectoSeguroOrigen.format('DD [de] MMMM [de] YYYY')}</strong> </label>
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