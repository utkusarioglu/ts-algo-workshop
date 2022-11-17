#!/bin/bash

main() {
  type=$1
  case $type in
    all)
      rm -rf lib node_modules .tsbuildinfo types
    ;;

    build)
      rm -rf lib .tsbuildinfo types
    ;;

    dependencies)
      rm -rf node_modules
    ;;

    *)
      echo "Error: Unrecognized clean type"
      exit 1
      ;;
  esac
}

main $1
