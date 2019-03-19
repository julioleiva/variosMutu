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
      test: "",
      openModal: false,
      cargandoInforme: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    //Llamada al metodo de gestion de api

    let padre = this;
    $.getScript("/Scripts/JS/GestionDocumentos.jsx", function() {
      CargarInformesTrimestrales(padre);
    });
  }

  loader() {
    debugger;
    this.setState({ informeCargado: !this.state.informeCargado });
  }

  obtenerInforme(sistema, cabecera, nombre) {
    debugger
    var padre = this;
    $.getScript("/Scripts/JS/GestionDocumentos.jsx", function() {
      ObtenerInfome(padre, sistema, cabecera, nombre);
    });
  }

  showModal() {
    this.setState({ openModal: true });
  }

  hideModal() {
    this.setState({ openModal: false });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <section className="section section-father no-title accordion datos-personales-section">
          <div
            className="card-group horizontal accordion-group"
            id="accordion"
            role="tablist"
            aria-multiselectable="true"
          >
            {this.state.cargandoInforme ?
            <ModalSimple
              openModal={this.state.openModal}
              closeModal={this.hideModal.bind(this)}
              informeCargado={this.state.informeCargado}
            /> : null
            
            }

            {this.state.Informes.map((value, index) => {
              return (
                <Trimestre
                  key={"it" + index}
                  Trimestre={value.key}
                  heading={"heading" + index}
                  id={"collapse" + index}
                  Informes={value.Informes}
                  loader={this.loader.bind(this)}
                  obtenerInforme={this.obtenerInforme.bind(this)}
                />
              );
            })}
          </div>
          {!this.state.informeCargado ? (
            <div className="cajaCargando">
              <span>
                Descargando Informe..{" "}
                <img
                  src="/Content/img/hLoader.gif"
                  style={{ height: "35px" }}
                />
              </span>
            </div>
          ) : (
            <div />
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
    //this.props.loader();
    //var padre = this;
    //$.getScript("/Scripts/JS/GestionDocumentos.js", function () {
    //    ObtenerInfome(padre,sistema, cabecera, nombre);
    //});
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

class ModalSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.openModal,
      closeModal: this.props.hideModal,
      informeCargado: this.props.informeCargado
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.props.showModal();
  }

  hideModal() {
    this.props.hideModal();
  }

  /* const showHideClassName = show
         ? "modalSimple display-block"
         : "modalSimple display-none"; */

  /* <div className={showHideClassName}> */

  render() {
    console.log("Open Modal:", this.props.openModal);
    console.log("Close Modal:", this.props.closeModal);
    console.log("Informe Cargado: ", this.props.informeCargado);

    return ((
      <div>
        <section>
          <h1>Modal</h1>
          <p>Descargando informe...</p>
        </section>
      </div>
    ): null);
  }
}
