/**
 * Created by pol on 10/05/16.
 */

const config = require('./config');

const general_channel = config.general_channel;
const testing_channel = config.testing_channel;
const random_channel = config.random_channel;

var Mensaje = function(message) {
    //
    // this.mensaje = message;

    //var self = this;

    return {
        mostrar: function() {
            console.log("\nMensaje recibido: " + message.text);
            return 1;
        },

        mostrarDeCanal: function(){
            switch (message.channel) {
                case general_channel:
                    console.log('Canal: # general ('+general_channel+')');
                    break;
                case random_channel:
                    console.log('Canal: # random ('+random_channel+'='+message.channel+')');
                    break;
                case testing_channel:
                    console.log('Canal: # testing ('+testing_channel+'='+message.channel+')');
                    break;
                default:
                    console.log('Canal: ...Supongo que privado... ('+message.channel+')');
            }

        },
/*
        mostrarRespuestaWit: function(){
            console.log("Respuesta de wit.ai: \n");
            console.log(JSON.stringify(message));
            var respuestaWit = message.outcomes;
            console.log('\n\t Intent: ' + respuestaWit["0"].intent);
            var numberOfEntities = respuestaWit["0"].entities.fromAplication.length;
            console.log('\n\t Entities: ');
                for(i = 0;i<numberOfEntities;i++){
                console.log ('\t\t' + respuestaWit["0"].entities.fromAplication[i].value);
            }

        }*/
    }
}

module.exports = Mensaje;