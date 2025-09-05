import node_fs from 'node:fs';
import node_path from 'node:path';

/**
 * 
 * @param {Array} pathspec - list of file system segments 
 * @returns imports a module as UTF-8 encoded `string`, which is subsequently internally converted to UTF-16 String compatible format;
 */
export const importFileModule = (dirname, pathspec)=>{
    return (
        node_fs.readFileSync( 
            node_path.join(dirname, ...pathspec)
            , 
            {
                encoding: 'utf-8'
            }
        )
    );
}

export {
    node_fs, node_path
}