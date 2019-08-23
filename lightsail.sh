
#! /bin/bash
sudo /opt/bitnami/ctlscript.sh stop apache
sudo mv /opt/bitnami/apache2/scripts/ctl.sh /opt/bitnami/apache2/scripts/ctl.sh.disabled

cd /home/bitnami
sudo git clone https://github.com/Bumhe/ecwa-frontend.git
cd /home/bitnami/ecwa-frontend
sudo npm install 

sudo cat << EOF >> /home/bitnami/ecwa-frontend/.env
PORT=80
