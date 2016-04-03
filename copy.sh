#! /bin/sh

# Super quick way to get widget into my widgets folder.

DEST=~/mhulse/Dropbox/übersicht/widgets/shortcuts.widget

# Remove previous copy:
rm -rf $DEST

# Create the widget folder:
mkdir -p $DEST

# Copy non-hidden files to widget foler:
cp -rf ../shortcuts.widget/* $DEST

# Remove unwanted files:
rm $DEST/{copy.sh,README.md}
