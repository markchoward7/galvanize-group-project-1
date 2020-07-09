#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z comp3_database 5432; do
    sleep 0.1
done

echo "PostgreSQL started"

nodemon -L app.js