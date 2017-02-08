# Django React/Redux Base Project with React Hot Reload

Heavily based on [django-react-redux-base](https://github.com/Seedstars/django-react-redux-base), but with a different folder structure and [React Hot Loader](https://github.com/gaearon/react-hot-loader).

## Quickstart

```
# Install SCSS linter
sudo gem install scss_lint -v 0.45.0

# Install Python 3.4.3
brew install pyenv
pyenv install 3.4.3

# Create a virtualenv to encapsulate Python dependencies
virtualenv -p ~/.pyenv/versions/3.4.3/bin/python3.4 .venv
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements/dev.txt

# Copy over enviornment file and point it to the MySQL database
cp .env.example .env

# Migrate and load in a default user
python manage.py migrate
python manage.py loaddata fixtures.json

# Install front end dependencies
yarn

# Run front end
npm run dev

# Run back end
python manage.py runserver
```
