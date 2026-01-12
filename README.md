# 🚀 SWPRP - System Aplikacji

Środowisko deweloperskie oparte na Dockerze, składające się z Frontend, Backend (Spring Boot), Keycloak, PostgreSQL oraz MailHog.

## 📋 Wymagania

* Docker
* Docker Compose

## 🛠️ Instalacja i Uruchomienie

1.  **Utwórz plik `.env`** w głównym katalogu projektu i wklej poniższą zawartość (możesz zmienić wartości na własne):
    ```env
    PG_SWPRP_USER=promotor
    PG_SWPRP_PASS=superhaslo
    ```

2.  **Skonfiguruj adres IP (Ważne!)**
    W pliku `docker-compose.yml` w sekcji `backend` znajduje się zmienna:
    `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=http://192.168.55.104:8080/realms/swprp`
    
    > **Uwaga:** Upewnij się, że adres IP `192.168.55.104` odpowiada Twojemu lokalnemu adresowi IP komputera, aby Keycloak poprawnie komunikował się z przeglądarką i backendem.

3.  **Uruchom aplikację:**
    ```bash
    docker-compose up -d --build
    ```

## 🌐 Dostęp do usług

Po uruchomieniu kontenery są dostępne pod następującymi portami:

| Usługa | URL | Login / Hasło (Domyślne) | Opis |
| :--- | :--- | :--- | :--- |
| **Frontend** | [http://localhost:8088](http://localhost:8088) | - | Aplikacja kliencka |
| **Backend API** | [http://localhost:8081](http://localhost:8081) | - | Serwer Spring Boot |
| **Keycloak** | [http://localhost:8080](http://localhost:8080) | `admin` / `admin` | Zarządzanie tożsamością |
| **MailHog** | [http://localhost:8025](http://localhost:8025) | - | Podgląd e-maili deweloperskich |
| **Baza Danych** | `localhost:5432` | `swprp_user` / `swprp_password` | Główna baza danych aplikacji |

## 🗄️ Bazy Danych

System korzysta z dwóch instancji PostgreSQL:
* **Aplikacja:** `swprp-database` (dane aplikacji).
* **Keycloak:** `keycloak-database` (dane użytkowników i konfiguracja Keycloak).
