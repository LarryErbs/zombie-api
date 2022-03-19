import { isEqual } from 'lodash';
import { DatabaseUnitOfWork } from './databse-unit-of-work';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUnitOfWork {
    execute(work: () => Promise<any>): Promise<any>;
    stop(): Promise<any>;
    start(): Promise<any>;
}

export class UnitOfWorkFactory {
    static async makeUnitOfWork(unitOfWork: UnitOfWorkType): Promise<IUnitOfWork> {
        if (isEqual(unitOfWork, UnitOfWorkType.TYPE_DATABASE)) {
            return new DatabaseUnitOfWork();
        }

        throw new Error(`Unit of work with type ${unitOfWork} is not implemented`);
    }
}

export enum UnitOfWorkType {
    TYPE_DATABASE = 'database_type',
}
