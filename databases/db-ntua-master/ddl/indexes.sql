create index idx1 on Products(Barcode,Name);
create index idx2 on Customer(Card, Date_of_birth);
create index idx3 on Transaction(Card, Date_time);
create index idx4 on TransactionContainsProduct(Barcode);
