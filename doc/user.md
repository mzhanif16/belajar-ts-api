# User API Spec

## Register User

Endpoint : POST /api/users/register

Request Body :

```json
{
  "username": "mzhnf",
  "password": "secret",
  "name": "hanif"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "mzhnf",
    "password": "secret",
    "name": "hanif"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "mzhnf",
  "password": "secret"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "mzhnf",
    "name": "hanif",
    "token": "string"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong .."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization : Bearer token

Response Body (Success) :

```json
{
  "data": {
    "username": "mzhnf",
    "name": "hanif",
    "token": "string"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- Authorization : Bearer token

Request Body :

```json
{
  "username": "mzhnf",
  "password": "secret"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "mzhnf",
    "name": "hanif",
    "token": "string"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- Authorization : Bearer token

Response Body (Success) :

```json
{
  "data": "success logout"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```