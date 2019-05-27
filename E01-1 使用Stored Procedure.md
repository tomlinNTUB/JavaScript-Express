# E01-1 使用Stored Procedure


### (1)
```
CREATE OR REPLACE FUNCTION totalRecords ()
RETURNS integer AS $total$
DECLARE
    total integer;
BEGIN
    SELECT count(*) into total FROM customer;
    RETURN total;
END;
$total$ LANGUAGE plpgsql;
```
