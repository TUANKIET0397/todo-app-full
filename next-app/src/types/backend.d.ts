export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

 //declare là từ khóa để khai báo một biến, hàm, lớp hoặc giao diện trong phạm vi toàn cục.
 //  Khi bạn sử dụng declare global, bạn đang nói với TypeScript rằng những khai báo này sẽ 
 // tồn tại trong phạm vi toàn cục và có thể được truy cập từ bất kỳ đâu trong ứng dụng của bạn.
declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

}
