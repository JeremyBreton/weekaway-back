-- Revert migration:createTable from pg

BEGIN;

DROP TABLE IF EXISTS users_has_event;
DROP TABLE IF EXISTS USERCHOICE;
DROP TABLE IF EXISTS EVENTDATE;
DROP TABLE IF EXISTS THEME;
DROP TABLE IF EXISTS EVENT;
DROP TABLE IF EXISTS "user";

COMMIT;
