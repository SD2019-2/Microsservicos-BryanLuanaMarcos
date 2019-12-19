FROM python:3

ENV PYTHONUNBUFFERED 1

COPY ./friends-service/requirements.txt /tmp
WORKDIR /tmp
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]