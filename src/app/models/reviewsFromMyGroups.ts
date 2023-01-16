import { Review } from "./review"

export type ReviewsFromMyGroups = {
    lastPage: number,
    page: number,
    pageSize: number,
    total: number,
    data: Review[]
};