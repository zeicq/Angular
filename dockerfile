# Użyj oficjalnego obrazu Node jako obrazu bazowego
FROM node:latest AS builder

# Ustaw katalog roboczy w obrazie na /app
WORKDIR /app

# Skopiuj pliki aplikacji do obrazu
COPY . .

# Zainstaluj zależności i zbuduj aplikację
RUN npm install
RUN npm run build -- --configuration=production


# Użyj obrazu nginx jako obrazu bazowego dla finalnego obrazu
FROM nginx:latest

# Skopiuj pliki zbudowanej aplikacji do obrazu nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/
