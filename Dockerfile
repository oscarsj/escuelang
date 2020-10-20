FROM python:3.8-slim
RUN apt-get -y update && \
    apt-get install -y \
            build-essential \
            default-libmysqlclient-dev \
            python3-dev
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

CMD ["sh", "-c", "python escuelang/manage.py runserver 0.0.0.0:${PORT}"]