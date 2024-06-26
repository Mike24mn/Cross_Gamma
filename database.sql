-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL,
    schwab_user VARCHAR(200) UNIQUE
);

CREATE TABLE "scanner_table" (
    scan_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "users"(id),
    scan_date TIMESTAMP NOT NULL,
    ticker VARCHAR(100) NOT NULL,
    volume INT NOT NULL,
    market_cap INT NOT NULL,
    strike DECIMAL(10, 2) NOT NULL,
    bid DECIMAL(10, 2) NOT NULL,
    ask DECIMAL(10, 2) NOT NULL,
    otm_percent DECIMAL(5, 2) NOT NULL,
    expiry DATE NOT NULL
);

CREATE TABLE "notes_table" (
    note_id SERIAL PRIMARY KEY,
    openpos_id INT REFERENCES "options_positions_table"(positions_id),
    note VARCHAR(9999) NOT NULL,
    note_created TIMESTAMP NOT NULL,
    pos_entry_date DATE NOT NULL
);

CREATE TABLE "options_positions_table" (
    positions_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "users"(id),
    ticker VARCHAR(1000) NOT NULL,
    contracts INT NOT NULL,
    strike INT NOT NULL,
    expiry DATE NOT NULL,
    initial_premia INT NOT NULL,
    initial_potm INT NOT NULL,
    entry_date DATE NOT NULL,
    initial_underlying_price INT NOT NULL
);

ALTER TABLE "Scanner_Table" ADD CONSTRAINT "Scanner_Table_fk1" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Notes_Table" ADD CONSTRAINT "Notes_Table_fk1" FOREIGN KEY ("openpos_id") REFERENCES "Options_Positions_Table"("positions_id");
ALTER TABLE "Options_Positions_Table" ADD CONSTRAINT "Options_Positions_Table_fk1" FOREIGN KEY ("user_id") REFERENCES "Users"("id");