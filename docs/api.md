# Api

## Users

### GET `/users/`

List the first 25 users.

#### Response

```
[
    {
        "kind": "User",
        ... user object parameters
        "selfLink": "/users/petsos",
    }
]
```

### GET `/users/[:username]`

Get user info.

#### Response

```
{
    "kind": "User",
    ... user object parameters
    "selfLink": "/users/petsos",
}
```

### POST `/users/login`

Login. (only support by email)

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
    "kind": "User",
    ... user object parameters
    "selfLink": "/users/petsos",
}
```

### POST `/users/register`

Register a new user. (username must be unique)

#### Request:

Body:

```
{
    "username": "petsos",
    "email": "petsos@petsos.com",
    "password": "petsos123",
}
```

#### Response:

```
{
    "kind": "User",
    ... user object parameters
    "selfLink": "/users/petsos",
}
```

### POST `/users/address`

Upsert address data for a user. (username must be unique)

#### Request:

Body:

```
{
    "username": "petsos",
    "address": "...",
    "postal" : "...",
    "city" : "...",
    "country" : "..."
}
```

#### Response:

```
{
    "kind": "User",
    ... user object parameters
    "selfLink": "/users/petsos",
}
```

## Caretakers

### GET `/caretakers`

Get a list of available caretakers.

#### Response

```
[
    {
        "kind": "Caretaker",
        ... caretaker object parameters
        "selfLink": "/caretakers/petsos",
    }
]
```

### GET `/caretakers/[:userId]`

Get specific info about a caretaker (past jobs, availability, capability, expected salary, pet-days)

#### Response

```
{
    "kind": "Caretaker",
    ... caretaker object parameters
    "selfLink": "/caretakers/petsos",
}
```

### POST `/caretakers/[:userId]/availability`

Post caretaker availability / leaves

```
{
    "kind": "Caretaker",
    ... caretaker object parameters
    "selfLink": "/caretakers/petsos",
}
```

### POST `/caretakers/[:userId]/capability`

Upsert caretaker capability

#### Request:

Body:

```
{
    "username": "petsos",
    "species": "...",
    "breed": "...",
    "size": "..."
    
}
```

#### Response:

```
{
    "kind": "caretaker",
    ... caretaker object parameters
    "selfLink": "/carertakers/petsos",
}
```


## Reviews

### GET `/caretakers/[:userId]/reviews`

Get reviews for a given caretaker.

### GET `/reviews/[:reviewId]`

Get review number


## Checkout

### POST `/cart/`

Create cart with user, pet, caretaker info.

### POST `/cart/[:cartId]`

Confirm a cart with payment method, transfer method, payment amount info.


## Jobs

### GET `/caretakers/[:userId]/jobs`

List all jobs a caretaker has been appointed

### GET `/users/[:userId]/jobs`

List all jobs a pet owner has commissioned

### GET `/jobs/[:jobId]`

Get info of a particular job

### POST `/jobs/[:jobId]/review`

Post a review for a particular job


## Ratings

### GET `/caretakers/[:userId]/rating`

Get average rating for a caretaker


## Pets

### GET `/users/[:userId]/pets`

Get all pets of a user

### GET `/pets/[:petId]`

Get a pet specific info


## Admin (`/admin`)

### GET `/admin/stats`

View PCS stats

### POST `/admin/price`

Set pet category base price
