import moment from "moment";
import "moment/locale/es";

const minAport = 10000;
const maxAport = 250000000;

export default class ValoresContratacionRVR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FechaInicio: moment(this.props.FechaInicio).format("DD/MM/YYYY")
        }
        this.ChangeAportacionInput = this.ChangeAportacionInput.bind(this);
        this.ChangeModalidad = this.ChangeModalidad.bind(this);
    }

    //Input de aportación
    ChangeAportacionInput(event) {
        this.props.ChangeAportacionInput(Number.parseFloat(event.target.value).toFixed(2), event)
    }

    //DDL de Modaliidad
    ChangeModalidad(event) {
        this.props.ChangeModalidad(event.target.value);
    }

    ValoresPorDefecto(e) {
        this.props.ValoresPorDefecto(event.target.value)
    }

    render() {
        return (
            <div>
                <div className="dropdown-selection col-lg-12 col-sm-12">
                    <label htmlFor="select-dropdown">Modalidad</label>
                    <div className="select-wrapper">
                        <select
                            className="select-dropdown"
                            onChange={this.ChangeModalidad}
                        >
                            {this.props.Modalidad.map((value, index) => {
                                return (
                                    <option key={index} value={value.Id}>
                                        {value.value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="dropdown-selection col-lg-6 col-sm-12">
                    <label htmlFor="select-dropdown">Aportación Periódica</label>
                    <input
                        type="number"
                        id="rate2"
                        className={this.props.ClaseErrorExtr}
                        max={maxAport}
                        min={minAport}
                        placeholder={minAport}
                        step="0,01"
                        onChange={this.ChangeAportacionInput}
                    />
                </div>

                <div className="dropdown-selection col-lg-6 col-sm-12">
                    <label htmlFor="select-dropdown">Fecha de efecto de la solicitud</label>
                    <p className="cuadroGris">{this.state.FechaInicio}</p>
                </div>
            </div>
        );
    }
}
