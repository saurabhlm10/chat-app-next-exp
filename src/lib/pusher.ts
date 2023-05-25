import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "ap2",
  }
);

let heartbeatInterval: NodeJS.Timeout;

function sendHeartbeat() {
  pusherServer.trigger("presence", "heartbeat", {});
}

// Start the heartbeat mechanism
function startHeartbeat() {
  heartbeatInterval = setInterval(sendHeartbeat, 1000); // Send heartbeat every 10 seconds
}

pusherClient.connection.bind("connected", function () {
  console.log("Connected to Pusher Channels");
  startHeartbeat(); // Start sending heartbeats
});

pusherClient.connection.bind("disconnected", function () {
  console.log("Disconnected from Pusher Channels");
  clearInterval(heartbeatInterval); // Stop sending heartbeats
});
