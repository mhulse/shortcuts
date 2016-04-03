#! /bin/sh

# Super quick way to get widget into my widgets folder.

DEST=/Volumes/storage/Users/mhulse/Dropbox/übersicht/widgets/shortcuts.widget

rm -rf $DEST

mkdir -p $DEST

cp -rf ../shortcuts.widget/* $DEST

rm $DEST/{copy.sh,README.md}
