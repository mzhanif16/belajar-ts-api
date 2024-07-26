# Address API Spec

## Create Address
Endpoint : POST /api/contacts/:idContact/addresses

Request Header : 
- Authorization : Bearer token

Request Body :
```json
{
  "street" : "Jalan",
  "city" : "Depok",
  "province" : "Jabar",
  "country" : "Indo",
  "postal_code" : "1634"
}
```

Response Body (Success):
```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Depok",
    "province": "Jabar",
    "country": "Indo",
    "postal_code": "1634"
  }
}
```

Response Body (Failed):
```json
{
  "errors": "postal_code is required"
}
```
## Get  Address
Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :
- Authorization : Bearer token

Response Body (Success):
```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Depok",
    "province": "Jabar",
    "country": "Indo",
    "postal_code": "1634"
  }
}
```

Response Body (Failed):
```json
{
  "errors": "postal_code is not found"
}
```
## Update Address
Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :
- Authorization : Bearer token

Request Body :
```json
{
  "street" : "Jalan",
  "city" : "Depok",
  "province" : "Jabar",
  "country" : "Indo",
  "postal_code" : "1634"
}
```

Response Body (Success):
```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Depok",
    "province": "Jabar",
    "country": "Indo",
    "postal_code": "1634"
  }
}
```

Response Body (Failed):
```json
{
  "errors": "postal_code is required"
}
```
## Remove Address
Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :
- Authorization : Bearer token

Response Body (Success):
```json
{
  "data": "success deleted"
}
```

Response Body (Failed):
```json
{
  "errors": "Address is not found"
}
```
## List  Address
Endpoint : GET /api/contacts/:idContact/addresses 

Request Header :
- Authorization : Bearer token

Response Body (Success):
```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan",
      "city": "Depok",
      "province": "Jabar",
      "country": "Indo",
      "postal_code": "1634"
    },
    {
      "id": 2,
      "street": "Jalan",
      "city": "Depok",
      "province": "Jabar",
      "country": "Indo",
      "postal_code": "1634"
    }
  ]
}
```

Response Body (Failed):
```json
{
  "errors": "Contact is not found"
}
```