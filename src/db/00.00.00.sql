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
