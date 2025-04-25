import { DataSource } from 'typeorm';
import * as path from 'path';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'NewPassword',
  database: 'skillsync',
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'src/migrations', '**', '*.{ts,js}')],
  synchronize: false,
  logging: true,
});