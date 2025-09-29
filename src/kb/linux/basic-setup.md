# Basic Setup

Stuff that I always have to look up when setting up a new Ubuntu server. Your mileage may vary depending on your use
case or specific linux distro being used!

## Secure SSH

Add your public key to `~/.ssh/authorized_keys`

Edit `/etc/ssh/sshd_config` and make sure `PasswordAuthentication no` is set in the file.

## Firewall

Make sure the server is only accessible over the protocols we are expecting

```shell
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

## Automatic Security Updates

```shell
apt install --yes unattended-upgrades
systemctl start unattended-upgrades
```

## Adding a User

```shell
adduser natalie
groups natalie # show groups she's a part of
usemod -aG sudo natalie
```

## Install Tailscale

```shell
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale set --ssh
```

## Install Docker

Taken from the [official documentation](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository):

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# Install the latest docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Install Node

Per [NodeSource](https://nodesource.com/products/distributions)

```shell
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

## Starship

Installation for the prettiest shell prompt of them all, [Starship](https://starship.rs) ✨:

```shell
curl -sS https://starship.rs/install.sh | sh
starship preset pastel-powerline -o ~/.config/starship.toml
```

Make sure to add `eval "$(starship init bash)"` to `~/.bashrc`

And copy in our modified [Pastel Powerline theme](/dotfiles/#starship)

## Dotfiles

- Add [~/.vimrc](/dotfiles#vim)
- Add [~/.gitconfig](/dotfiles#git)

## Default editor

Use the following command to set the system's default editor to vim if required

```shell
sudo update-alternatives --config editor
```
