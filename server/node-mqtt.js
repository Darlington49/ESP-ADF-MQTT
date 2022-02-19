// const mqtt = require('mqtt')
// const client  = mqtt.connect('mqtt://192.168.100.9:1883')

// client.on('connect', function () {
//   console.log("connected")

//   client.subscribe('presence', function (err) {
//     if (!err) {
//       client.publish('presence', 'Hello mqtt')
//     }
//   })
// })

// client.on('/topic/qos0', function (topic, message) {
//   // message is Buffer
//   console.log(topic)
//   console.log(message.toString())
// //   client.end()
// })

const mqtt = require("mqtt");

const host = "192.168.100.9";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const topic = "/topic/qos1";

console.log("clientId :",clientId)
const connectUrl = `mqtt://${host}:${port}`;
ClientConfig = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
};
// const client = mqtt.connect(connectUrl, ClientConfig);
const client = mqtt.connect(connectUrl);

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
  client.publish(
    topic,
    "nodejs mqtt test",
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  );
});

client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
});
