#!/bin/sh

# Check Command-Line Arguments.
USAGE="usage: ${0##*/} <Topic Name>"

if [ $# -eq 0 ] ; then
  echo "No arguments supplied - ${USAGE}"
  exit 1
fi

if [ $# -ne 1 ] ; then
  echo "Incorrect # of arguments - ${USAGE}"
  exit 1
fi

kafka-console-consumer --bootstrap-server localhost:9092 \
                       --topic $1