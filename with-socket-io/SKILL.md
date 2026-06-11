---
name: with-socket-io
description: Add Socket.IO real-time communication to an Expo project. WebSocket-based bidirectional messaging between client and server. Use when the user wants Socket.IO, real-time updates, WebSockets, live data, or push messages from a server.
version: 1.0.0
license: MIT
---

# Add Socket.IO Real-Time Communication

## When to use

- User wants real-time bidirectional communication between client and server
- User asks about Socket.IO or WebSockets in Expo
- User wants live data pushed from a server (e.g. notifications, chat, live updates)

## Dependencies

Client (Expo app):

```bash
npm install socket.io-client
```

Backend (Node.js server):

```bash
npm install express socket.io
```

## Configuration

Set the `socketEndpoint` to point at the running backend:

```tsx
const socketEndpoint = "http://localhost:3000";
```

On a physical device, replace `localhost` with your machine's LAN IP address.

## Implementation

### 1. Create the backend server

Create `backend/index.js`:

```js
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log(`[${socket.id}] socket connected`);
  socket.on("disconnect", (reason) => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

// Broadcast the current server time every 1 second
setInterval(() => {
  io.sockets.emit("time-msg", { time: new Date().toISOString() });
}, 1000);

http.listen(3000, () => {
  console.log("listening on *:3000");
});
```

Start it with `node backend/index.js`.

### 2. Connect from the Expo app

```tsx
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";

const socketEndpoint = "http://localhost:3000";

export default function App() {
  const [hasConnection, setConnection] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(function didMount() {
    const socket = io(socketEndpoint, {
      transports: ["websocket"],
    });

    socket.io.on("open", () => setConnection(true));
    socket.io.on("close", () => setConnection(false));

    socket.on("time-msg", (data) => {
      setTime(new Date(data.time).toString());
    });

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!hasConnection && (
        <Text>Connecting to {socketEndpoint}...</Text>
      )}
      {hasConnection && (
        <>
          <Text style={{ fontWeight: "bold" }}>Server time</Text>
          <Text>{time}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
```

## Key API reference

| API | Purpose |
|-----|---------|
| `io(url, opts)` | Create a socket connection; use `transports: ["websocket"]` for React Native |
| `socket.on(event, callback)` | Listen for a named event from the server |
| `socket.emit(event, data)` | Send a named event to the server |
| `socket.io.on("open" / "close", cb)` | Monitor connection state |
| `socket.disconnect()` | Close the connection |
| `io.sockets.emit(event, data)` | Server: broadcast to all connected clients |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Use `transports: ["websocket"]` to avoid long-polling issues in React Native
- Replace `localhost` with a LAN IP or public URL when testing on physical devices
- Clean up the socket connection in the `useEffect` return to avoid memory leaks
- Adapt event names (`time-msg`) and data shapes to the user's actual use case
- The backend is a minimal Express + Socket.IO server; adapt or replace with the user's own server

## Reference

See full working example in this directory.
