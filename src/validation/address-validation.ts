import {z, ZodType} from "zod";

export class AddressValidation {
    static readonly CREATE: ZodType = z.object({
        contact_id: z.number().positive(),
        street: z.string().min(1).max(100),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(50),
        postal_code: z.string().min(1).max(4)
    })
    static readonly GET: ZodType = z.object({
        contact_id: z.number().positive(),
        id: z.number().positive()
    })

    static readonly SEARCH: ZodType = z.object({
        name: z.string().min(1).optional(),
        phone: z.string().min(1).optional(),
        email: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}