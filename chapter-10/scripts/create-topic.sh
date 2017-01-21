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

kafka-topics --zookeeper localhost:2181 --create \
             --topic $1 --partitions 1 \
             --replication-factor 1