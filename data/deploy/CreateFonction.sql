CREATE OR REPLACE FUNCTION delete_event_on_cascade("values" INT) RETURNS INT AS $$
DECLARE
    result INT;
BEGIN
    -- Suppression des enregistrements des différentes tables
    DELETE FROM "user_has_event" WHERE "user_has_event".event_id = values;
    DELETE FROM "userchoice" WHERE "userchoice".event_id = values;
    DELETE FROM "eventdate" WHERE "eventdate".event_id = values;
    DELETE FROM "event" WHERE "event".id = values;

    -- Récupérez le nombre de lignes supprimées
     GET DIAGNOSTICS result = ROW_COUNT;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_user_on_cascade("values" INT) RETURNS INT AS $$
DECLARE
    result INT;
BEGIN
    -- Suppression des enregistrements des différentes tables
    DELETE FROM "userchoice" 
        WHERE "userchoice".user_id = values;
    DELETE FROM "eventdate"
    WHERE "eventdate".event_id IN (
        SELECT id FROM "event" WHERE "event".owner_id = values
    );
    DELETE FROM "userchoice"
    WHERE "userchoice".event_id IN (
        SELECT id FROM "event" WHERE "event".owner_id = values
    );
    DELETE FROM "user_has_event" 
        WHERE "user_has_event".event_id IN (
            SELECT id FROM "event" WHERE "event".owner_id = values
        );
    DELETE FROM "user_has_event" 
        WHERE "user_has_event".user_id = values;
    DELETE FROM "event" 
        WHERE "event".owner_id = values;
    DELETE FROM "user"
        WHERE "user".id = values;

    -- Récupérez le nombre de lignes supprimées
     GET DIAGNOSTICS result = ROW_COUNT;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


