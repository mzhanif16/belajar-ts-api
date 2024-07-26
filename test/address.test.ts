import {AddressTest, ContactTest, UserTest} from "./test-util";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";

describe('POST /api/contacts/:contactId/address', () => {
    beforeEach(async ()=>{
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async ()=>{
        await AddressTest.delete()
        await ContactTest.delete()
        await UserTest.delete()
    })
    it('should be able create address', async () => {
        const contact = await ContactTest.get()
        logger.debug(`contact id: ${contact.id}`)
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/address`)
            .set("Authorization", "test")
            .send({
                street: "TEST",
                city: "DEPOK",
                province: "JABAR",
                country: "USA",
                postal_code: "1642"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
    })
    it('should reject create address if contact not found', async () => {
        const contact = await ContactTest.get()
        logger.debug(`contact id: ${contact.id}`)
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/address`)
            .set("Authorization", "test")
            .send({
                street: "TEST",
                city: "DEPOK",
                province: "JABAR",
                country: "USA",
                postal_code: "1642"
            })

        logger.debug(response.body)
        expect(response.status).toBe(404)
    })
})

describe('GET /api/contacts/:contactId/address/:addressId', () => {

    beforeEach(async ()=>{
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })
    afterEach(async ()=>{
        await AddressTest.delete()
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should be able to get address',async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/address/${address.id}`)
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });
})

describe('GET /api/contacts/:contactId/address', () => {

    beforeEach(async ()=>{
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })
    afterEach(async ()=>{
        await AddressTest.delete()
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should be able to get list address',async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/address`)
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });
})



