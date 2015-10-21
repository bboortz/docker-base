set -u

export ABSOLUTE_PATH=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)/`basename "${BASH_SOURCE[0]}"`
export DOCKER_TOOLS_PATH="$( readlink -f ${ABSOLUTE_PATH%/*} )"
export DOCKER_BASE_PATH="${DOCKER_TOOLS_PATH%/*}"
export DOCKER_BIN_PATH="${DOCKER_BASE_PATH}/bin"
export DOCKER_IMAGES_PATH="${DOCKER_BASE_PATH}/images"
export DOCKER_MOUNTPOINTS_PATH="${DOCKER_BASE_PATH}/mount_points"

