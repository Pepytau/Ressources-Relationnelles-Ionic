sudo apt update && sudo apt upgrade
sudo apt install ca-certificates curl gnupg -y

echo "Updates and install done"

curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt update
sudo apt install gitlab-runner -y

echo "Gitlab Runner sucessfully installed"

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

echo "Docker successfully installed"

# Download the binary for your system
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Give it permission to execute
sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab Runner user
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

echo "Gitlab Runner user created"

# Install and run as a service
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start

echo "Gitlab Runner started"

sudo gitlab-runner register \
  --non-interactive \
  --url "http://192.168.50.4/" \
  --registration-token "glrt-Gx2Wa2fR3UgZbntpXy3S" \
  --executor "docker" \
  --docker-image alpine:latest \
  --description "docker-runner" \
  --tag-list "docker,alpine,linux" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"

echo "Gitlab Runner Registered"

gitlab-runner run

echo "Gitlab Runner running"
