-- Create user with password from environment variable
CREATE ROLE "cinema-complex-admin" WITH LOGIN PASSWORD :'db_password';

-- Create database
CREATE DATABASE "cinema-complex"
    WITH 
    OWNER = "cinema-complex-admin"
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Grant all privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE "cinema-complex" TO "cinema-complex-admin";

-- Connect to the new database
\c "cinema-complex"

-- Grant schema privileges
ALTER DEFAULT PRIVILEGES FOR USER "cinema-complex-admin" IN SCHEMA public 
GRANT ALL ON TABLES TO "cinema-complex-admin";

ALTER DEFAULT PRIVILEGES FOR USER "cinema-complex-admin" IN SCHEMA public 
GRANT ALL ON SEQUENCES TO "cinema-complex-admin";

ALTER DEFAULT PRIVILEGES FOR USER "cinema-complex-admin" IN SCHEMA public 
GRANT ALL ON FUNCTIONS TO "cinema-complex-admin";

-- Grant schema usage
GRANT ALL ON SCHEMA public TO "cinema-complex-admin"; 
