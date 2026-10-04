
with this:

```markdown
## Run locally

| Linux | Windows |
|---|---|
| <pre><code># 0. Check Node.js + npm<br>node --version<br>npm --version<br><br># 1. Install Node.js + npm<br><br># Fedora<br>sudo dnf install -y nodejs npm<br><br># Ubuntu / Debian<br>sudo apt update && sudo apt install -y nodejs npm<br><br># 2. Go to the downloaded folder<br>cd ~/Downloads/site-reputation<br><br># 3. Install the app requirements<br>npm install<br><br># 4. Start the app<br>npm run dev</code></pre> | <pre><code>:: 0. Check Node.js + npm<br>node --version<br>npm --version<br><br>:: 1. Install Node.js + npm<br>winget install OpenJS.NodeJS.LTS<br><br>:: 2. Go to the downloaded folder<br>cd %USERPROFILE%\Downloads\site-reputation<br><br>:: 3. Install the app requirements<br>npm install<br><br>:: 4. Start the app<br>npm run dev</code></pre> |
