import { useEffect, useState } from 'react'

function Row({ index, setSums, sums, clear, edit }: { index: number, setSums: any, sums: number[], clear: boolean, edit: boolean }) {

    const [data, setData] = useState([false, false, false, false, false])
    const [sum, setSum] = useState(0)

    useEffect(() => {
        const a = calculate()
        setSum(a)

        let s = [...sums]
        s[index] = a
        setSums(s)
        // eslint-disable-next-line
    }, [data, edit])

    useEffect(() => {
        if (edit) {
            setSum(sums[index])
            let s = sums[index]
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
            setData(d)
        }
        // eslint-disable-next-line
    }, [edit])


    useEffect(() => {
        setData([false, false, false, false, false])
        setSum(0)

    }, [clear])


    function set(index: number) {
        let n = [...data]
        n[index] = !data[index]

        setData(n)
    }

    function calculate(): number {
        let sum: number = 0
        // eslint-disable-next-line
        data.map((element, index) => {
            if (element) sum += Math.pow(2, 4 - index)
        });
        return sum
    }

    return (
        <>
            <p className='text-center mt-3  '>{sum}</p>
            <button onClick={() => set(0)} className={`${data[0] ? "bg-slate-600" : "bg-slate-300  hover:bg-slate-200"} border aspect-square p-6 rounded-sm`} />
            <button onClick={() => set(1)} className={`${data[1] ? "bg-slate-600" : "bg-slate-300  hover:bg-slate-200"} border aspect-square p-6 rounded-sm`} />
            <button onClick={() => set(2)} className={`${data[2] ? "bg-slate-600" : "bg-slate-300  hover:bg-slate-200"} border aspect-square p-6 rounded-sm`} />
            <button onClick={() => set(3)} className={`${data[3] ? "bg-slate-600" : "bg-slate-300  hover:bg-slate-200"} border aspect-square p-6 rounded-sm`} />
            <button onClick={() => set(4)} className={`${data[4] ? "bg-slate-600" : "bg-slate-300  hover:bg-slate-200"} border aspect-square p-6 rounded-sm`} />
            <p className='text-center mt-3 '>{index + 1}</p>
        </>
    )
}

export default Row