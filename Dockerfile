FROM python:2.7.14-onbuild

CMD ["sh", "-c", "python wsgi/openshift/manage.py runserver 0.0.0.0:${PORT}"]