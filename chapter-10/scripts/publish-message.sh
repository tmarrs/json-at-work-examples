#!/bin/sh

# Check Command-Line Arguments.
USAGE="usage: ${0##*/} <\"Message\"> <Topic Name>"

if [ $# -eq 0 ] ; then
  echo "No arguments supplied - $USAGE"
  exit 1
fi

if [ $# -ne 2 ] ; then
  echo "Incorrect # of arguments - $USAGE"
  exit 1
fi

echo $1 | kafka-console-producer \
                  --broker-list localhost:9092 \
                  --topic $2