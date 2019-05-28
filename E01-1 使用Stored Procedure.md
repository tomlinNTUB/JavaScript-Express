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
select proc1()
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


### (4)
```
CREATE OR REPLACE FUNCTION proc4()
    RETURNS integer
    LANGUAGE plpgsql
AS $$
    declare 
        cur cursor for select * from product where price>100;		
        tot integer;
    BEGIN		 
        tot:=0;
	
        for currentRow in cur loop
            tot := tot + currentRow.price;
        end loop;
	   
        return tot;
    END;
$$;
```

```
select proc4()
```
