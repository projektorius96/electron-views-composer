/* === enum === */

/**
 * @example
 * 
 * ENUM.give; // 'give'
 * ENUM.me; // 'me'
 * ENUM.value; // 'value'
*/
const
    ENUM = 
        new Proxy( Object.create(null) , {
            get(nil, key){
                return (
                    key = `${key}`
                );
            }
        })
    ;

/**
 * @alias
 */
const
    [COLOR, SHAPE, UI_EVENT, CASE, ATTRIBUTE, PRINT] = Array(6).fill(ENUM)
    ;

export
    const
        ENUMS = Object.freeze({
            COLOR, SHAPE, UI_EVENT, CASE, ATTRIBUTE, PRINT
        })
        ;

/* === enum === */


