# Etapa de compilación
FROM golang:1.25 AS builder

WORKDIR /app

# Copiar dependencias primero
COPY go.mod go.sum ./
RUN go mod download

# Copiar el resto del código
COPY . .

# Compilar binario
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# Etapa final (imagen mínima)
FROM alpine:3.20
WORKDIR /app

COPY --from=builder /app/server .

# Puerto del servidor Go
EXPOSE 8081

CMD ["./server"]