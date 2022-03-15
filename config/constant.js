module.exports = {
  HTTP_PORT: process.env.port || 8000, //TODO: create environments
  DBSOURCE: "db.sqlite",

  CREATE_MEDICINE_TABLE: `CREATE TABLE medicine(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        medID text,
        name text,
        description text,
        color text,
        deleted INT default 0
        )`,

  ADD_MEDICINE: `INSERT INTO medicine(medID,name,description,color) VALUES(?,?,?,?)`,
  GET_ALL_MEDICINES: `SELECT * FROM medicine`,
  GET_MEDICINE_BY_ID: `SELECT * FROM medicine WHERE medID=?`,
  UPDATE_MEDICINE: `UPDATE medicine set name=?, description=?, color=? where medID=?`,
  SOFT_DELETE_MEDICINE: `UPDATE medicine set deleted=1 where medID=?`,
  DELETE_MEDICINE: `DELETE FROM medicine WHERE medID=?`,

  CREATE_CUSTOMER_TABLE: `CREATE TABLE customer(
                            cID INTEGER PRIMARY KEY AUTOINCREMENT,
                            customerID text,
                            name text,
                            age INT,
                            contactNumber INT,
                            date text,
                            deleted INT default 0
                           )`,
  ADD_CUSTOMER: `INSERT INTO customer(customerID,name,age,contactNumber,date) VALUES(?,?,?,?,?)`,
  GET_ALL_CUSTOMER: `SELECT * FROM customer`,
  GET_CUSTOMER_BY_ID: `SELECT * FROM customer WHERE customerID=?`,
  UPDATE_CUSTOMER: `UPDATE customer set customerID=?, name=?, age=?, contactNumber=?, date=? where customerID=?`,
  SOFT_DELETE_CUSTOMER: `UPDATE customer set deleted=1 where customerID=?`,
  DELETE_CUSTOMER: `DELETE FROM customer WHERE customerID=?`,

  CREATE_USER_TABLE: `CREATE TABLE user(
        uID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID text,
        name text,
        age INT,
        contactNumber INT,
        email text,
        password text,
        role text
       )`,

  ADD_USER: `INSERT INTO user(userID,name,age,contactNumber,email, password,role) VALUES(?,?,?,?,?,?,?)`,
  GET_USER_BY_EMAIL: `SELECT * FROM user WHERE email = ?`,
  GET_ALL_USERS: `SELECT * FROM user`,
  GET_USER_BY_ID: `SELECT * FROM user WHERE userID = ?`,


  
  CREATE_CUSTOMERRECORD_TABLE: `CREATE TABLE customerRecords(
        crID INTEGER PRIMARY KEY AUTOINCREMENT,
        customerID text,
        medicines text,
        deleted INT default 0
       )`,
  ADD_CUSTOMER_RECORD: `INSERT INTO customerRecords(customerID,medicines) VALUES(?,?)`,
  GET_ALL_CUSTOMER_RECORDS: `SELECT * FROM customerRecords`,
  GET_CUSTOMER_RECORDS_BY_ID: `SELECT * FROM customerRecords WHERE customerID=?`,
  UPDATE_CUSTOMER_RECODS: `UPDATE customerRecords set customerID=?, medicines=?`,
  SOFT_DELETE_CUSTOMER_RECODS: `UPDATE customerRecords set deleted=1 where customerID=?`,
  DELETE_CUSTOMER_RECODS: `DELETE FROM customerRecords WHERE customerID=?`
};
