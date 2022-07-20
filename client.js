const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObj.todoPackage;
const text = process.argv[2];

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    console.log("Received from server " + JSON.stringify(response));
  }
);

//Heavy data dump
client.readTodos({}, (err, response) => {
  console.log("Todos: \n" + JSON.stringify(response));
  if (!response.items) {
    response.items.forEach((i) => console.log(i.text));
  }
});

//Streaming data from the server
const call = client.readTodosStream();
call.on("data", (item) => {
  console.log("Todo Stream: " + JSON.stringify(item));
});

call.on("end", (e) => console.log("Server done."));
