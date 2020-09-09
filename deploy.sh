#!/usr/bin/env bash

SRC=/Users/hayden/MEGA/projects/current/battery-monitor/battery-monitor-server/
REMOTE=pi@10.0.0.253
DEST=/home/pi/MEGA/projects/battery-monitor/battery-monitor-server/

rsync -av --progress --delete --exclude='/.git' --filter="dir-merge,- .gitignore" ${SRC} ${REMOTE}:${DEST}
