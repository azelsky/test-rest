create Table accounts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)
);

create Table waiters(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    account_id UUID REFERENCES account (id)
);

create Table tables(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    num INTEGER,
    account_id UUID REFERENCES account (id)
);

create Table guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    approved BOOLEAN,
    table_id UUID REFERENCES res_table (id)
);

create Table waiter_table_assignment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_id UUID REFERENCES res_table (id),
    waiter_id UUID REFERENCES waiter (id)
);

INSERT INTO account (name) VALUES ('SUSHI HOUSE');

INSERT INTO
    waiter (name, account_id)
VALUES
    ('Sofia', '7620e662-b61c-43bc-94c4-3607e640494f'),
    ('Yana', '7620e662-b61c-43bc-94c4-3607e640494f');

INSERT INTO
    res_table (num, account_id)
VALUES
    (1, '7620e662-b61c-43bc-94c4-3607e640494f'),
    (2, '7620e662-b61c-43bc-94c4-3607e640494f');

INSERT INTO
    table_of_waiter (table_id, waiter_id)
VALUES
    ('4b4b2a09-5d9f-46cd-99be-fbaa78e22a87', '6d3cee35-23b0-484a-955b-dc3acc7151f7'),
    ('422a76c9-24c8-417f-a37b-5532fbbecb11', 'a3483690-f194-4fc2-b364-879d92720842');

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
