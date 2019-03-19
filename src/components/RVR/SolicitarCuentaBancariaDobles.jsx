import AñadirCuenta from "./AñadirCuenta";

const textAlignLeft = { textAlign: "left" };

// const style1 = { height: "100%", paddingBottom: "80px" };
// const style2 = { width: "200px", bottom: "auto", border: "0px" };

export default class SolicitarCuentaBancariaDoble extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cuentas: [],
            isLoaded: false,
            error: false,
            openPop: false,
            key: 0
        };
        this.Solicitar = this.Solicitar.bind(this);
        this.handleChangeCCCCuotaMensual = this.handleChangeCCCCuotaMensual.bind(this);
        this.handleChangeCCCPrestacion = this.handleChangeCCCPrestacion.bind(this);
        this.cargarCuentas = this.cargarCuentas.bind(this);
        this.añadirCuenta = this.añadirCuenta.bind(this);
        this.ClosePopUp = this.ClosePopUp.bind(this);
    }

    componentDidMount() {
        let padre = this;
        this.cargarCuentas()
    }
    añadirCuenta() {
        this.setState({ openPop: true, key: this.state.key + 1 });
    }

    cargarCuentas() {
        let padre = this;
        $.getScript("/Scripts/JS/GestionPersonas.jsx", function () {
            CargarCuentasCCyPrestacion(padre);
        });
    }

    Solicitar() {
        this.props.onSolicitar();
    }

    handleChangeCCCCuotaMensual(event) {
        debugger;
        this.props.handleChangeCCCCuotaMensual(
            event.target.value,
            event.target.selectedOptions[0].label
        );
    }

    handleChangeCCCPrestacion(event) {
        debugger;
        this.props.handleChangeCCCPrestacion(
            event.target.value,
            event.target.selectedOptions[0].label
        );
    }

    ClosePopUp() {
        this.setState({ openPop: false });
    }

    NuevaCuenta(cuenta) {
        this.props.handleChangeCCCCuotaMensual(
            cuenta.idCuenta,
            cuenta.IBAN +
            " " +
            cuenta.CodigoEntidad +
            " " +
            cuenta.CodigoOficina +
            " " +
            cuenta.DigitoControl +
            " " +
            cuenta.CodigoCuenta
        );
        this.props.handleChangeCCCPrestacion(
            cuenta.idCuenta,
            cuenta.IBAN +
            " " +
            cuenta.CodigoEntidad +
            " " +
            cuenta.CodigoOficina +
            " " +
            cuenta.DigitoControl +
            " " +
            cuenta.CodigoCuenta
        );
        var cu = this.state.cuentas;
        cu.unshift(cuenta);
        this.setState({ cuentas: cu });
        this.ClosePopUp();
    }

    render() {
        if (this.state.isLoaded) {
            if (this.state.cuentas.length > 0) {
                return (
                    <div className="form-group-footer">
                        <div className="row">
                            <div className="col-md-9 col-sm-12">
                                <div className="dropdown-selection">
                                    <label style={textAlignLeft}>
                                        Selecciona la cuenta de pago:
                  </label>
                                    <div className="select-wrapper">
                                        <select
                                            className="select-dropdown"

                                            onChange={this.handleChangeCCCCuotaMensual.bind(this)}
                                        >
                                            <option>Seleccione una cuenta</option>
                                            {this.state.cuentas.map((value, index) => {
                                                return (
                                                    <option key={index} value={value.idCuenta}>
                                                        {value.IBAN +
                                                            " " +
                                                            value.CodigoEntidad +
                                                            " " +
                                                            value.CodigoOficina +
                                                            " " +
                                                            value.DigitoControl +
                                                            " " +
                                                            value.CodigoCuenta}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="dropdown-selection">
                                    <label style={textAlignLeft}>
                                        Selecciona la cuenta de cobro de la prestación:
                  </label>
                                    <div className="select-wrapper">
                                        <select
                                            className="select-dropdown"
                                            onChange={this.handleChangeCCCPrestacion.bind(this)}
                                        >
                                            <option>Seleccione una cuenta</option>
                                            {this.state.cuentas.map((value, index) => {
                                                return (
                                                    <option key={index} value={value.idCuenta}>
                                                        {value.IBAN +
                                                            " " +
                                                            value.CodigoEntidad +
                                                            " " +
                                                            value.CodigoOficina +
                                                            " " +
                                                            value.DigitoControl +
                                                            " " +
                                                            value.CodigoCuenta}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12" style={{ marginTop: "37px" }}>
                                <input
                                    type="button"
                                    className="btn-anadir-cuenta"
                                    onClick={this.añadirCuenta}
                                    value="Añadir Cuenta"
                                />
                            </div>
                        </div>
                        {/* 
            <div className="row">
              <div className="col-md-12 ">
                <div className="item-product-aside" style={style1}>
                  <input
                    type="button"
                    className="btn-no-product"
                    disabled={!this.props.enabled}
                    style={style2}
                    onClick={this.Solicitar}
                    value="Solicitar"
                  />
                </div>
              </div>
            </div>
            */}

                        <AñadirCuenta
                            key={this.state.key}
                            DocumentoAcreditativo={this.props.DocumentoAcreditativo}
                            NuevaCuenta={this.NuevaCuenta.bind(this)}
                            ClosePopUp={this.ClosePopUp}
                            openPop={this.state.openPop}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="form-group-footer">
                        <div className="row">
                            <div className="col-md-9 col-sm-12">
                                <div className="dropdown-selection">
                                    <label style={textAlignLeft}>
                                        Selecciona la cuenta de corbro de la prestación
                  </label>
                                    <div className="select-wrapper">
                                        <select className="select-dropdown">
                                            <option value="-1">
                                                No hay cuentas corrientes en el sistema{" "}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="dropdown-selection">
                                    <label style={textAlignLeft}>Selecciona cuenta de pago</label>
                                    <div className="select-wrapper">
                                        <select className="select-dropdown">
                                            <option value="-1">
                                                No hay cuentas corrientes en el sistema{" "}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <input
                                    type="submit"
                                    className="btn-anadir-cuenta"
                                    value="Añadir Cuenta"
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        } else return null;
    }
}
