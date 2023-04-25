import * as _ from "lodash"


export function hasProperties(obj: any, keys: Array<any>) {
    const length = keys.length
    const object = _.pick(obj, keys)
    
    return _.size(object) == length ? true : false 
}