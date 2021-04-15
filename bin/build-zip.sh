#!/usr/bin/env bash

# Exit if any command fails.
set -e

# Enable nicer messaging for build status.
BLUE_BOLD='\033[1;34m';
GREEN_BOLD='\033[1;32m';
RED_BOLD='\033[1;31m';
YELLOW_BOLD='\033[1;33m';
COLOR_RESET='\033[0m';
error () {
	echo -e "\n${RED_BOLD}$1${COLOR_RESET}\n"
}
status () {
	echo -e "\n${BLUE_BOLD}$1${COLOR_RESET}\n"
}
success () {
	echo -e "\n${GREEN_BOLD}$1${COLOR_RESET}\n"
}
warning () {
	echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}


status "💃 Time to build the plugin ZIP file 🕺"

if [ ! -d "artifact" ]; then
  mkdir "artifact"
fi


# Copy files for zip.
rsync -rc --exclude-from ".distignore" "./" "artifact/ultimate-addons-for-gutenberg"

# Go to directory
cd artifact

# Create a zip copied files.
zip -r ultimate-addons-for-gutenberg.zip "./ultimate-addons-for-gutenberg"

# Removed copied files folder.
rm -rf ultimate-addons-for-gutenberg

success "Done. Your UAG zip is ready..! 🎉"