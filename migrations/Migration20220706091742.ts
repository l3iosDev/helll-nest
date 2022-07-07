import { Migration } from '@mikro-orm/migrations';

export class Migration20220706091742 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" add column "image" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category" drop column "image";');
  }

}
