#!/bin/sh

# Get parameters from the CLI.
getParamsFromCli()
{
  USAGE="usage: ${0##*/} [-f <JSON File Name> | -m <\"Message\">] <Topic Name>"
  
  echo
  echo "# arguments called with ---->  ${@}     "
  echo "# \$1 ---------------------->  $1       "
  echo "# \$2 ---------------------->  $2       "
  echo "# \$3 ---------------------->  $3       "
  echo "# \$4 ---------------------->  $4       "
  echo "# \$5 ---------------------->  $5       "
  echo "# path to me --------------->  ${0}     "
  echo "# parent path -------------->  ${0%/*}  "
  echo "# my name ------------------>  ${0##*/} "
  echo

  if [ $# -eq 0 ] ; then
    echo "No arguments supplied - $USAGE"
    exit 1
  fi
  
  if [ $# -ne 3 ] ; then
    echo "Incorrect # of arguments - $USAGE"
    exit 1
  fi

  while getopts "m::f::" opt "$@"; do
    case $opt in
      m)
        #echo "-m was triggered, Parameter: $OPTARG" >&2
        MESSAGE_FROM_CLI=$OPTARG
        ;;
      f)
        #echo "-f was triggered, Parameter: $OPTARG" >&2
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
  
  if [[ ! -z $MESSAGE_FROM_CLI ]] ; then
    echo "Text Message from CLI = [$MESSAGE_FROM_CLI]"
  fi
  
  if [[ ! -z $JSON_MESSAGE_FILE_NAME_FROM_CLI ]] ; then
    echo "JSON Message file name from CLI = [$JSON_MESSAGE_FILE_NAME_FROM_CLI]"
  fi
  
  if [[ -z $MESSAGE_FROM_CLI && -z $JSON_MESSAGE_FILE_NAME_FROM_CLI ]] ; then
    echo "No message to publish - [$USAGE]"
  fi
  
}

getParamsFromCli $@

echo
echo "# arguments called with ---->  ${@}     "
echo "# \$1 ---------------------->  $1       "
echo "# \$2 ---------------------->  $2       "
echo "# \$3 ---------------------->  $3       "
echo "# \$4 ---------------------->  $4       "
echo "# \$5 ---------------------->  $5       "
echo "# path to me --------------->  ${0}     "
echo "# parent path -------------->  ${0%/*}  "
echo "# my name ------------------>  ${0##*/} "
echo




exit 0