## Description
This repository contains the following functionality after uploading a csv file

- `/echo`: prints out the contents of integer matrix
- `/invert`: prints out the contents of interger matrix in inverted form
- `/flatten`: prints out the contents of integer matrix and flattens them comma separated 
- `/sum`: prints out the total sum of all values in the integer matrix
- `/multiply`: prints out the multiplied value of all values in the integer matrix

The components that handle the core functionality, are under `csv` module, which include
- `csv.controller.ts`: manages the routes and calls the necessary service functions.
- `csv.service.ts`: maintains the core logic to be consumed based on the request.
- `file-validation-pipe.ts`: responsible for handling validation of file data before being processed by our routes.

## Assumptions
 - There is file size limit applied (up to 5MB).
 - Only allowed to upload one file at a time.
 - For this first version, we are only allowing files with mime-type `text/csv`.

## Project setup

```
  Prequesites:
    - Node: version 22
    - npm: version 10.8.3
```
```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## API Usage
To use the above mentioned functionality, we can make use of `curl` or use Postman to make HTTP calls by uploading a file.

```bash
# Echo use case
curl -F 'file=@./matrix.csv;type=text/csv' "http://localhost:8080/echo"; echo

OR 

http://localhost:8080/echo 

#Invert use case
curl -F 'file=@./matrix.csv;type=text/csv' "http://localhost:8080/invert"; echo

OR

http://localhost:8080/invert

#Flatten use case
curl -F 'file=@./matrix.csv;type=text/csv' "http://localhost:8080/flatten"; echo

OR

http://localhost:8080/flatten

#Sum use case
curl -F 'file=@./matrix.csv;type=text/csv' "http://localhost:8080/sum"; echo

OR

http://localhost:8080/sum

#Multiply use case
curl -F 'file=@./matrix.csv;type=text/csv' "http://localhost:8080/multiply"; echo

OR 

http://localhost:8080/mulitply

```

## Run tests

```bash
# unit tests
$ npm run test
```



