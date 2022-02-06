import { BaseInterfaceRepository } from './base.interface.repository';
import { Model } from 'mongoose';
import { DeleteResult, UpdateResult } from 'mongodb';

export abstract class BaseAbstractRepository<
  TInsert,
  TFind,
  TUpdate,
  TModel,
  TDocument = TModel & Document,
> implements
    BaseInterfaceRepository<TInsert, TFind, TUpdate, TModel, TDocument>
{
  protected constructor(protected entity: Model<TDocument, TFind>) {}

  public async create(data: TInsert): Promise<TDocument> {
    return await this.entity.create(data);
  }

  public async createMany(data: TInsert[]): Promise<TDocument[]> {
    return await this.entity.insertMany(data);
  }

  public async findOneById(id: string): Promise<TDocument> {
    return await this.entity.findById(id).exec();
  }

  public async findByCondition(filterCondition: TFind): Promise<TDocument[]> {
    return await this.entity.find(filterCondition).exec();
  }

  public async findOneByCondition(filterCondition: TFind): Promise<TDocument> {
    return await this.entity.findOne(filterCondition).exec();
  }

  public async findAll(): Promise<TDocument[]> {
    return await this.entity.find().exec();
  }

  public async removeOneById(id: string): Promise<TDocument> {
    return await this.entity.findByIdAndDelete(id).exec();
  }

  public async removeByCondition(
    filterCondition: TFind,
  ): Promise<DeleteResult> {
    return await this.entity.deleteMany(filterCondition).exec();
  }

  public async removeOneByCondition(
    filterCondition: TFind,
  ): Promise<DeleteResult> {
    return await this.entity.deleteOne(filterCondition).exec();
  }

  public async updateOneById(
    id: string,
    dataForUpdate: TUpdate,
  ): Promise<TDocument> {
    return await this.entity.findByIdAndUpdate(id, dataForUpdate).exec();
  }

  public async updateByCondition(
    filterCondition: TFind,
    dataForUpdate: TUpdate,
  ): Promise<UpdateResult> {
    return await this.entity.updateMany(filterCondition, dataForUpdate).exec();
  }

  public async updateOneByCondition(
    filterCondition: TFind,
    dataForUpdate: TUpdate,
  ): Promise<UpdateResult> {
    return await this.entity.updateOne(filterCondition, dataForUpdate).exec();
  }
}
