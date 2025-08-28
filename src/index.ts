import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { User, UserType } from "./types";
import type { ProtoGrpcType } from "./generated/a";
import type { UserManagementServiceHandlers } from "./generated/UserManagementService";
import { status } from "@grpc/grpc-js";

const protoSource = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);
const protoDefinition = grpc.loadPackageDefinition(
  protoSource
) as unknown as ProtoGrpcType;

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

const serviceHandler: UserManagementServiceHandlers = {
  AddUser(call, callback) {
    const { addr, age, emails, fullname, phoneNumbers, sex, username } =
      call.request;
    const newUser: User = {
      fullname: fullname,
      age: age,
      addr: {
        city: addr?.city,
        country: addr?.country,
        flatNo: addr?.flatNo,
        state: addr?.state,
      },
      emails: emails,
      phoneNumber: phoneNumbers,
      sex: sex === "F" ? "F" : "M",
    };
    users[username] = newUser;
    callback(null, newUser);
  },
  DeleteUserByUsername(call, callback) {
    const username = call.request.username;
    if (!username) {
      callback(
        {
          code: status.INVALID_ARGUMENT,
          message: "Username is required",
        },
        null
      );
      return;
    }
    if (users[username]) {
      delete users[username];
      callback(null, { success: true, message: "User Deleted successfully!" });
    } else {
      callback({
        code: status.NOT_FOUND,
        message: `User with username ${username} not found`,
      });
    }
  },
  GetUserByUsername(call, callback) {
    const username = call.request.username;
    const user = users[username];
    if (user) {
      callback(null, user);
    } else {
      callback(
        {
          code: status.NOT_FOUND,
          message: `User with username ${username} not found`,
        },
        null
      );
    }
  },
  UpdateUserByUsername(call, callback) {
    const { username, user } = call.request;
    if (!username) {
      callback(
        {
          code: status.INVALID_ARGUMENT,
          message: "Username is required",
        },
        null
      );
      return;
    }
    if (!user) {
      callback(
        {
          code: status.INVALID_ARGUMENT,
          message: "User data is required",
        },
        null
      );
      return;
    }
    if (!users[username]) {
      callback(
        {
          code: status.NOT_FOUND,
          message: `User with username ${username} not found`,
        },
        null
      );
      return;
    }
    const updatedUser: User = {
      fullname: user.fullname,
      age: user.age,
      sex: user.sex === "F" ? "F" : "M",
      addr: {
        flatNo: user.addr?.flatNo,
        city: user.addr?.city,
        state: user.addr?.state,
        country: user.addr?.country,
      },
      emails: user.emails,
      phoneNumber: user.phoneNumbers,
      // .filter((pn) => pn.type !== "PHONE_TYPE_UNSPECIFIED")
      // .map((pn) => ({
      //   number: pn.number,
      //   type: pn.type as "WORK" | "MOBILE" | "HOME",
      // }))
    };
    users[username] = updatedUser;
    callback(null, updatedUser);
  },
};

const server = new grpc.Server();

server.addService(
  protoDefinition.UserManagementService.service,
  serviceHandler
);

server.bindAsync(
  "0.0.0.0:5051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server: ", err);
      return;
    }
    console.log("Running at port: ", port);
  }
);
