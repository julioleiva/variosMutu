const MsgErrorIndiceRentas = "No se ha podido obtener índice de Renta. Inténtalo de nuevo.";
const MsgTituloSolicitud = "Solicitud";
const MsgTituloNoPuedeSimular = "No puede simular";
const EnumIdFormaCargoPagoUnico = 9;
const MsgErrorEdadVencimientoActual = "Edad vencimiento debe ser mayor que la Edad actual";
const MsgSinInformacionConsulta = "Sin información relativa a la consulta";
const MsgErrorCargarDatos = "Ocurrió un error al cargar los datos.";
const MsgBeneficiarios = "Beneficiarios";
const MsgPrestaciones = "Prestaciones";
const MsgSeleccionaPoliza = "Selecciona póliza";
const MsgDomiciliosNoPrincipal = "Debes señalar, o añadir, un domicilio postal como Principal.";
const MsgDatosPersonales = "Datos Personales";

function Importe(value) {

    if (isNaN(value)) {
        return value
    };

    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function ImporteSinDec(value) {

    if (isNaN(value)) {
        value = 0
    };

    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(value);
}

function QuitarTextoAportaciones(value) {

    if (value.includes("PLAN UNIVERSAL DE LA ABOGACÍA")) {
        return value.replace("PLAN UNIVERSAL DE LA ABOGACÍA (", "").replace(")", "");
    }
    else {
        return value;
    }
}

function ProductoPorCod(cod) {
    switch (cod.toUpperCase()) {
        case "PAH5":
            return "Plan Ahorro 5";
            break;
        case "SAF":
            return "Ahorro Sistemático";
            break;
        case "PSPT":
            return "Previsión Profesional";
            break;
        case "SAF1":
            return "Ahorro Flexible";
            break;
        case "PPA1":
            return "Prev. Personal. Aportante.";
            break;
        case "PPA":
            return "Previsión Personal";
            break;
        case "PSPP":
            return "Previsión Profesional";
            break;
        case "ACCU":
            return "Accidentes Universal";
            break;
        case "PUJ":
            return "Plan Junior";
            break;
        case "PUJA":
            return "Plan Junior Ahorro";
            break;
        case "PUJR":
            return "Plan Junior Riesgo";
            break;
        case "SAL":
            return "Plus Salud";
            break;
        case "RVR":
            return "Renta Vitalicia Remunerada";
            break;
        default:
            return cod;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function Redirigir(ruta) {
    window.location.href = ruta;
}

function Fecha(value) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }

    if (isDate(value)) {
        return new Date(value).toLocaleDateString("es-ES", options);
    }
    else
        return "";
}

function isDate(value) {
    switch (typeof value) {
        case 'number':
            return true;
        case 'string':
            return !isNaN(Date.parse(value));
        case 'object':
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
        default:
            return false;
    }
}

function Periodicidad(value) {
    switch (value.toString().trim()) {

        case "12":
            return "Mensual";
        case "1":
            return "Anual";
        case "4":
            return "Trimestral";
        case "2":
            return "Semestral";
        case "6":
            return "Cargo de forma única";
        default:
            return value;
    }
}


function PeriodicidadMes(value) {

    switch (value.toString().trim()) {


        case "ANUAL":
            return "1";
        case "TRIMESTRAL":
            return "4";
        case "SEMESTRAL":
            return "2";
        case "MENSUAL":
            return "12";
        default:
            return value;
    }
}

function MultiplicarPeriocidad(Importe, value) {

    switch (value.toString().trim()) {

        case "12":
            return (Importe * 1);
        case "1":
            return (Importe * 12);
        case "4":
            return (Importe * 3);
        case "2":
            return (Importe * 6);
        case "6":
            return (Importe);
        default:
            return Importe;
    }
}


function DividirPeriocidad(Importe, value) {

    switch (value.toString().trim()) {

        case "12":
            return (Importe / 12);
        case "1":
            return (Importe / 1);
        case "4":
            return (Importe / 4);
        case "2":
            return (Importe / 2);
        default:
            return Importe;
    }
}


function CalcularEdad(fecha) {

    var hoy = new Date();
    var cumpleanos = ParseDate(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

function dateToDMY(date) {
    var fecha = new Date(date);
    var d = fecha.getDate();
    var m = fecha.getMonth();
    var y = fecha.getFullYear();
    return d + "-" + m + "-" + y;
}
function dateToDMYInclinada(date) {
    var fecha = new Date(date);
    var d = fecha.getDate();
    var m = fecha.getMonth();
    var y = fecha.getFullYear();
    return d + "/" + m + "/" + y;
}
function dateToYMDInclinada(date) {
    var dateParts = date.split("/");
    var fecha = new Date(+dateParts[2], dateParts[1], +dateParts[0]);
    var d = fecha.getDate();
    var m = fecha.getMonth();
    var y = fecha.getFullYear();
    return y + "-" + m + "-" + d;
}

function SumarFechaEdad(date, edad) {

    var fecha = new Date(date);
    var d = fecha.getDate();
    var m = fecha.getMonth();
    var y = fecha.getFullYear() + edad;
    return d + "-" + m + "-" + y;
}

function SumarFechaEdadConMesSiguiente(date, edad) {

    var fecha = new Date(date);
    var d = 1;
    var m = fecha.getMonth() + 1;
    var y = fecha.getFullYear() + edad;
    return y + "-" + m + "-" + "01";
}


function UnoMesSiguiente(date) {

    var fecha = new Date(date);
    var m = fecha.getMonth() + 2;
    var y = fecha.getFullYear();
    if (m == 13) {
        m = '01';
        y = fecha.getFullYear() + 1;
    }
    return "01" + "-" + m + "-" + y;
}

function UnoMesSiguienteFormatoInclinado(date) {

    var fecha = new Date(date);
    var m = fecha.getMonth() + 2;
    var y = fecha.getFullYear();
    if (m == 13) {
        m = '01';
        y = fecha.getFullYear() + 1;
    }
    return y + "-" + m + "-" + "01";
}

function UnoMesSiguienteFormatoNormal() {
    return (moment().set({ 'year': moment().add(1, 'month').year(), 'month': moment().add(1, 'month').month(), 'date': 1 }));
}

function UnoMesSiguienteFormatoIngles(date) {

    var fecha = new Date(date);
    var m = fecha.getMonth() + 2;
    var y = fecha.getFullYear();

    if (m == 13) {
        m = '01';
        y = fecha.getFullYear() + 1;
    }
    return m + "-" + "01" + "-" + y;
}


function ParseDate(dateString) {

    dateParts = dateString.split("/");

    if (dateParts.length != 3)

        return undefined;

    else {

        var ReturnDate = new Date(dateParts[2], dateParts[1], dateParts[0]);

        return ReturnDate;
    }
}

function ConvertPeriodicidad(per) {


    switch (per) {
        case 1:
            return 12;
        case 4:
            return 3;
        case 2:
            return 6;
        case 12:
            return 1;
        default:
            return per;
    }
}

function FindArray(array, value) {
    let encontrado = false;
    //array.map(val => {
    //    if (val == value) { encontrado = true;}
    //});

    array.map(function (val) { if (val == value) { encontrado = true; } });
    return encontrado;
}

function RedondearStep(value, exp) {

    let minus = parseInt(value.toString().substring(value.toString().length - 4));
    if (exp < minus) { exp = exp * 2 }
    minus = (exp - minus);
    if (minus < exp) { return parseInt(value + minus); }
    else { return value; }
}


function ValidarNifNie(value) {

    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();
    var primeraletra = str.substr(0, 1);

    //Existen DNIs válidos, que empiezan por K, L o M. Estás letras, se tienen que sustituir por un '0'
    if (primeraletra === 'K' || primeraletra === 'L' || primeraletra === 'M') {
        str = str
            .replace(/^[K]/, '0')
            .replace(/^[L]/, '0')
            .replace(/^[M]/, '0');
    }

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
}


function stringToDate(_date, _format, _delimiter) {

    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = dateItems[2] + "-" + dateItems[1] + "-" + dateItems[0];
    //var formatedDate = dateItems[0] + "/" + dateItems[1] + "/" + dateItems[2];
    return formatedDate;
}

function stringFormatFecha(_date) {

    var dateItems = _date.split("/");
    var formatedDate = dateItems[2] + "-" + dateItems[1] + "-" + dateItems[0];
    return formatedDate.toString();
}

function CargarFormaDePago() {
    let Pago = [];
    Pago.push({ Id: 12, value: 'Mensual' });
    Pago.push({ Id: 4, value: 'Trimestral' });
    Pago.push({ Id: 2, value: 'Semestral' });
    Pago.push({ Id: 1, value: 'Anual' });
    return Pago;
}

function CargarCargoFormaDePago() {
    let Pago = [];
    Pago.push({ Id: 1, value: 'A mi cuenta corriente' });
    Pago.push({ Id: 2, value: 'A mi saldo acumulado' });
    return Pago;
}

function ValidarNif(dni) {
    var numero
    var letr
    var letra
    var expresion_regular_dni
    var primeraletra = dni.substr(0, 1);

    //Existen DNIs válidos, que empiezan por K, L o M. Estás letras, se tienen que sustituir por un '0'
    if (primeraletra === 'K' || primeraletra === 'L' || primeraletra === 'M') {
        dni = dni
            .replace(/^[K]/, '0')
            .replace(/^[L]/, '0')
            .replace(/^[M]/, '0');
    }
    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if (expresion_regular_dni.test(dni) == true) {
        numero = dni.substr(0, dni.length - 1);
        letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr.toUpperCase()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getScript(location, callback) {

    var fileRef = document.createElement('script');
    fileRef.setAttribute('type', 'text/javascript');

    if (callback) {
        if (Modernizr.smil == false) {  // IE
            fileRef.onreadystatechange = function () {
                if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
                    fileRef.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Non-IE
            fileRef.onload = function () {
                callback();
            };
        }
    }

    fileRef.setAttribute('src', location);
    document.head.appendChild(fileRef);
};


function compruebaCCC(entidad, sucursal, dc, nCuenta) {
    entidad = rellenaCeros(entidad, 4);
    sucursal = rellenaCeros(sucursal, 4);
    dc = rellenaCeros(dc, 2);
    nCuenta = rellenaCeros(nCuenta, 10);

    var concatenado = entidad + sucursal;
    var dc1 = calculaDCParcial(concatenado);
    var dc2 = calculaDCParcial(nCuenta);
    return (dc == (dc1 + dc2));
}

function calculaDCParcial(cadena) {
    var dcParcial = 0;
    var tablaPesos = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var suma = 0;
    var i;
    for (i = 0; i < cadena.length; i++) {
        suma = suma + cadena.charAt(cadena.length - 1 - i) * tablaPesos[i];
    }
    dcParcial = (11 - (suma % 11));
    if (dcParcial == 11)
        dcParcial = 0;
    else if (dcParcial == 10)
        dcParcial = 1;
    return dcParcial.toString();
}

function rellenaCeros(numero, longitud) {
    var ceros = '';
    var i;
    numero = numero.toString();
    for (i = 0; (longitud - numero.length) > i; i++) {
        ceros += '0';
    }
    return ceros + numero;
}

/**
 * Funcion para verificar si una cuenta IBAN es correcta
 * @param string iban
 * @return boolean
 */
function checkIBAN(iban) {
    if (iban.length == 24) {
        var digitoControl = getCodigoControl_IBAN(iban.substr(0, 2).toUpperCase(), iban.substr(4));
        if (digitoControl == iban.substr(2, 2))
            return true;
    }
    return false;
}

/**
 * Funcion que devuelve el codigo de verificacion de una cuenta bancaria
 * @param string codigoPais los dos primeros caracteres del IBAN
 * @param string cc la cuenta corriente, que son los ultimos 20 caracteres del IBAN
 * @return string devuelve el codigo de control
 */
function getCodigoControl_IBAN(codigoPais, cc) {
    // cada letra de pais tiene un valor
    valoresPaises = {
        'A': '10',
        'B': '11',
        'C': '12',
        'D': '13',
        'E': '14',
        'F': '15',
        'G': '16',
        'H': '17',
        'I': '18',
        'J': '19',
        'K': '20',
        'L': '21',
        'M': '22',
        'N': '23',
        'O': '24',
        'P': '25',
        'Q': '26',
        'R': '27',
        'S': '28',
        'T': '29',
        'U': '30',
        'V': '31',
        'W': '32',
        'X': '33',
        'Y': '34',
        'Z': '35'
    };

    // reemplazamos cada letra por su valor numerico y ponemos los valores mas dos ceros al final de la cuenta
    var dividendo = cc + valoresPaises[codigoPais.substr(0, 1)] + valoresPaises[codigoPais.substr(1, 1)] + '00';

    // Calculamos el modulo 97 sobre el valor numerico y lo restamos al valor 98
    var digitoControl = 98 - modulo(dividendo, 97);

    // Si el digito de control es un solo numero, añadimos un cero al delante
    if (digitoControl.length == 1) {
        digitoControl = '0' + digitoControl;
    }
    return digitoControl;
}

/**
 * Funcion para calcular el modulo
 * @param string valor
 * @param integer divisor
 * @return integer
 */
function modulo(valor, divisor) {
    var resto = 0;
    var dividendo = 0;
    for (var i = 0; i < valor.length; i += 10) {
        dividendo = resto + "" + valor.substr(i, 10);
        resto = dividendo % divisor;
    }
    return resto;
}

/**
 * Funcion devuelve el valor 'Key' correspondiente al 'Value' de la Renta de seguros Accidentes Universales, Incapacidad Permanente y Dependencia.
 * El número contenido en 'Value', viene con el punto de miles, para que se pueda mostrar en un combo.
 * @param string valorRenta
 * @param Lista(string, string) tablaRenta
 * @return string
 */
function GetIndiceRenta(valorRenta, tablaRenta) {
    let indRenta = "";
    if (tablaRenta != null) {
        for (var i = 0; i < tablaRenta.length; i++) {
            var auxValor = parseInt(tablaRenta[i].Value.replace('.', ''));
            if (auxValor == valorRenta) {
                indRenta = tablaRenta[i].Key;
                break;
            }
        }
    }
    return indRenta;
}

function GetAccion(codProd) {
    let idAccion;
    switch (codProd) {
        case "PSPP":
        case "PSPT":
            idAccion = 1;
            break;
        case "PPA":
            idAccion = 2;
            break;
        case "SAF":
            idAccion = 3;
            break;
        case "SAF1":
            idAccion = 4;
            break;
    }
    return idAccion;
}

function OcultarBanner() {
    let banner = document.getElementById('bannerSuperior');
    banner.setAttribute("class", "bannerSuperior container-fluid hidden");
    let publicidad = document.getElementById('publicidad');
    publicidad.setAttribute("class", "publicity");
    document.getElementById('home-content').setAttribute("class", "home-content");
    document.getElementById('navbarNavDropdown').classList.remove("alturaBanner");
    sessionStorage.setItem("banner", false);
}

function MostrarBanner() {
    if (!sessionStorage.getItem('banner')) {
        let banner = document.getElementById('bannerSuperior');
        banner.setAttribute("class", "bannerSuperior container-fluid");
        let publicidad = document.getElementById('publicidad');
        publicidad.setAttribute("class", "publicity hidden");
        document.getElementById('home-content').setAttribute("class", "home-content conBanner");
        document.getElementById('navbarNavDropdown').classList.add("alturaBanner");
    }
}

// It gets browser name and version to show warning message of the application compatibility 
function getBrowser() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|edge|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }

    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    // return M.join(' ');
    return {
        name: M[0],
        version: M[1]
    }
}

// It shows warning message if the browser is not compatible
function msgBrowser() {
    var browser = getBrowser(),

        divInfo = document.getElementById("browserCaution"),
        warnMsg = 'Navegador no soportado. Aplicación optimizada para las últimas versiones de Google Chrome y Mozilla Firefox, Internet Explorer 11 y Edge 17';

    // Browsers conditions  
    var chromeUnder60 = browser.name === "Chrome" && browser.version < 60,
        iExplorerUnder11 = browser.name === "IE" && browser.version === "10" || browser.version === "9" || browser.version === "8" || browser.version === "7" || browser.version === "6",
        iExplorer11 = browser === "IE 11",
        firefox = browser.name === "Firefox",
        edge = browser === "Edge 17";

    // check browser to show warning   
    if (iExplorerUnder11 || chromeUnder60) {
        divInfo.innerHTML = warnMsg
        divInfo.classList.add("MensajeError");
    }
}

function GetLimitePorProducto(descProducto) {
    switch (descProducto) {
        case "Previsión Profesional":
            return 8000;
            break;
        case "Previsión Personal":
            return 8000;
            break;
        case "Ahorro Sistemático":
            return 8000;
            break;
        case "Ahorro Flexible":
            return 50000;
            break;
    }
}