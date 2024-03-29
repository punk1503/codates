FROM python:3.10-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV IS_PRODUCTION TRUE
WORKDIR /app
COPY . /app/
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "back.asgi:application"]
