const altoImg = { height: "150px" };

class InformesTrimestrales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Trimestres: [],
            Informes: [],
            isLoaded: false,
            error: false,
            informeCargado: true,
            cargandoInforme: false
        };
    }

    componentDidMount() {
        //Llamada al metodo de gestion de api
        let padre = this;
        $.getScript("/Scripts/JS/GestionDocumentos.jsx", function () {
            CargarInformesTrimestrales(padre);
        });
    }

    obtenerInforme(sistema, cabecera, nombre) {
        var padre = this;
        $.getScript("/Scripts/JS/GestionDocumentos.jsx", function () {
            ObtenerInfome(padre, sistema, cabecera, nombre);
        });
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <section className="section section-father no-title accordion datos-personales-section">
                    {!this.state.cargandoInforme ? (
                        <div
                            className="card-group horizontal accordion-group"
                            id="accordion"
                            role="tablist"
                            aria-multiselectable="true"
                        >
                            {this.state.Informes.map((value, index) => {
                                return (
                                    <Trimestre
                                        key={"it" + index}
                                        Trimestre={value.key}
                                        heading={"heading" + index}
                                        id={"collapse" + index}
                                        Informes={value.Informes}
                                        obtenerInforme={this.obtenerInforme.bind(this)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                            <LoaderBox />
                        )}
                </section>
            );
        } else {
            return (
                <div id="lineChartGrafico" className="nvd3-linechart linechart">
                    <img src="/Content/img/loader.gif" style={altoImg} />
                </div>
            );
        }
    }
}

class Trimestre extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(sistema, cabecera, nombre, e) {
        this.props.obtenerInforme(sistema, cabecera, nombre);
    }

    render() {
        return (
            <div className="card m-b-0" id={this.props.Trimestre}>
                <div className="card-header " role="tab" id={this.props.heading}>
                    <h4 className="card-title">
                        <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href={"#" + this.props.id}
                            aria-expanded="false"
                            aria-controls={this.props.id}
                        >
                            <span className="card-title-text">{this.props.Trimestre}</span>
                        </a>
                    </h4>
                </div>
                <div
                    id={this.props.id}
                    className="collapse"
                    role="tabcard"
                    aria-labelledby={this.props.heading}
                >
                    <div className="card-body">
                        <div className="card card-transparent">
                            <div className="card-body padd70">
                                <ul>
                                    {this.props.Informes.map((value, index) => {
                                        return (
                                            <li
                                                key={value.Id_Cabecera}
                                                onClick={e =>
                                                    this.handleClick(
                                                        value.Sistema,
                                                        value.Id_Cabecera,
                                                        value.Tipo_informe + " " + this.props.Trimestre,
                                                        e
                                                    )
                                                }
                                            >
                                                <a href="#">{value.Tipo_informe}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class LoaderBox extends React.Component {
    render() {
        return (
            <div>
                <h1>Descarga de Informe</h1>
                <span>
                    Generando Informe...{" "}
                    <img src="/Content/img/hLoader.gif" style={{ height: "35px" }} />
                </span>
            </div>
        );
    }
}


function ObtenerInfome(Padre, Sistema, Cabecera, Nombre) {
    var api = cargarApiServDocumentos("GenerarPDFInformesIT");
    debugger;

    fetch(api + sessionStorage.idDato + "/" + Sistema + "/" + Cabecera, {
        headers: {
            "Content-Type": "application/pdf",
            Authorization: "Bearer " + sessionStorage.Token
        },
        responseType: "blob"
    })
        .then(response =>
            response.blob())
        .then(
            Padre.setState({
                cargandoInforme: true,
                informeCargado: false,
                openModal: true
            })
        )
        .then(
            blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = blob.FileName || "InformeTrimestral-" + $.now() + ".pdf";
                a.click();
                Padre.setState({
                    informeCargado: true,
                    cargandoInforme: false,
                    error: false,
                    openModal: false
                })
            },
            error => {
                Padre.setState({ isLoaded: true, error: error });
            }
        )
}