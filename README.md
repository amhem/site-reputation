# 0. Check Node.js + npm
node --version
npm --version

# 1. Install Node.js + npm
# Fedora
sudo dnf install -y nodejs npm

# Ubuntu / Debian
sudo apt update && sudo apt install -y nodejs npm

# 2. Go to the downloaded folder
cd ~/Downloads/site-reputation

# 3. Install the app requirements
npm install

# 4. Start the app
npm run dev
