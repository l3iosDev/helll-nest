import { Migration } from '@mikro-orm/migrations';

export class Migration20220707073055 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" add column "image" varchar(255) null;');
    this.addSql('alter table "category" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "category" alter column "updated_at" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "category" alter column "updated_at" set not null;');
    this.addSql('alter table "category" drop column "image";');
  }

}
