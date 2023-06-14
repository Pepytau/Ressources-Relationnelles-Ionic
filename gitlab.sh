sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates perl

debconf-set-selections <<< "postfix postfix/mailname string bullseye64"
debconf-set-selections <<< "postfix postfix/main_mailer_type string 'Internet Site'"

sudo apt-get install -y --assume-yes postfix

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash

sudo EXTERNAL_URL="http://192.168.50.4" apt-get install gitlab-ee

