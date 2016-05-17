

var interprete = function(){

    return {
        interpretar: function(data, estado){
            var option = "";

            if (estado.ignoreIntent) {
                option = estado.lastState;
            } else option = data.outcomes["0"].intent;

            var opcion
            switch (option){

                case "saludo":
                    estado.lastState = "saludo";
                    return "¡Hola! ¿En qué puedo ayudarte?";
                     break;

                case "queDiaEs":
                    estado.lastState = "queDiaEs";
                    // entity = data.outcomes["0"].entities || 0;
                    // console.log(typeof data.outcomes["0"].entities.datetime);
                    if (typeof data.outcomes["0"].entities.datetime == 'undefined') {
                        var dia = "Hoy, mañana, o ayer?";
                        estado.ignoreIntent=true;
                        estado.conversationLevel=1;

                    } else var dia = entity.datetime["0"].value;
                    return dia;
                    break;

                case "cuentaIncidencias":
                    estado.lastState = "cuentaIncidencias";
                    if (typeof data.outcomes["0"].entities.datetime == 'undefined') {
                        estado.ignoreIntent=true;
                        estado.conversationLevel=1;

                    } else var res = entity.datetime["0"].value;
                    return dia;
                    break;

                default:
                    return "Lo siento, no puedo ayudarte :(";
            }
        }
    }
}

module.exports = interprete;