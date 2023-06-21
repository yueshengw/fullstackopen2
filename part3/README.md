Class link: https://p3class.onrender.com/
Settings:
Root Directory: part3/class/backend/
Build Command: npm run deploy:full
Start Command: npm start

Phonebook link: https://p3exercise.onrender.com/
Settings:
Root Directory: part3/class/
Build Command: npm --prefix ./phonebook-backend run deploy:full
Start Command: npm --prefix ./phonebook-backend start

Note: Since the builds are idempotent, I chose to have Render handle the build process.