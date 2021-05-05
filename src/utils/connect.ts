import mysql from 'mysql';
import { msyqlConfig } from '../config';

export const connection = mysql.createConnection(msyqlConfig);
connection.connect(() => {
    console.log('mysql connect success!');
});
