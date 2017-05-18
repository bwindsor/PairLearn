Vagrant.configure("2") do |config|
  config.vm.box = "debian/contrib-jessie64"

  # This would allow public access to port 8080 on the host
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # This only allows local access to the host
  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 5858, host: 5858, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "private_network", type: "dhcp"
  
  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "./code", "/home/vagrant/code", type: "rsync", rsync__auto: true
  config.vm.synced_folder ".", "/home/vagrant/code"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
    # Customize the amount of memory on the VM:
    vb.memory = "512"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
	apt-get install -y curl
	curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	apt-get install -y nodejs
	
	ROOT_PASS=rootpass123
	debconf-set-selections <<< 'mysql-server mysql-server/root_password password '$ROOT_PASS
	debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password '$ROOT_PASS
	apt-get -y install mysql-server
	
  SHELL
end
