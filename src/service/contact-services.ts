import {
    ContactResponseData,
    CreateContactRequest, SearchContactRequest,
    toContactResponse,
    UpdateContactRequest
} from "../model/contact-model";
import {Validation} from "../validation/validation";
import {ContactValidation} from "../validation/contact-validation";
import {Contact, User} from "@prisma/client";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {Pageable} from "../model/page";

export class ContactService {
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponseData> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)

        const record = {
            ...createRequest,
            ...{username: user.username}
        }
        const contact = await prismaClient.contact.create({
            data: record
        })

        return toContactResponse(contact)

    }

    static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contactId,
                username: username
            }
        })
        if (!contact) {
            throw new ResponseError(404, "Could not find contact")
        }

        return contact
    }

    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponseData> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
        await this.checkContactMustExists(user.username, updateRequest.id)
        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username,
            },
            data: updateRequest
        })

        return toContactResponse(contact)

    }

    static async get(user: User, id: number): Promise<ContactResponseData> {
        const contact = await this.checkContactMustExists(user.username, id)
        return toContactResponse(contact)
    }

    static async remove(user: User, id: number): Promise<ContactResponseData> {
        await this.checkContactMustExists(user.username, id)
        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        })
        return toContactResponse(contact)
    }

    static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponseData>> {
        const searchContactRequest = Validation.validate(ContactValidation.SEARCH, request)
        const skip = (searchContactRequest.page - 1) * searchContactRequest.size

        const filters = []
        //cek if name exist
        if (searchContactRequest.name) {
            filters.push({
                OR: [{
                    first_name: {
                        contains: searchContactRequest.name
                    },
                    last_name: {
                        contains: searchContactRequest.name
                    }
                }]
            })
        }
        //cek if email exist
        if (searchContactRequest.email){
            filters.push({
                email: {
                    contains: searchContactRequest.email
                }
            })
        }
        //cek if phone exist
        if (searchContactRequest.phone){
            filters.push({
                phone: {
                    contains: searchContactRequest.phone
                }
            })
        }


        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchContactRequest.size,
            skip: skip
        })

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchContactRequest.page,
                total_page: Math.ceil(total / searchContactRequest.size),
                size: searchContactRequest.size
            }
        }
    }
}