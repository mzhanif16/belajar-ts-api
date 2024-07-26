import {AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {prismaClient} from "../application/database";
import {User} from "@prisma/client";
import {ContactService} from "./contact-services";
import {ResponseError} from "../error/response-error";
import {Pageable} from "../model/page";

export class AddressService {
    static async createAddress(user: User,request:CreateAddressRequest): Promise<AddressResponse>{
        const createRequest = Validation.validate(AddressValidation.CREATE,request)
        await ContactService.checkContactMustExists(user.username,request.contact_id)

        const address = await prismaClient.address.create({
            data : createRequest
        })

        return toAddressResponse(address)

    }

    static async getAddress(user: User,request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.GET,request)
        await ContactService.checkContactMustExists(user.username,request.contact_id)

        const address = await prismaClient.address.findFirst({
            where : {
                id : getRequest.id,
                contact_id: getRequest.contact_id
            }
        })
        if (!address){
            throw new ResponseError(404,"Address not found")
        }

        return toAddressResponse(address)
    }

    static async getListAddress(user: User,contactId: number): Promise<Array<AddressResponse>>{
        await ContactService.checkContactMustExists(user.username,contactId)

        const address = await prismaClient.address.findMany({
            where : {
                contact_id: contactId
            }
        })

        return address.map((address)=>toAddressResponse(address))
    }
}