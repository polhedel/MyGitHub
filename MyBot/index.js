module.exports = {
  Logger: require('./lib/logger.js').Logger,
  logLevels: require('./lib/logger.js').logLevels,
  Wit: require('./lib/wit.js').Wit,

};
var mensaje = require('./mensaje');
var interprete = require('./interprete');

var EventEmitter = require('events').EventEmitter;
var login = new EventEmitter();

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const config = require('./config');
const Wit = require('./').Wit;


var wit_token = config.wit_token || '';
var slack_token = config.slack_token || '';
var RtmClient = require('@slack/client').RtmClient;
var proxiedRequestTransport = require('@slack/client/lib/clients/transports/request.js').proxiedRequestTransport;
var wsTransport = require('@slack/client/lib/clients/transports/ws');
var url = config.URL || '';

//Información del chat de Slack



//Creación del cliente Slack
var rtm_slack = new RtmClient(
  slack_token,
  {
  logLevel:'log',
  /*transport: proxiedRequestTransport(url), //Necesario para que funcione destras del proxy de everis
  socketFn: function(socketUrl) {
      return wsTransport(socketUrl, {
          proxyURL: url,
          proxyUrl: url
      });
    }*/
  });

//Conexión a Slack
rtm_slack.start();


// Acciones de Wit.ai client
const actions = {
    say: function(sessionId, msg, cb) {
      console.log(msg);
      cb();
    },
    merge: function(context, entities, cb) {
      cb(context);
    },
    error: function(sessionid, msg){
      console.log('Oops, I don\'t know what to do.');
    }
};

//Conexión a Wit.ai
const client_wit = new Wit(wit_token, actions);


var estado = {
    lastState: "",
    ignoreIntent: false,
    conversationLevel: 0
};


//Recibo un mensaje
rtm_slack.on(RTM_EVENTS.MESSAGE, function(message_from_slack){

    var newMessage = mensaje(message_from_slack);
    newMessage.mostrar();
    newMessage.mostrarDeCanal();

    //Sending message to Wit.ai
    client_wit.message(message_from_slack.text, function (error, data) {

        if (error) {
            console.log('Ups! He encontrado un error: ' + error);

        } else {
            console.log('Respuesta de wit: ' +JSON.stringify(data));

            var respuesta = interprete().interpretar(data,estado);

            rtm_slack.sendMessage(respuesta, message_from_slack.channel, function messageSent() {});
            console.log('Last state: ' + estado.lastState);

        }
    });

        /*
        if (counter==1) {
        rtm_slack.sendMessage('¡Hola! ¿En qué puedo ayudarte?', message_from_slack.channel, function messageSent() {});
        console.log('Mensaje enviado: ¡Hola! ¿En qué puedo ayudarte?');
        }
        */

});


