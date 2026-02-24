import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDb = async () => {
    let connection;
    try {
        console.log('🔄 Connecting to database...');
        // Connect without database selected to create it if needed
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true
        });

        console.log('📄 Reading schema file...');
        const schemaPath = path.join(__dirname, '../../database.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('🚀 Executing schema...');
        await connection.query(schema);

        console.log('✅ Database initialized successfully!');
        console.log('   - Tables created: Users, Venues, Bookings');
        console.log('   - Seed data inserted');

    } catch (error) {
        console.error('❌ Database initialization failed:', error);
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
};

initDb();
