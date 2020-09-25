# Api

## Users

### GET `/users/[:userId]`

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

## Caretakers

### GET `/caretakers`

Get a list of available caretakers.

### GET `/caretakers/[:userId]`

Get specific info about a caretaker (past jobs, availability, capability, expected salary, pet-days)

### POST `/caretakers/[:userId]/availability`

Post caretaker availability / leaves

### POST `/caretakers/[:userId]/capability`

Upsert caretaker capability


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
