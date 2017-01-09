#!/bin/sh
  
USAGE="usage: ${0##*/} [-f <JSON File Name> <Topic Name> | <\"Message\"> <Topic Name>]"
  
# Get parameters from the CLI.
getJsonFileNameFromCli()
{  
  while getopts "f::" opt "$@"; do
    case $opt in
      f)
        JSON_MESSAGE_FILE_NAME_FROM_CLI=$OPTARG
        ;;
      \?)
        echo "Invalid option: -$OPTARG $USAGE" >&2
        exit 1
        ;;
      :)
        echo "Option -$OPTARG requires an argument. $USAGE" >&2
        exit 1
        ;;
      *)
        echo "Unimplemented option: -$OPTARG - $USAGE" >&2
        exit 1
        ;;
    esac
  done
}

if [ $# -eq 0 ] ; then
  echo "No arguments supplied - $USAGE"
  exit 1
fi

if [ $# -eq 2 ] ; then
  MESSAGE_FROM_CLI=$1
  TOPIC_NAME_FROM_CLI=$2
elif [ $# -eq 3 ] ; then
  getJsonFileNameFromCli $@
  TOPIC_NAME_FROM_CLI=$3
else
  echo "Incorrect # of arguments - $USAGE"
  exit 1
fi

if [[ -z $TOPIC_NAME_FROM_CLI ]] ; then
  echo "No topic - [$USAGE]"
  exit 1
fi

# echo "Topic Name from CLI = [$TOPIC_NAME_FROM_CLI]"

if [[ ! -z $MESSAGE_FROM_CLI ]] ; then
  # echo "Text Message from CLI = [$MESSAGE_FROM_CLI]"

  echo $MESSAGE_FROM_CLI | kafka-console-producer \
            --broker-list localhost:9092 \
            --topic $TOPIC_NAME_FROM_CLI
elif [[ ! -z $JSON_MESSAGE_FILE_NAME_FROM_CLI ]] ; then
  # echo "JSON Message file name from CLI = [$JSON_MESSAGE_FILE_NAME_FROM_CLI]"
  
  if [ ! -f "$JSON_MESSAGE_FILE_NAME_FROM_CLI" ] ; then
    echo "JSON Message file: $JSON_MESSAGE_FILE_NAME_FROM_CLI does not exist."
    exit 1
  fi

  JSON_MESSAGE=`cat $JSON_MESSAGE_FILE_NAME_FROM_CLI` 
  echo $JSON_MESSAGE | kafka-console-producer \
            --broker-list localhost:9092 \
            --topic $TOPIC_NAME_FROM_CLI
fi
