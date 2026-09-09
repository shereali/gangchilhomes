# Gangchil Homes (Luxury Real Estate Portal)

Full-stack production deployment of Gangchil Homes powered by Nuxt 3, Laravel 12 API, MySQL 8, Docker, and Caddy Reverse Proxy.

## 🌐 Production Environment
- **URL:** [https://gangchil.softcredible.com](https://gangchil.softcredible.com)
- **API Endpoint:** [https://gangchil.softcredible.com/api/properties](https://gangchil.softcredible.com/api/properties)
- **Target VPS:** `217.216.37.217`
- **Application User:** `gangchil`
- **Web Root:** `/var/www/gangchil`

## 🛠️ Stack Architecture
- **Frontend:** Nuxt 3 (SSR/SPA) on Node 22 (`gangchil-frontend-1` on port 3004 -> 3000)
- **Backend:** Laravel 12 with PHP 8.4-FPM + Nginx (`gangchil-backend-1` on port 8004 -> 8000)
- **Database:** MySQL 8 (`gangchil-db-1` on port 3306)
- **Reverse Proxy & SSL:** Central Caddy Gateway (`caddy_net`) with automated Let's Encrypt TLS.

## 🚀 CI/CD Automation
Any push to branch `main` automatically triggers the GitHub Actions deployment pipeline (`.github/workflows/deploy.yml`), pulling the latest changes and rebuilding containers with zero downtime.

## 📋 Common Operations (as `gangchil` user on VPS)
```bash
# View container status
docker compose -f /var/www/gangchil/docker-compose.yml ps

# View backend logs
docker compose -f /var/www/gangchil/docker-compose.yml logs -f backend

# View frontend logs
docker compose -f /var/www/gangchil/docker-compose.yml logs -f frontend

# View deployment log
tail -f /var/log/gangchil/deploy.log

# Run database migrations manually
docker compose -f /var/www/gangchil/docker-compose.yml exec backend php artisan migrate --force
```
