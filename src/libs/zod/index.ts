import { z } from "zod";

export const preOrderSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  phone: z.string().nonempty(),
  ref_code: z.string().nonempty(),
});
