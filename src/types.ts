interface Address {
  flatNo?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface PhoneNumber {
  number: string;
  type: "WORK" | "MOBILE" | "HOME" | "PHONE_TYPE_UNSPECIFIED";
}

export interface User {
  username: string;
  fullname: string;
  age: number;
  sex?: "M" | "F";
  addr: Address;
  emails: string[];
  phoneNumbers: PhoneNumber[];
}

export interface UserType {
  [key: string]: User;
}
