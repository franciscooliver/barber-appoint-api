import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddComplement1799999999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('complement', [
            new TableColumn({
                name: 'complement',
                type: 'varchar',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('addresses', ['complement']);
    }
}
