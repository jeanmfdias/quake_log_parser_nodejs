#!/usr/bin/env bash

echo 'adding swap file'
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap defaults 0 0' >> /etc/fstab

echo 'updating system'
sudo apt-get update
sudo apt-get upgrade -y

echo 'install development environment'
# nodejs version 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Set PT-BR
sudo apt-get install language-pack-pt
sudo locale-gen pt_BR.UTF-8

echo 'done, all set'
