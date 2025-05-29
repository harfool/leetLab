import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6 , "Password must be atleast of 6 character"),
  name : z.string().min(6 , "Name must be atleast of 6 character")
});

export default signUpSchema