import { GetListParams, DataProvider, GetListResponse, BaseRecord } from "@refinedev/core";
import { MOCK_SUBJECTS } from "./subjectMockData";

/**
 * A partial mock Refine DataProvider implemented for testing and development.
 * 
 * Only handles the `getList` method specifically for the 'subjects' resource.
 * All other mutation and single-record retrieval methods throw errors as they are unimplemented.
 * 
 * @type {DataProvider}
 */
export const dataProvider: DataProvider = {
    /**
     * Retrieves a list of records for a specified resource.
     * Currently only supports the 'subjects' resource by serving static mock data.
     *
     * @template TData - The type of the record extending BaseRecord. Defaults to BaseRecord.
     * @param {GetListParams} params - Configuration parameters for the request.
     * @param {string} params.resource - The name of the resource to fetch (e.g., 'subjects').
     * @returns {Promise<GetListResponse<TData>>} A promise that resolves to the list of records and the total count.
     */

    getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource != 'subjects') return { data: [] as TData[], total: 0 }
        return {
            //make it consume the dummy data from subjectMockData.ts
            data: MOCK_SUBJECTS as unknown as TData[],
            total: MOCK_SUBJECTS.length,
        }
    },

    getOne: async () => { throw new Error('This function is not present in mock') },
    create: async () => { throw new Error('This function is not present in mock') },
    update: async () => { throw new Error('This function is not present in mock') },
    deleteOne: async () => { throw new Error('This function is not present in mock') },

    getApiUrl: () => '',

}

//replace the current data provider for this one