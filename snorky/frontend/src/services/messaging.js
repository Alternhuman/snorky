(function() {
  "use strict";

  var Class = Snorky.Class;

  Snorky.Messaging = new Class(Snorky.RPCService, {
    onNotification: function(message) {
      if (message.type == "message") {
        this.onParticipantMessage(message.sender, message.dest, message.body);
      } else {
        console.error("Unknown message type in messaging service: " +
                      message.type);
      }
    },

    onParticipantMessage: function(sender, body) {
      // noop
    }
  });
  Snorky.Messaging.addRPCMethods([
    "registerParticipant",
    "unregisterParticipant",
    "listParticipants",
    "send"
  ]);

})();