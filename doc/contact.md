# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header: 
- Authorization : Bearer Token

Request Body: 
```json
{
  "first_name": "Mz",
  "last_name": "Hanif",
  "email": "mz@gmail.com",
  "phone": "12356457"
}
```

Response Body (Success):
```json
{
  "data": {
    "id" : 1,
    "first_name": "Mz",
    "last_name": "Hanif",
    "email": "mz@gmail.com",
    "phone": "12356457"
  }
}
```

Response Body (Failed):
```json
{
  "errors": "first_name must not blank"
}
```

## Get Contact

Endpoint : GET /api/contacts/{$id}

Request Header:
- Authorization : Bearer Token

Response Body (Success):
```json
{
  "data": {
    "id" : 1,
    "first_name": "Mz",
    "last_name": "Hanif",
    "email": "mz@gmail.com",
    "phone": "12356457"
  }
}
```

Response Body (Failed):
```json
{
  "errors": "Contact not found"
}
```
## Update Contact

Endpoint : PUT /api/contacts/{$id}

Request Header:
- Authorization : Bearer Token

Request Body:
```json
{
  "first_name": "Mz",
  "last_name": "Hanif",
  "email": "mz@gmail.com",
  "phone": "12356457"
}
```

Response Body (Success):
```json
{
  "data": {
    "id" : 1,
    "first_name": "Mz",
    "last_name": "Hanif",
    "email": "mz@gmail.com",
    "phone": "12356457"
  }
}
```

Response Body (Failed):
```json
{
  "errors": "Contact not found"
}
```
## Remove Contact
Endpoint : DELETE /api/contacts/{$id}

Request Header:
- Authorization : Bearer Token

Response Body (Success):
```json
{
  "data": "success remove contact"
}
```

Response Body (Failed):
```json
{
  "errors": "Contact not found"
}
```
## Search Contact

Endpoint : GET /api/contacts

Query Parameter :
- name  : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page   : number, default 1
- size   : number, default 10

Request Header:
- Authorization : Bearer Token

Response Body (Success):
```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Mz",
      "last_name": "Hanif",
      "email": "mz@gmail.com",
      "phone": "12356457"
    },
    {
      "id": 2,
      "first_name": "Mz",
      "last_name": "Hanif",
      "email": "mz@gmail.com",
      "phone": "12356457"
    },
    {
      "id": 3,
      "first_name": "Mz",
      "last_name": "Hanif",
      "email": "mz@gmail.com",
      "phone": "12356457"
    }
  ],
  "paging" : {
    "current_page" : 1,
    "total_page" : 10,
    "size" : 10
  }
}
```

Response Body (Failed):
```json
{
  "errors": "Unauthorized"
}
```