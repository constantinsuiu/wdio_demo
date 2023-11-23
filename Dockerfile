FROM node:16.15.0

RUN apt-get update \
  && apt-get install default-jre -y \
  && apt-get install default-jdk -y \
  & apt-get install -y wget \
  & wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  & apt-get install -y ./google-chrome-stable_current_amd64.deb
