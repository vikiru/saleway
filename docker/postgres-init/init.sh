#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 \
	-v cart_password="${CART_DB_PASSWORD}" \
	-v order_password="${ORDER_DB_PASSWORD}" \
	-v product_password="${PRODUCT_DB_PASSWORD}" \
	-v rating_password="${RATING_DB_PASSWORD}" \
	-v user_password="${USER_DB_PASSWORD}" \
	--username "$POSTGRES_USER" <<-EOSQL
		    -- Cart database
		    CREATE DATABASE cart_db;
		    CREATE USER cart_user WITH PASSWORD :'cart_password';
		    GRANT ALL PRIVILEGES ON DATABASE cart_db TO cart_user;
		    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cart_user;

		    -- Order database
		    CREATE DATABASE order_db;
		    CREATE USER order_user WITH PASSWORD :'order_password';
		    GRANT ALL PRIVILEGES ON DATABASE order_db TO order_user;
		    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO order_user;

		    -- Product database
		    CREATE DATABASE product_db;
		    CREATE USER product_user WITH PASSWORD :'product_password';
		    GRANT ALL PRIVILEGES ON DATABASE product_db TO product_user;
		    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO product_user;

		    -- Rating database
		    CREATE DATABASE rating_db;
		    CREATE USER rating_user WITH PASSWORD :'rating_password';
		    GRANT ALL PRIVILEGES ON DATABASE rating_db TO rating_user;
		    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO rating_user;

		    -- User database
		    CREATE DATABASE user_db;
		    CREATE USER user_service WITH PASSWORD :'user_password';
		    GRANT ALL PRIVILEGES ON DATABASE user_db TO user_service;
		    -- Grant schema permissions (required for migrations)
		GRANT CREATE ON SCHEMA public TO cart_user;
		GRANT CREATE ON SCHEMA public TO order_user;
		GRANT CREATE ON SCHEMA public TO product_user;
		GRANT CREATE ON SCHEMA public TO rating_user;
		GRANT CREATE ON SCHEMA public TO user_service;
	EOSQL
