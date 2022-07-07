import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field()
  @Property({ columnType: 'varchar(200)', unique: true })
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  image?: string;

  @Field()
  @Property()
  createdAt: Date = new Date();

  @Field({ nullable: true })
  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  constructor(name: string, image?: string) {
    this.name = name;
    this.image = image;
  }
}
