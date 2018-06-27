#!/bin/sh

# This hook is called with the following parameters:
#
# $3 - A flag indicating whether the checkout was a branch or file checkout

isFileCheckout=0
isBranchCheckout=1

if [ $3 -eq $isBranchCheckout ]
then
    composer install
fi
