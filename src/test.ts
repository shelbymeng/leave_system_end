import { connection } from './utils/connect';

function run() {
    const sql = `SELECT * from leavetable`;
    connection.query(sql, (error,result) => {
        console.log(`ML ~ file: test.ts ~ line 6 ~ connection.query ~ result`, JSON.stringify(result, null, 2));
    });
}
run();
