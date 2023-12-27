import { z } from "zod";
// *****************************************************
// General structure of a response
// *****************************************************

export interface RouteResponse<T> {
  success: boolean;
  code: number;
  message: string;
  error: string | null;
  data: T | null;
}
export interface AuthRouteResponse {
  id: number;
  username: string;
  accessToken: string;
}

export interface TaskRouteResponse {
  id: number;
  title: string;
  priority: string;
  note: string;
  done: boolean;
  userId: number;
}
// *****************************************************
// Register structure of a response / request
// *****************************************************

export const registerPayloadSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  username: z
    .string()
    .min(1, { message: "Username is a required field" })
    .max(20, { message: "Username cannot exceed 20 characters." }),
  password: z
    .string({ required_error: "Please enter a valid password" })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export type RegisterRouteRequest = z.infer<typeof registerPayloadSchema>;

// *****************************************************
// Login structure of a response / request
// *****************************************************

export const loginPayloadSchema = z.object({
  username: z.string().min(1, { message: "Username is a required field" }),
  password: z.string().min(1, { message: "Password is a required field." }),
});

export type LoginRouteRequest = z.infer<typeof loginPayloadSchema>;

// *****************************************************
// Create task structure of a response / request
// *****************************************************

export const createTaskPayloadSchema = z.object({
  title: z.string().min(1, { message: "Title is a required field." }),
  note: z.string().min(1, { message: "Note is a required field." }),
  priority: z.string().min(1, { message: "Priority is a required field." }),
  done: z.boolean(),
  userId: z.number(),
});
