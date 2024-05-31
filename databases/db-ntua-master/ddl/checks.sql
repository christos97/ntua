create trigger check_1
before insert on Stores
for each row
begin
if not (new.Size_ > 0) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Store Size cant be zero or negative';
end if;
end
create trigger check_2
before insert on Stores
for each row
begin
if not (new.Store_id >= 1) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Store id must be greater than 0';
end if;
end
create trigger check_3
before insert on Customer
for each row
begin
if not (new.Family_members > 0 )then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Family members cant be negative';
end if;
end
create trigger check_4
before insert on Customer
for each row
begin
if not (new.Points >= 0) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Points cant be nagative';
end if;
end
create trigger check_5
before insert on Products
for each row
begin
if not (new.Price > 0) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Price must be greater than zero';
end if;
end
create trigger check_6
before insert on Products
for each row
begin
if not (new.Store_label in (0,1)) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Store label must be 0 or 1';
end if;
end
create trigger check_7
before insert on HadOlderPrice
for each row
begin
if not (new.Start_date < new.End_date) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Start date must be before end date';
end if;
end
create trigger check_8
before insert on HadOlderPrice
for each row
begin
if not (new.Price > 0) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Price must be greater than zero';
end if;
end
create trigger check_9
before insert on Transaction
for each row
begin
if not (new.Total_piecies >= 0)then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Total Piecies must be greater than 0';
end if;
end
create trigger check_10
before insert on Transaction
for each row
begin
if not (new.Payment_method in ('Cash','Credit card')) then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Payment method should be Cash or Credit Card';
end if;
end
create trigger check_11
before insert on Transaction
for each row
begin
if not (new.Total_amount >= 0)then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Total amount should be greater than 0';
end if;
end