import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const UserSchema = new Schema<IUser>({
  gender: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
  location: {
    street: {
      number: Number,
      name: String,
    },
    city: String,
    state: String,
    country: String,
    postcode: String,
    coordinates: {
      latitude: String,
      longitude: String,
    },
    timezone: {
      offset: String,
      description: String,
    },
  },
  email: String,
  login: {
    uuid: { type: String, unique: true },
    username: String,
    password: String,
    salt: String,
    md5: String,
    sha1: String,
    sha256: String,
  },
  dob: {
    date: String,
    age: Number,
  },
  registered: {
    date: String,
    age: Number,
  },
  phone: String,
  cell: String,
  picture: {
    large: String,
    medium: String,
    thumbnail: String,
  },
  nat: String,
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
