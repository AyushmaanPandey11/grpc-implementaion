import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { UserType } from "./types";

const protoSource = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);
const protoDefinition = grpc.loadPackageDefinition(protoSource);

const users: UserType = {
  ayush123: {
    fullname: "ayushmaan",
    age: 25,
    sex: "M",
    addr: {
      flatNo: "A-101",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    emails: ["ayush123@example.com", "ayush.work@example.com"],
    phoneNumber: [
      { number: "+919876543210", type: "MOBILE" },
      { number: "+912233445566", type: "WORK" },
    ],
  },
  srujan456: {
    fullname: "srujan",
    age: 30,
    sex: "F",
    addr: {
      flatNo: "B-204",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    emails: ["srujan456@example.com"],
    phoneNumber: [
      { number: "+919123456789", type: "MOBILE" },
      { number: "+918011223344", type: "HOME" },
    ],
  },
};

const serviceHandler: UserManagementService = {};

const server = new grpc.Server();

server.addService(protoDefinition.UserManagementService.service, handler);
