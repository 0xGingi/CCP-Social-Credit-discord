FROM python:3.11-slim
RUN apt-get update && apt-get install -y git
WORKDIR /
ADD . /
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "main.py"]