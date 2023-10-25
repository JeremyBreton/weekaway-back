-- SQLBook: Code
BEGIN;

DO $$ 
DECLARE 
    tbl_name text;
    exists boolean;
BEGIN 
    FOREACH tbl_name IN ARRAY ARRAY['user', 'event', 'theme', 'eventdate', 'userchoice', 'user_has_event']
    LOOP
        SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = tbl_name
        ) INTO exists;

        IF exists THEN
            EXECUTE format('SELECT * FROM %I LIMIT 1', tbl_name);
            RAISE NOTICE E'\033[32mChecked : %\033[0m', tbl_name;
        ELSE
            RAISE NOTICE E'\033[31mALERT NOT FOUND : %\033[0m', tbl_name;
        END IF;
    END LOOP;
END $$;


--SELECT * FROM user LIMIT 1;
--SELECT * FROM event LIMIT 1;
--SELECT * FROM theme LIMIT 1;
--SELECT * FROM eventdate LIMIT 1;
--SELECT * FROM userchoice LIMIT 1;
--SELECT * FROM user_has_event LIMIT 1;
ROLLBACK;

