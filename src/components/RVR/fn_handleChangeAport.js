handleChangeAport(value, event) {
    if (event.currentTarget.value == "") {
        this.setState({
            Aportacion: 0,
            ClaseErrorExtr: ""
        }),
            this.CargamosCuota();
    } else if (value >= 0 && value <= maxAport && value >= minAport && !isNaN(value)) {
        this.setState({
            Aportacion: value,
            ClaseErrorExtr: ""
        }),
            this.CargamosCuota();
    }    
        else {
        this.setState({
            Aportacion: 0,
            ClaseErrorExtr: "errorRango"
        });
    }
}