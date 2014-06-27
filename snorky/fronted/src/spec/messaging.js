describe("Messaging service", function() {
  beforeEach(function() {
    this.MockService = Snorky.Class(Snorky.RPCService, {
      constructor: function() {
        // Do not initialize snorky and name
        // Mock sendMessage method with an spy
        this.init();
      }
    });
    this.messagingService = new this.MockService();

    spyOn(this.messagingService, "sendMessage");
    spyOn(this.messagingService, "onParticipantMessage");
  });

  it("sends messages", function() {
    // Should work if RPC services work
    this.messagingService.send({
      sender: "Alice",
      dest: "Bob",
      body: "Hello"
    });

    expect(this.messagingService.sendMessage).toHaveBeenCalledWith({
      "command": "send",
      "callId": 0,
      "params": {
        sender: "Alice",
        dest: "Bob",
        body: "Hello"
      }
    });
  });

  it("receives messages", function() {
    this.messagingService.onMessage({
      "type": "message",
      "sender": "Bob",
      "dest": "Alice",
      "body": "Hi, Alice"
    });

    expect(this.messagingService.onParticipantMessage).toHaveBeenCalledWith(
      "Bob", "Alice", "Hi, Alice");
  });
});
