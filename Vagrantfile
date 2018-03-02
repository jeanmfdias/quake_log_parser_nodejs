# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/xenial64"

  config.vm.hostname = "test-jean-dias-dev-box"

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.synced_folder ".", "/vagrant"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision "shell", path: 'bootstrap.sh', keep_color: true
end
