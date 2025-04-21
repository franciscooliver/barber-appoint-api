import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUfToAddresses1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add column with default value
        await queryRunner.addColumn('addresses', 
            new TableColumn({
                name: 'uf',
                type: 'varchar',
                length: '2',
                default: "'SP'", // Set a default value
                isNullable: true, // Temporarily allow null
            })
        );

        // Update existing records
        await queryRunner.query(`
            UPDATE addresses 
            SET uf = UPPER(SUBSTRING(state, 1, 2))
            WHERE uf IS NULL;
        `);

        // Make column not nullable after update
        await queryRunner.query(`
            ALTER TABLE addresses 
            ALTER COLUMN uf SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('addresses', 'uf');
    }
}
