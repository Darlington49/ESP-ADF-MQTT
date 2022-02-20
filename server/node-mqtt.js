const mqtt = require("mqtt");

const host = "192.168.100.9";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const topics = ["/topic/qos1", "/wave/data", "/wave/signal"];

console.log("clientId :", clientId);
const connectUrl = `mqtt://${host}:${port}`;
var FileWriter = require("wav").FileWriter;

//1 Create a file
// 2. configure the Headers
// 3. concat or keep adding the data
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
  client.subscribe(topics, () => {
    console.log(`Subscribe to topic '${topics[0]}'`);
  });
  client.publish(
    topics[0],
    "nodejs mqtt test",
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  );
});
var outputFileStream = new FileWriter("./mqttwave.wav", {
  sampleRate: 16000,
  channels: 2,
  bitDepth: 16,
});
client.on("message", (topic, payload) => {
  // console.log("Received Message:", topic, payload.toString());
  console.log("Received Message:", topic, payload.length);

  if (topic === "/wave/signal") {
    console.log("Received Message:", topic, payload.toString());
    // 1 recover information such as :
    //    audio-sample-rates  "16000"
    //    audio-bits  "16"
    //    audio-channel  "2"
    // 2 Create file with this params
    var outputFileStream = new FileWriter("./mqttwave.wav", {
      sampleRate: 16000,
      channels: 2,
      bitDepth: 16,
    });
  } else if (topic === "/wave/data") {
    outputFileStream.write(payload);
    console.log("writing to the file");
  } else {
    console.log("Received Message:", topic, payload.toString());
  }
});

function filename(rates, bits, ch) {
  time = new Date().toISOString().replaceAll(":", "");
  time = time.replaceAll("-", "");
  time = time.replaceAll(".", "");

  return `${time}_${rates}_${bits}_${ch}.wav`;
}
