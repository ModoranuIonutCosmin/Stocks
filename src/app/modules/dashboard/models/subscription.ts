export interface Subscription {
    id: string,
    customerId: string,
    type: number,
    periodStart: Date,
    periodEnd: Date,
    status: string
}
