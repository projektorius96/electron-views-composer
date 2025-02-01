/**
 * @param {Number} angle - number in angle degrees, internally converted to radians
 * @returns current rotation matrix (in clockwise direction by default, unless negative values is fed)
 */
export function setAngle(angle) {

    const cos = Math.cos( degToRad( angle ) );
    const sin = Math.sin( degToRad( angle ) );

    let x11 = cos; 
    let y12 = sin;
    let x21 = -sin;
    let y22 = cos;

    return (
        [x11, y12, x21, y22].map((component)=> component *= window.devicePixelRatio)
    );

}

/**
 * @param {Number} deg - angle degrees, hence `"deg"`
 * @returns takes a `Number` in angle degrees (`deg`) and converts them `to` `Rad`ians
 */
export function degToRad(deg){
    return (
        deg * (Math.PI / 180)
    )
}

/**
 * @param {Number} start - range lower bound ;
 * @param {Number} step  - range step bound  ;
 * @param {Number} end   - range upper bound ;
 * @param {Boolean} [isIncluded=true] - isIncluded === true ? [start:end] : [start:end) ;
 * @param {Array} [skip=Array]        - useful for some trigonometry calls such as Math.cos at discrete { 90 | 270 } angle degree units, e.g. when Math.cos resolves to undefined, to avoid such scenario we have this exposed param ;
 * @returns {Array} range if { [start:end) when isIncluded := false | [start:end] when isIncluded := true } : default is when "isIncluded := true" ;
 */
export function setRange(start, step, end, isIncluded=true, skip = []){
    
    const range = [];
    
    loop1: for (start; start < end + isIncluded; start += step) {

        loop2: for (let items of skip) {

            if (items == start) {

                continue loop1;

            }

        }

        range.push(start)

    }

    return range;
    
}