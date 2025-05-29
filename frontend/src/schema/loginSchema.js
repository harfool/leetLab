import { z } from "zod";


const LoginSchema = z.object({
  email:z.string().email("Enter a valid email"),
  password:z.string().min(6 , "Password must be atleast of 6 characters"),

})

export default LoginSchema