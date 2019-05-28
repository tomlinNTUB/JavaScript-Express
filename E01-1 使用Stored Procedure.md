# E01-1 使用Stored Procedure


### (1)
```
CREATE OR REPLACE FUNCTION proc1()
RETURNS integer AS $$
DECLARE
    total integer;
BEGIN
    SELECT count(*) into total FROM customer;
    RETURN total;
END;
$$ LANGUAGE plpgsql;
```

```
select proc3()
```

### (2)
```
CREATE OR REPLACE FUNCTION proc2()
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
```
select proc2()
```

### (3)
```
CREATE OR REPLACE FUNCTION proc3(
   OUT procnt NUMERIC,
   OUT empcnt NUMERIC)
AS $$

BEGIN
   select count(*) into procnt from product;
   select count(*) into empcnt from employee;
END; $$
 
LANGUAGE plpgsql;;
```

```
select * from proc3()
```
