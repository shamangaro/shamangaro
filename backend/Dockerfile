FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

RUN sed -i 's/\r$//' entrypoint.sh 2>/dev/null || true && chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
