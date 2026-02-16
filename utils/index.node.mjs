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

/**
 * Path to a file under views/ (project root is current working directory).
 * @param {...string} segments - path parts under views, e.g. 'navigation', 'appbar', 'index.html'
 * @returns {string} absolute path
 */
export const viewPath = (...segments) =>
  node_path.join(node_path.resolve('.'), 'views', ...segments);

export {
  node_fs,
  node_path
};