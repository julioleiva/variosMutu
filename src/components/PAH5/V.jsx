import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/es';

const maxDate = new Date(new Date().getFullYear(),11,31);

export default class ValoresSimulacionPAH5 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            poliza: "",
            isLoaded: false,
            error: null,
            startDate: moment()
        };
        this.changeFVEN = this.changeFVEN.bind(this);
        this.onEndAEPU = this.onEndAEPU.bind(this);
        this.onEndAP = this.onEndAP.bind(this);
        this.changeFAPE = this.changeFAPE.bind(this);
        this.changeFAPER = this.changeFAPER.bind(this);
        this.selectPeriodicidad = this.selectPeriodicidad.bind(this);
        this.selectCrecimiento = this.selectCrecimiento.bind(this);
        this.CambiarAportacionPorPeriodicidad = this.CambiarAportacionPorPeriodicidad.bind(this);
    }

    //------------------------------------
    changeFVEN(date) {
        this.props.changeFVEN(date);
    }

    //------------------------------------
    onEndAEPU(event) {
        this.props.onEndAEPU(Number.parseFloat(event.target.value).toFixed(2), event);
    }

    //------------------------------------
    onEndAP(event) {
        this.props.onEndAP(Number.parseFloat(event.target.value).toFixed(2), event);
    }

    //------------------------------------
    selectPeriodicidad(event){
        this.props.selectPeriodicidad(Math.round(event.target.value));
        this.CambiarAportacionPorPeriodicidad(event.target.value)
    }

    //------------------------------------
    selectCrecimiento(event){
    this.props.selectCrecimiento(Math.round(event.target.value));
    }

    //------------------------------------
    changeFAPE(date) {
        this.props.changeFAPE(date);
    }

    //------------------------------------
    changeFAPER(date) {
    this.props.changeFAPER(date);
    }
 
    //------------------------------------
    CambiarPeriodicidadPorAportacion(aport)
    {
        switch(true) {                        
            case aport > 2499 :
                this.props.selectPeriodicidad(1); 
                break;
            case aport > 1249 :
                this.props.selectPeriodicidad(2);
                break;
            case aport > 416 :
                this.props.selectPeriodicidad(4);
                break;
            case aport > 0 :
                this.props.selectPeriodicidad(12);
                break;
        }
    }

    //------------------------------------
    CambiarAportacionPorPeriodicidad(per)
    {
        switch(true)
        {
            case (per == 12 && this.props.datosSimulacion.ApPeriodica > 416) :
                this.props.onEndAP(416);
                break;
            case (per == 4 && this.props.datosSimulacion.ApPeriodica > 1249) :
                this.props.onEndAP(1250);
                break;
            case (per == 2 && this.props.datosSimulacion.ApPeriodica > 2499) :
                this.props.onEndAP(2500);
                break;
        }
    }

    render() {
        return (
            <div className="col-md-6 col-sm-12 slider-window">
                <div>
                  <p className="noUiSlider-title">Fecha de vencimiento</p>
                  <div>
                    <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        placeholder={`${formatDate(new Date(this.props.datosSimulacion.FVencimiento), 'L', 'es')}`}
                        value={new Date(this.props.datosSimulacion.FVencimiento)}
                        onDayChange={this.changeFVEN}
                        dayPickerProps={{
                            locale: 'es',
                            localeUtils: MomentLocaleUtils,
                            month: new Date(this.props.datosSimulacion.FVencimiento),
                            fromMonth: new Date(this.props.datosSimulacion.FVencimiento),
                        }}
                      />
                    </div>
                    <div>
                      <p className="noUiSlider-title">Aportación extraordinaria de pago único (AEPU)</p>
                      <input
                        type="number"
                        className={this.props.ClaseErrorExtr}
                        title="Importe máximo: 5000€"
                        id="rate1"
                        min="0"
                        step="0.01"
                        max="5000"
                        onChange={this.onEndAEPU}
                      />
                    </div>
                </div>

            {this.props.MostraFechaExtraordinaria ?
            <div>
                <label>Fecha Aportación extraordinaria</label>
                <DayPickerInput                    
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(new Date(this.props.datosSimulacion.FechaApExtraordinaria), 'L', 'es')}`}
                    value={new Date(this.props.datosSimulacion.FechaApExtraordinaria)}
                    onDayChange={this.changeFAPE}
                    dayPickerProps={{
                        locale: 'es',
                        localeUtils: MomentLocaleUtils,
                        month: new Date(moment()),
                        fromMonth: new Date(moment()),
                        toMonth: new Date(maxDate),
                    }}
                />
            </div>  
            : null }    

              <div>
                <p className="noUiSlider-title">Aportación periódica (AP)</p>
                <div className="noUiSlider-wrapper">
                <input
                    type="number"
                    className={this.props.ClaseErrorAport}
                    title="Importe máximo: 5000€"
                    id="rate1"
                    min="0"
                    step="0.01"
                    max="5000"
                    onChange={this.onEndAP}
                    />
                </div>
              </div>

             <div className="dropdown-selection col-md-6 col-sm-12">
                <label htmlFor="select-dropdown">Periocidad</label>
                <div className="select-wrapper">
                    <select className="select-dropdown" value={this.props.datosSimulacion.Periodicidad} onChange={this.selectPeriodicidad}>
                        <option value="12">Mensual</option>
                        <option value="4">Trimestral</option>
                        <option value="2">Semestral</option>
                        <option value="1">Anual</option>
                    </select>
                </div>
         

             <div className="dropdown-selection col-md-6 col-sm-12">
                <label htmlFor="select-dropdown">Crec.anual acumulativo</label>
                <div className="select-wrapper">
                    <select className="select-dropdown" 
                        value={this.props.datosSimulacion.Crecimiento}
                        onChange={this.selectCrecimiento}>
                        <option value="0">0%</option>
                        <option value="1">1%</option>
                        <option value="2">2%</option>
                        <option value="3">3%</option>
                        <option value="4">4%</option>
                        <option value="5">5%</option>
                    </select>
                </div>
            </div>

             <div>
                <label>Fecha inicio Aportación periódica</label>
                <DayPickerInput formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(
                        new Date(this.props.datosSimulacion.FechaAper),
                        "L",
                        "es"
                    )}`}
                    value={new Date(this.props.datosSimulacion.FechaAper)}
                    inputProps={{
                        disabled:
                            this.props.datosSimulacion.ApPeriodica == 0 ||
                            this.props.datosSimulacion.ApPeriodica == ""
                    }}
                    onDayChange={this.changeFAPER}
                    dayPickerProps={{
                        locale: "es",
                        localeUtils: MomentLocaleUtils,
                        month: new Date(this.props.datosSimulacion.FechaAper),
                        fromMonth: new Date(this.props.datosSimulacion.FechaAper),
                        toMonth: new Date(maxDatePer)
                    }}
                    />
                </div>
            </div>
         </div>
        );
    }
}
