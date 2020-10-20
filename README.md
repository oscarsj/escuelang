# README #

### Django + React version of escueladefutbol app ###

Following [this post](https://www.valentinog.com/blog/drf/)

### Dev env set up ###

* Build a development environment
- Add to your /etc/hosts:
```
127.0.0.1 mysql
```
- Create a database in the docker volume:
```
docker-compose run mysql
mysql -h mysql -u root
create database escuela;
```
- Populate it with django models
```
docker-compose run escuela python escuelang/manage.py migrate
```
- Run the app:
```
docker-compose up -d
```

- Connect to localhost:8080
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
