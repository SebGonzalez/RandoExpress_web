FROM node:10.9.0

# Create a directory where our app will be placed
#RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY ./RandoExpress_web/package.json /app/package.json

# Install dependecies
#RUN npm audit fix
RUN npm install
RUN npm install -g @angular/cli@8.3.20

# Get all the code needed to run the app
COPY ./RandoExpress_web/ /app

# Expose the port the app runs in
EXPOSE 4200

CMD ng serve --host 0.0.0.0