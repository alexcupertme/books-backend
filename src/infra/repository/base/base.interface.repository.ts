import { DeleteResult, UpdateResult } from 'mongodb';

export interface BaseInterfaceRepository<
  TInsert,
  TFind,
  TUpdate,
  TModel,
  TDocument,
> {
  create(data: TInsert): Promise<TDocument>;

  createMany(data: TInsert[]): Promise<TDocument[]>;

  findOneById(id: string): Promise<TDocument>;

  findByCondition(filterCondition: TFind): Promise<TDocument[]>;

  findOneByCondition(filterCondition: TFind): Promise<TDocument>;

  findAll(): Promise<TDocument[]>;

  removeOneById(id: string): Promise<TDocument>;

  removeByCondition(filterCondition: TFind): Promise<DeleteResult>;

  removeOneByCondition(filterCondition: TFind): Promise<DeleteResult>;

  updateOneById(id: string, dataForUpdate: TUpdate): Promise<TDocument>;

  updateByCondition(
    filterCondition: TFind,
    dataForUpdate: TUpdate,
  ): Promise<UpdateResult>;

  updateOneByCondition(
    filterCondition: TFind,
    dataForUpdate: TUpdate,
  ): Promise<UpdateResult>;
}
