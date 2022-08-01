CREATE TABLE IF NOT EXISTS users (
    userial BIGSERIAL PRIMARY KEY,
    uid UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    email_address TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    date_time_created TIMESTAMP(6) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    pserial BIGSERIAL PRIMARY KEY,
    pid UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    date_time_created TIMESTAMP(6) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS database_versions (
    dbvid BIGSERIAL PRIMARY KEY,
    major BIGINT NOT NULL,
    minor BIGINT NOT NULL,
    patch BIGINT NOT NULL,
    description TEXT NOT NULL,
    date_applied TIMESTAMP(6) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO database_versions (
    major,
    minor,
    patch,
    description
) VALUES (
    0,
    0,
    0,
    'Initial schema'
);
