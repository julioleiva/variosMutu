<div>
    <div className="dropdown-selection col-md-6 col-sm-12">
        <label htmlFor="select-dropdown">Modalidad</label>
        <div className="select-wrapper">
            <select
                className="select-dropdown"
                defaultValue={this.props.Modalidad[0].value}
                onChange={this.ChangeModalidad}
            >
                {this.props.Modalidad.map((value, index) => {
                  
                }).filter((value, index)=> {
                    return (
                        <option key={index} value={value.Id}>
                            {value.value}
                        </option>
                    );
                })}
            </select>
        </div>
    </div>
    </div>
