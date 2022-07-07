import { Migration } from '@mikro-orm/migrations';

export class Migration20220706091512 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "name" varchar(200) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "category" add constraint "category_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "category" cascade;');
  }

}
