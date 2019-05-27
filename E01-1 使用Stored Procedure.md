# E01-1 使用Stored Procedure


### (1)
```
CREATE OR REPLACE FUNCTION totalRecords()
RETURNS integer AS $$
DECLARE
    total integer;
BEGIN
    SELECT count(*) into total FROM customer;
    RETURN total;
END;
$$ LANGUAGE plpgsql;
```

### (2)
```
CREATE OR REPLACE FUNCTION public.myprocedure()
RETURNS SETOF product
AS $$
DECLARE
    rs RECORD;
BEGIN
    FOR rs IN SELECT * FROM product loop
        IF rs.price > 100 THEN
            RETURN NEXT rs;
        END IF;  
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```
