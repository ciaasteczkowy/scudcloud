SOURCE="scudcloud-1.0"
INSTALL="/opt/scudcloud"
sudo mkdir -p $INSTALL/lib
sudo mkdir -p $INSTALL/resources
sudo cp $SOURCE/lib/*.py $INSTALL/lib
sudo cp $SOURCE/resources/* $INSTALL/resources
sudo cp $SOURCE/scudcloud $INSTALL
sudo cp $SOURCE/LICENSE $INSTALL
sudo cp $SOURCE/scudcloud.desktop /usr/share/applications
sudo cp $SOURCE/systray/hicolor/* /usr/share/icons/hicolor/scalable/apps
#sudo cp $SOURCE/systray/mono-dark/* /usr/share/icons/mono-dark/scalable/apps
#sudo cp $SOURCE/systray/mono-light/* /usr/share/icons/mono-light/scalable/apps
sudo ln -sf $INSTALL/scudcloud /usr/bin/scudcloud
