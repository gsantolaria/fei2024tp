#!/bin/bash

cd /usr/app

if [ ! -f manage.py ]; then
   django-admin startproject myapp .
fi

sleep 3

python manage.py makemigrations
python manage.py migrate --noinput

if [[ ! -z "${DJANGO_SUPERUSER_USERNAME}" ]]; then
  echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() or User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD') " | python manage.py shell
fi

python manage.py runserver 0.0.0.0:8000