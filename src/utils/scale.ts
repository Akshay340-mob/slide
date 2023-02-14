
const minSale = 10;
const by = 1

export const scale = (max:number)=>{
    
    const scaleArr = []
    let i =0;
    let latest=minSale
    
        
    while(latest < max)
    {
         latest = minSale+i*by
        scaleArr.push(latest)
        i++;
    }
    
    return scaleArr
}

