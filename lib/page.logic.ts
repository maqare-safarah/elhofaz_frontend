export function pageSegments(page: string) {
    return (page||'').split('/')
}

export function isPageValid(page: string) {
    let [pageNo, partNo] = pageSegments(page)
    let pageNumber = parseInt(pageNo)
    if(!partNo || !['1','2'].includes(partNo)) {
        return false;
    } else if (!pageNumber || pageNumber < 1 || pageNumber > 604) {
        return false;
    } else {
        return true;
    }
}

export function pageValue(page: string) {
    const [pageNo, partNo] = pageSegments(page);
    return parseInt(pageNo) + (partNo == '2' ? 0.5 : 0);
}

export function nextPart(page: string) {
    let [pageNo, partNo] = pageSegments(page);
    if(partNo=='1') {
        partNo = '2';
    } else {
        partNo = '1';
        pageNo = String(parseInt(pageNo) + 1)
    }
    return `${pageNo}/${partNo}`
}

export function prevPart(page: string) {
    let [pageNo, partNo] = pageSegments(page);
    if(partNo == '2') {
        partNo = '1';
    } else {
        partNo = '2';
        pageNo = String(parseInt(pageNo) - 1)
    }
    return `${pageNo}/${partNo}`
}

export function getPartsRange(startPage: string, endPage: string) {
    const array: string[] = [];
    let tempPage = startPage;
    while(pageValue(tempPage) <= pageValue(endPage)) {
        array.push(tempPage);
        tempPage = nextPart(tempPage)
    }
    return array;
}


// 
// console.log(`isPageValid('')`, isPageValid('')); 
// console.log(`isPageValid('120')`, isPageValid('120')); 
// console.log(`isPageValid('-1')`, isPageValid('-1')); 
// console.log(`isPageValid('120/0')`, isPageValid('120/0')); 
// console.log(`isPageValid('120/3')`, isPageValid('120/3')); 
// console.log(`isPageValid('1525/52114')`, isPageValid('1525/52114')); 
// console.log(`isPageValid('120/2')`, isPageValid('120/2')); 

// 
// console.log(`pageSegments('120/1')`, pageSegments('120/1')); 
// console.log(`pageValue('120/1')`, pageValue('120/1')); 
// console.log(`pageValue('120/2')`, pageValue('120/2')); 
// console.log(`nextPart('150/1')`, nextPart('150/1')); 
// console.log(`nextPart('150/2')`, nextPart('150/2')); 
// console.log(`prevPart('150/1')`, prevPart('150/1')); 
// console.log(`prevPart('150/2')`, prevPart('150/2')); 
// console.log(`getPartsRange('120/1', '130/2')`, getPartsRange('120/1', '130/2')); 