FROM ubuntu:bionic

ENV LANG C.UTF-8
ARG DEBIAN_FRONTEND=noninteractive
# Allow SECRET_KEY to be passed via arg so collectstatic can run during build time
ARG SECRET_KEY

# libpq-dev and python3-dev help with psycopg2
RUN apt-get update --fix-missing\
  && apt-get install -y python3.7-dev python3-pip libpq-dev curl \
  && apt-get clean all \
  && rm -rf /var/lib/apt/lists/*
  # You can add additional steps to the build by appending commands down here using the
  # format `&& <command>`. Remember to add a `\` at the end of LOC 12.
  # WARNING: Changes to this file may cause unexpected behaviors when building the app.
  # Change it at your own risk.

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y yarn

WORKDIR /opt/webapp
COPY . .

WORKDIR /opt/webapp/front-end
RUN yarn install && yarn build

WORKDIR /opt/webapp
RUN pip3 install --no-cache-dir -q 'pipenv==2018.11.26' && pipenv install --deploy --system
RUN python3 manage.py collectstatic --no-input
RUN python3 manage.py migrate
RUN python3 manage.py loaddata ./fixtures/building_types.json

# Run the image as a non-root user
RUN adduser --disabled-password --gecos "" django
USER django

# Run the web server on port $PORT
CMD waitress-serve --port=$PORT caltana_web_27973.wsgi:application
