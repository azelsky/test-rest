CREATE TABLE accounts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)
);

CREATE TABLE waiters(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    account_id UUID REFERENCES accounts (id)
);

CREATE TABLE tables(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    num INTEGER,
    account_id UUID REFERENCES accounts (id)
);

CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    approved BOOLEAN,
    table_id UUID REFERENCES tables (id)
);

CREATE TABLE waiter_table_assignment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_id UUID REFERENCES tables (id),
    waiter_id UUID REFERENCES waiters (id)
);

INSERT INTO accounts (name) VALUES ('SUSHI HOUSE');

INSERT INTO
    waiters (name, account_id)
VALUES
    ('Sofia', '8de0588d-68bd-4712-abf9-9291864ccb23'),
    ('Yana', '8de0588d-68bd-4712-abf9-9291864ccb23');

INSERT INTO
    tables (num, account_id)
VALUES
    (1, '8de0588d-68bd-4712-abf9-9291864ccb23'),
    (2, '8de0588d-68bd-4712-abf9-9291864ccb23');

INSERT INTO
    waiter_table_assignment (table_id, waiter_id)
VALUES
    ('44885c03-1337-4d87-aef9-a8aee824c4c3', '7366dde2-d1d0-4894-adcf-5823362bfdb4'),
    ('b788fd8b-6139-481d-9bf5-0b89d8c27bf9', 'bfd64406-ea7b-48fb-a466-9bddf817e303');

UPDATE waiter set name = 'Maria' where id = 2

SELECT waiter.id AS id
            FROM waiter
            JOIN table_of_waiter as t_o_w on waiter.id = t_o_w.waiter_id
            WHERE table_id = '422a76c9-24c8-417f-a37b-5532fbbecb11';

ALTER TABLE guest ADD COLUMN approved BOOLEAN DEFAULT FALSE;

ALTER TABLE res_table RENAME TO res_tables;
ALTER TABLE waiter RENAME TO waiters;
ALTER TABLE account RENAME TO accounts;
ALTER TABLE table_of_waiter RENAME TO waiter_table_assignment;
INSERT INTO
    guests(name, table_id)
VALUES
    ('Vasja', '422a76c9-24c8-417f-a37b-5532fbbecb11')
RETURNING *
