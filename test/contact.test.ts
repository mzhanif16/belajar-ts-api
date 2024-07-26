import {ContactTest, UserTest} from "./test-util";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
    })
    afterEach(async () => {
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should create new contact', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "hanif",
                last_name: "zaki",
                email: "hanif@gmail.com",
                phone: "07881",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("hanif")
        expect(response.body.data.last_name).toBe("zaki")
        expect(response.body.data.email).toBe("hanif@gmail.com")
        expect(response.body.data.phone).toBe("07881")
    })

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "com",
                phone: "0788121241241412",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should be able get contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    });

    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("Authorization", "test")

        logger.debug(`${JSON.stringify(response.body)} statusCode : ${response.status}`)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });
})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("Authorization", "test")
            .send({
                first_name: "hanif16",
                last_name: "zaki",
                email: "hanif@gmail.com",
                phone: "07881",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
    });

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "hanif.com",
                phone: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });
})

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });

    it('should reject remove contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
    });
})

describe('GET /api/contacts',()=>{
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.delete()
        await UserTest.delete()
    })

    it('should be able to search contact', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });

    it('should be able to search contact using name', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                name: "es"
            })
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });

    it('should be able to search contact using email', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                email: ".com"
            })
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });

    it('should be able to search contact using phone', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                phone: "0"
            })
            .set("Authorization", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
    });
})