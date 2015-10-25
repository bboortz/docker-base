#!/bin/bash

. ${0%/*}/lib.bash

DIR=$1
IMAGE_NAME=${DIR##*/}


f_pull() {
	local lv_image="$1"

	echo
	echo "docker pull: $lv_image"
	docker pull $lv_image
}


f_build() {
	local lv_image="$1"
	local lv_dir="$2"

	cd $lv_dir

	# check local
	local lv_from=$( awk '/^FROM/ { gsub(/:.*/, "", $2); print $2 }' Dockerfile )
	local lv_from_dir="${DOCKER_IMAGES_PATH}/${lv_from}"
	if [ -d "${lv_from_dir}" ]; then
		f_build "$lv_from" "${lv_from_dir}"
	else
		f_pull "$lv_from"
	fi

	echo
	echo "docker build: $lv_image"
	docker build -t $lv_image .
}

f_build "$IMAGE_NAME" "$DIR"
