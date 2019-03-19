export default class ResumenContratacionRVR extends React.Component {
    constructor(props) {
        super(props);
        this.solicitarContratacion = this.solicitarContratacion.bind(this);
    }

    solicitarContratacion() {
        this.props.solicitarContratacion();
    }


    render() {
        return (
            <section className="section jubilacion">
                <h2 className="section-title">Resumen de la solicitud</h2>
                <div className="card">
                    <div className="card-body">
                        <h3>Solicitud de contratación Renta Variable</h3>

                        <p className="parrafo3Popup">* Aportación extraordinaria:</p>
                        <div className="recResaltado">
                            <label>Importe:</label><label></label>
                            <label>Fecha:</label><label> </label>
                        </div>



                        <p className="parrafo3Popup">* Aportación periódica:</p>
                        <div className="recResaltado">
                            <div>
                                <label>Importe:</label><label></label>
                                <label>Periodicidad:</label><label></label>
                            </div>
                            <div>
                                <label>Crecimiento:</label><label></label>
                                <label>Fecha:</label><label> </label>
                            </div>
                        </div>



                        <p className="parrafo3Popup">* Cuenta corriente: <span className="etiquetas1Popup"></span></p>

                        <div id="footerStep">
                            <button className="btn-danger" disabled=""><span>Volver</span></button>
                            <button className="btn-success float-right" disabled=""><span>Solicitar contratación</span></button>
                        </div>


                        <div className="cajaCargando"><span>Guardando solicitud... <img src="/Content/img/hLoader.gif" /></span></div>

                        <div className="MensajeSolicitud"><p></p></div>

                    </div>
                </div>
            </section>
        );
    }
}