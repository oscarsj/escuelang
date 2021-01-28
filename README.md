# README #

### Django + React version of escueladefutbol app ###

Following [this post](https://www.valentinog.com/blog/drf/)

### Dev env set up ###

* Build a development environment
- Create a database in the docker volume:
```
docker-compose run mysql
docker ps # write down container <hash> 
docker exec -it <hash> mysql -h mysql -u root
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
Create django supersuser:
```
docker-compose run --rm escuela python escuelang/manage.py createsuperuser
```
- Check logs:
```
docker-compose logs -f escuela
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
