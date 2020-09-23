# Api

## Users (`/users`)

### GET `/users/[:id]`

Get user info.

#### Response

```
{
    "id"  : "1234",
    "kind": "User",
    "name": "petsos",
    "email": "petsos@petsos.com",
    "selfLink": "/users/1234",
    "addressLink": "/addresses/1234",
}
```

### POST `/users/login`

Login.

#### Request:

Body:

```
{
    "email": "petsos@petsos.com",
    "password": "petsos123",
}
```

#### Response

```
{
    "id"  : "1234",
    "kind": "User",
    "name": "petsos",
    "email": "petsos@petsos.com",
    "selfLink": "/users/1234",
    "addressLink": "/addresses/1234",
}
```

### POST `/users/register`

Register a new user.

#### Request:

Body:

```
{
    "name": "petsos",
    "email": "petsos@petsos.com",
    "password": "petsos123",
}
```

#### Response:

```
{
    "id"  : "1234",
    "kind": "User",
    "name": "petsos",
    "email": "petsos@petsos.com",
    "selfLink": "/users/1234",
    "addressLink": "",
}
```

