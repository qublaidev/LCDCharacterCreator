import React, { useEffect, useState } from 'react'

function Character({ sums, type }: { sums: number[], type: number }) {
    // console.log({ sums });
    const [rows, setRows] = useState<boolean[][]>([])

    useEffect(() => {
        let r: boolean[][] = []
        for (let index = 0; index < 8; index++) {
            let s = sums[index];
            let d = [false, false, false, false, false]
            if (s - 16 >= 0) {
                s = s - 16
                d[0] = true
            }
            if (s - 8 >= 0) {
                s = s - 8
                d[1] = true
            }
            if (s - 4 >= 0) {
                s = s - 4
                d[2] = true
            }
            if (s - 2 >= 0) {
                s = s - 2
                d[3] = true
            }
            if (s - 1 >= 0) {
                s = s - 1
                d[4] = true
            }
            r.push(d)
        }
        setRows(r)
        // console.log({ r });

    }, [sums])


    return (
        <div className={`grid grid-cols-5   w-[25px] ${type === 1 ? "h-[40px]" : "h-[35px]"}`}>
            {
                rows.map((r, i) => type === 0 && i === 7 ? <></> : (
                    <>
                        <div className={`${r[0] ? "bg-slate-600" : "bg-slate-300"}  aspect-square w-[5px]`} />
                        <div className={`${r[1] ? "bg-slate-600" : "bg-slate-300"}  aspect-square w-[5px]`} />
                        <div className={`${r[2] ? "bg-slate-600" : "bg-slate-300"}  aspect-square w-[5px]`} />
                        <div className={`${r[3] ? "bg-slate-600" : "bg-slate-300"}  aspect-square w-[5px]`} />
                        <div className={`${r[4] ? "bg-slate-600" : "bg-slate-300"}  aspect-square w-[5px]`} />
                    </>
                )

                )
            }

        </div >
    )
}

export default Character