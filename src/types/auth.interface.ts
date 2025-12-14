import { Gender } from "../models/Student";

export interface SignupRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}