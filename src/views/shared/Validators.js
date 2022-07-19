export const validateItemTitle= (v)=>{
                         
    let regx = /^[ a-zA-Zا-ي\-\’]+$/;
    return regx.test(v)

}

export const validateItemCost= (v)=>{
    let regx= /^(?:\d+|\d{1,3})(?:\.\d*)?[0-9]$/
    return regx.test(v)
}

export const validateItemDuration= (v)=>{
    let regx= /^[0-9]*$/
    return regx.test(v) && v.length>0
}

export const validateBody= (v, min)=>{
    // let regx= /^[0-9]*$/
    // return regx.test(v)
    return v.split("").length >= min
}

export const validateItems= (arr, min)=>{

    return arr.length >= min
}