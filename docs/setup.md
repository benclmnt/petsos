# Testing if your setup is successful - 02 Sep

## Assumption
You have `node and yarn installed`.

## Steps
1. Clone the repo
2. Make sure you have postgres installed
3. Run postgres : `sudo service postgresql start`
4. Open `psql`
5. Create dummy table

    ```
    create database petsos;
    \c petsos
    \conninfo
    create table users (id serial primary key, name varchar(30), email varchar(30));
    INSERT INTO users (name, email) VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');
    ```

6. Check that you've inserted data successfully by doing `SELECT * from users;`
7. Go to `packages/back/.env` and change the database info
8. Do `yarn` on project root, `packages/front` and `packages/back`. Wait for installing to finish
9. `yarn start`
10. open `http://localhost:3000` to test React frontend
11. open `http://localhost:5000/api/foo` to test Node API -> you should see

    ```
    {"foo":"true","message":[{"id":1,"name":"Jerry","email":"jerry@example.com"},{"id":2,"name":"George","email":"george@example.com"}]}
    ```
12. You're done!