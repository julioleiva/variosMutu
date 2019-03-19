export default class ResumenContratacionRP65 extends React.Component {
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
                        <h3>Solicitud de contratación Renta Patriimonio 65</h3>

                        <p className="parrafo3Popup">* Aportación extraordinaria de pago único:</p>
                            <div className="recResaltado">
                            <label>Importe: </label>{this.props.Aportacion} €<label></label>
                        </div>

                         <p className="parrafo3Popup">* Cuenta Corriente Cuota Mensual : <span className="etiquetas1Popup">{this.props.CCC}</span></p>
                         <p className="parrafo3Popup">* Cuenta Corriente Cobro Prestación: <span className="etiquetas1Popup">{this.props.CCCPrestacion}</span></p>

                        <div id="footerStep">
                            <button 
                                className="btn-danger" 
                                disabled=""
                                onClick={this.props.previousStep}
                                    >
                                    <span>Volver</span>
                                </button>
                            <button 
                                className="btn-success float-right" 
                                disabled=""
                                onClick={() => {this.SolicitarContratacion()}}    
                                    >
                                    <span>Solicitar contratación</span>
                                </button>
                        </div>
                            { this.props.isSaving ?
                                (<div className="cajaCargando">
                                    <span>Guardando solicitud... 
                                        <img src="/Content/img/hLoader.gif" />
                                    </span>
                                </div>) : null
                            }
                            { this.props.MensajeSolicitud ?
                                (<div className="MensajeSolicitud">
                                    <p>{this.props.MensajeSolicitud}</p>
                                </div>) : null
                            }

                    </div>
                </div>
            </section>
        );
    }
}