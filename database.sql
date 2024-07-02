-- User table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "password" VARCHAR(1000) NOT NULL,
    "schwab_user" VARCHAR(200) UNIQUE
);

-- Scanner table
CREATE TABLE "scanner_table" (
    "scan_id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("id"),
    "scan_date" TIMESTAMP NOT NULL,
    "ticker" VARCHAR(100) NOT NULL,
    "volume" INT NOT NULL,
    "market_cap" INT NOT NULL,
    "strike" DECIMAL(10, 2) NOT NULL,
    "bid" DECIMAL(10, 2) NOT NULL,
    "ask" DECIMAL(10, 2) NOT NULL,
    "otm_percent" DECIMAL(5, 2) NOT NULL,
    "expiry" DATE NOT NULL
);

-- Notes table
CREATE TABLE "notes_table" (
    "note_id" SERIAL PRIMARY KEY,
    "openpos_id" INT REFERENCES "options_positions_table"("positions_id"),
    "note" VARCHAR(9999) NOT NULL,
    "note_created" TIMESTAMP NOT NULL
);

-- Options positions table
CREATE TABLE "options_positions_table" (
    "positions_id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("id"),
    "ticker" VARCHAR(1000) NOT NULL,
    "contracts" INT NOT NULL,
    "strike" INT NOT NULL,
    "expiry" DATE NOT NULL,
    "initial_premia" INT NOT NULL,
    "initial_potm" INT NOT NULL,
    "entry_date" DATE NOT NULL,
    "initial_underlying_price" INT NOT NULL
);

-- Adding foreign key constraints explicitly (if not included in the table definition)
ALTER TABLE "scanner_table" ADD CONSTRAINT "scanner_table_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "notes_table" ADD CONSTRAINT "notes_table_fk1" FOREIGN KEY ("openpos_id") REFERENCES "options_positions_table"("positions_id");
ALTER TABLE "options_positions_table" ADD CONSTRAINT "options_positions_table_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
z
-- User Table
INSERT INTO "user" ("username", "password", "schwab_user")
VALUES
    ('miles_davis', 'trumpet123', 'miles_schwab'),
    ('john_coltrane', 'saxophone456', 'john_schwab'),
    ('charlie_parker', 'birdIsTheWord789', 'charlie_schwab');

-- Scanner Table
INSERT INTO "scanner_table" ("user_id", "scan_date", "ticker", "volume", "market_cap", "strike", "bid", "ask", "otm_percent", "expiry")
VALUES
    (1, '2024-06-25 10:00:00', 'DIZ', 500, 1000000, 80.25, 79.75, 80.50, 12.50, '2024-07-15'),
    (2, '2024-06-25 11:30:00', 'TRN', 300, 750000, 120.00, 119.50, 120.75, 8.75, '2024-08-20'),
    (3, '2024-06-25 09:45:00', 'LKY', 400, 900000, 110.50, 110.00, 111.00, 10.25, '2024-09-15');

-- Notes Table
INSERT INTO "notes_table" ("openpos_id", "note", "note_created")
VALUES
    (1, 'Considering bullish options strategy.', '2024-06-25 10:15:00'),
    (2, 'Noted significant movement in underlying stock.', '2024-06-25 12:00:00'),
    (3, 'Reviewing options for hedging positions.', '2024-06-25 09:30:00');

-- Options Positions Table
INSERT INTO "options_positions_table" ("user_id", "ticker", "contracts", "strike", "expiry", "initial_premia", "initial_potm", "entry_date", "initial_underlying_price")
VALUES
    (1, 'DIZ', 5, 85, '2024-07-15', 1500, 15, '2024-06-20', 82),
    (2, 'TRN', 3, 125, '2024-08-20', 2200, 10, '2024-06-18', 120),
    (3, 'LKY', 4, 115, '2024-09-15', 1800, 12, '2024-06-22', 112);

-- Check inserted data
SELECT * FROM "user";
SELECT * FROM "options_positions_table";
SELECT * FROM "scanner_table";
SELECT * FROM "notes_table";

    SELECT 
      "notes_table"."note_id", 
      "notes_table"."note", 
      "notes_table"."note_created", 
      "options_positions_table"."entry_date",
      "options_positions_table"."ticker", 
      "options_positions_table"."contracts", 
      "options_positions_table"."strike", 
      "options_positions_table"."expiry"
    FROM 
      "notes_table"
    JOIN 
      "options_positions_table" ON "notes_table"."openpos_id" = "options_positions_table"."positions_id"
    JOIN 
      "user" ON  "options_positions_table"."user_id" = "user"."id"
    	WHERE "options_positions_table"."user_id" = 1
    		ORDER BY "options_positions_table"."ticker" ASC;
      
      SELECT "notes_table".*, "options_positions_table"."ticker", "options_positions_table"."entry_date"
       FROM "notes_table"
       JOIN "options_positions_table" ON "notes_table"."openpos_id" = "options_positions_table"."positions_id"
              WHERE "options_positions_table"."user_id" = 1;


     SELECT 
     	"entry_date",
     	"ticker", 
      	"contracts", 
   		"strike", 
  		"expiry",
		"initial_premia",
		"initial_potm",
		"initial_underlying_price",
   		"user_id"
      
    FROM 
      "options_positions_table"
      ORDER BY "ticker" ASC;
    JOIN 
      "options_positions_table" ON "notes_table"."openpos_id" = "options_positions_table"."positions_id"
    JOIN 
      "user" ON  "options_positions_table"."user_id" = "user"."id"

    