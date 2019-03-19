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
            {this.state.cargandoInforme ? (
              <ModalSimple/>
            ) : null }

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