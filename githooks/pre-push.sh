#!/bin/sh

# This git hook makes sure all your .env vars are in .env.example before pushing up.

php artisan env:check --reverse

exit $?
