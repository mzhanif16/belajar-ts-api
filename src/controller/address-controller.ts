import {UserRequest} from "../type/user-request";
import {Response,NextFunction} from "express";
import {CreateAddressRequest, GetAddressRequest} from "../model/address-model";
import {AddressService} from "../service/address-service";
import {logger} from "../application/logging";

export class AddressController {
    static async create(req: UserRequest,res: Response, next: NextFunction){
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            logger.debug(`contact IDNYA : ${request.contact_id}`);
            const response = await AddressService.createAddress(req.user!, request)
            res.status(200).json({
                data: response,
            })
        }catch (e){
            next(e)
        }
    }
    static async get(req: UserRequest,res: Response, next: NextFunction){
        try {
            const request: GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }
            const response = await AddressService.getAddress(req.user!, request)
            res.status(200).json({
                statusCode: res.statusCode,
                data: response,
            })
        }catch (e){
            next(e)
        }
    }
    static async getList(req: UserRequest,res: Response, next: NextFunction){
        try {
            const contactId = Number(req.params.contactId);
            const response = await AddressService.getListAddress(req.user!, contactId)
            res.status(200).json({
                statusCode: res.statusCode,
                data: response,
            })
        }catch (e){
            next(e)
        }
    }


}