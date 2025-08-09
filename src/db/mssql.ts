import sql, { ConnectionPool } from 'mssql';

let pool: ConnectionPool | null = null;

export async function mssqlConnection(): Promise<ConnectionPool> {
  if (pool) return pool;

  try {
    pool = await sql.connect({
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      server: process.env.DB_SERVER as string,
      database: process.env.DB_NAME as string,
      port: 1433,
      options: {
        encrypt: false, 
        trustServerCertificate: true, 
      },
    });
    console.log("✅ MSSQL Connected");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed", err);
    throw err;
  }
}
