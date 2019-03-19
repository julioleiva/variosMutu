import moment from "moment";
import "moment/locale/es";

export default class ValoresContratacionRP65 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          FechaInicio: moment(this.props.FechaInicio).format("DD/MM/YYYY")
      }     
      this.ChangeAportacionInput = this.ChangeAportacionInput.bind(this);
  }

  //Input de aportación
  ChangeAportacionInput(event) {
    debugger;
    this.props.ChangeAportacionInput(Number(parseFloat(event.target.value).toFixed(2)), event)
  }
  
  render() {
     return (
      <div>
        <div className="dropdown-selection col-md-6 col-sm-12">
          <h3>Modalidad</h3>
          <div className="select-wrapper">
            <h4>{this.props.Modalidad[1].value}</h4>
          </div>
        </div>

        <div>
            <p className="noUiSlider-title">Aportación periódica</p>
            <div className="noUiSlider-wrapper">
            <input
              type="number"
              id="rate2"
              min="0"
              step="0.01"
              onChange={this.ChangeAportacionInput.bind(this)}
             />
             </div>
         </div>

        <div className="dropdown-selection col-md-6 col-sm-12">
            <h4>Fecha de efecto de la solicitud</h4>
            <h4>(*Primer día mes siguiente a la solicitud)</h4>
            <h5>{this.state.FechaInicio}</h5>
        </div>
      </div>
    );
  }
}
