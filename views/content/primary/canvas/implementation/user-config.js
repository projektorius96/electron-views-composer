import { ENUMS } from "./utils.js";

export
    const
        userConfig = {
            canvas: {
                stage: {
                    scale: 20
                },
                layers: {
                    grid: {
                        id: ENUMS.CASE.grid,
                        strokeStyle: ENUMS.COLOR.magenta,
                        hidden: !true,
                        dotted: !true,
                        lineWidth: 1,
                        opacity: 0.25
                    }
                    ,
                    wireframe: {
                        id: ENUMS.CASE.wireframe,
                        strokeStyle: ENUMS.COLOR.black,
                        hidden: /* ! */true,
                        lineWidth: 1,
                        opacity: 1
                    }
                    ,
                }
            }
        }
        ;