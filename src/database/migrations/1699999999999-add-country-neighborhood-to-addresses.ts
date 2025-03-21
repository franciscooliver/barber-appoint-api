import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCountryNeighborhoodToAddresses1699999999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('addresses', [
            new TableColumn({
                name: 'country',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'neighborhood',
                type: 'varchar',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('addresses', ['country', 'neighborhood']);
    }
}
