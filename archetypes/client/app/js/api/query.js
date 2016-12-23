"use strict"

import * as _ from "../libs/underscore"
import { Observable } from "../aj/events"

export const LIKE = "like"
export const GT = "gt"
export const NE = "ne"
export const GTE = "gte"
export const LT = "lt"
export const LTE = "lte"
export const EQ = "eq"
export const IN = "in"
export const NIN = "nin"
export const ID = "id"
export const OR = "or"
export const AND = "and"
export const RANGE = "range"

export class Query extends Observable {
    constructor(init) {
        super()

        this.page = 0
        this.rowsPerPage = 0
        this.sorts = []
        this.filters = []
        this.keyword = null

        _.assign(this, init)
    }

    filter(type, property, value) {
        let current = _.find(this.filters, s => s.property == property)
        if (current) {
            current.value = value
            current.type = type
        } else {
            this.filters.push({property, type, value})
        }

        this.invoke("change")

        return this
    }

    unfilter(property) {
        this.filters = _.filter(this.filters, f => f.property != property)

        this.invoke("change")
        return this
    }

    like(prop, value) {
        this.filter(LIKE, prop, value)
        return this
    }

    gt(prop, value) {
        this.filter(GT, prop, value)
        return this
    }

    ne(prop, value) {
        this.filter(NE, prop, value)
        return this
    }

    gte(prop, value) {
        this.filter(GTE, prop, value)
        return this
    }

    lt(prop, value) {
        this.filter(LT, prop, value)
        return this
    }

    lte(prop, value) {
        this.filter(LTE, prop, value)
        return this
    }

    eq(prop, value) {
        this.filter(EQ, prop, value)
        return this
    }

    in(prop, value) {
        this.filter(IN, prop, value)
        return this
    }

    nin(prop, value) {
        this.filter(NE, prop, value)
        return this
    }

    id(prop, value) {
        this.filter(ID, prop, value)
        return this
    }

    or(prop, value) {
        this.filter(OR, prop, value)
        return this
    }

    and(prop, value) {
        this.filter(AND, prop, value)
        return this
    }

    range(prop, value) {
        this.filter(RANGE, prop, value)
        return this
    }

    gt(prop, value) {
        this.filter(GT, prop, value)
        return this
    }

    ne(prop, value) {
        this.filter(NE, prop, value)
        return this
    }

    sort(prop, descending) {
        let current = _.find(this.sorts, s => s.property == prop)
        if (current) {
            current.descending = descending
        } else {
            this.sorts.push({property: prop, descending})
        }

        this.invoke("change")
        return this
    }

    unsort(prop) {
        this.sorts = _.filter(this.sorts, s => s.property != prop)

        this.invoke("change")
        return this
    }

    clearFilters() {
        this.filters = []
        this.invoke("change")
        return this
    }

    changePage(page) {
        this.page = page
        this.invoke("change")
        return this
    }

    setKeyword(newValue) {
        this.keyword = newValue
        this.invoke("change")
        return this
    }

    toJSON() {
        return JSON.stringify(
            {
                filters: this.filters,
                sorts: this.sorts,
                page: this.page,
                rowsPerPage: this.rowsPerPage
            }
        )
    }
}

export function create(init) {
    let query = new Query(init)
    return query
}