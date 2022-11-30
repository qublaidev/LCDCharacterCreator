import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Character from '../components/Character'
import Row from '../components/Row'


function Characters() {
    const [type, setType] = useState<number>(0)  // 0: 5x7,      1:5x8
    const [clear, setClear] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(0)

    const [sums, setSums] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
    const [saved, setSaved] = useState<number[][]>([])

    useEffect(() => {
        const s = localStorage.getItem("savedCharacters");
        if (s) setSaved(JSON.parse(s))
    }, [])


    const textify = (data: number[]) => {
        return (
            <div className='flex flex-row items-center justify-center text-xs sm:text-base'>
                LCDOUT $fe
                ,$40
                ,{data[0]}
                ,{data[1]}
                ,{data[2]}
                ,{data[3]}
                ,{data[4]}
                ,{data[5]}
                ,{data[6]}
                {type === 1 && `, { data[7]}`}
            </div>)
    }
    const textify2 = (data: number[]) => {
        return `LCDOUT $fe ,$40 ,${data[0]} ,${data[1]} ,${data[2]} ,${data[3]} ,${data[4]} ,${data[5]} ,${data[6]} ${type === 1 ? "," : ""}${type === 1 ? data[7] : ""}`
    }

    const onSave = () => {
        let flag = 0
        // eslint-disable-next-line
        saved.map(s => {
            if (JSON.stringify(s) === JSON.stringify(sums)) {
                toast.error("This character already exists!")
                flag = 1
            }
        })
        if (flag === 1) return
        if (edit) {
            const temp = [...saved]
            temp[editIndex] = sums
            setSaved(temp)
            setEdit(false)
            setEditIndex(0)
            localStorage.setItem("savedCharacters", JSON.stringify(temp));
        } else {
            const temp = [...saved]
            temp.push(sums)
            setSaved(temp)
            localStorage.setItem("savedCharacters", JSON.stringify(temp));
        }
    }
    const onClear = () => {
        setClear(!clear)
        setSums([0, 0, 0, 0, 0, 0, 0, 0])
    }
    const onDelete = (index: number) => {
        const temp = saved.filter((s, i) => i !== index)
        console.log(temp);
        setSaved(temp)
        localStorage.setItem("savedCharacters", JSON.stringify(temp));
    }
    const onEdit = (index: number) => {
        const temp = saved.find((s, i) => i === index)
        setEdit(true)
        setEditIndex(index)
        setSums(temp ?? [])
    }

    return (

        <div className='flex flex-col lg:flex-row    sm:justify-center'>
            <div className='w-full lg:w-4/12 flex flex-col  mt-6'>
                <div className='grid grid-cols-7  '>
                    <div />
                    <p className='text-center  '>16</p>
                    <p className='text-center  '>8</p>
                    <p className='text-center  '>4</p>
                    <p className='text-center  '>2</p>
                    <p className='text-center  '>1</p>
                    <div />
                    {
                        sums.map((s, i) =>
                            type === 0 && i < 7 ? (
                                <Row key={i} clear={clear} edit={edit} sums={sums} index={i} setSums={setSums} />
                            )
                                : type === 1 ?
                                    (<Row key={i} clear={clear} edit={edit} sums={sums} index={i} setSums={setSums} />)
                                    : <></>)
                    }
                </div>
                <div className='m-4 text-sm'>{textify(sums)}</div>
                <div className='flex flex-row items-center justify-evenly'>
                    <button title="copy" className='flex flex-row items-center justify-center ml-2 p-2 hover:bg-slate-100 rounded-lg  text-black text-lg'
                        onClick={() => {
                            navigator.clipboard.writeText(textify2(sums))
                            toast.success("Copied to clipboard")
                        }} >
                        Copy
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                    </button>
                    <button title="save" className='flex flex-row items-center justify-center ml-1 p-2 hover:bg-slate-100 rounded-lg  text-black text-lg'
                        onClick={() => onSave()} >
                        Save
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </button>
                    <button title="clear" className='flex flex-row items-center justify-center ml-1 p-2 hover:bg-slate-100 rounded-lg  text-black text-lg'
                        onClick={() => onClear()} >
                        Clear
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule='evenodd' viewBox="0 0 24 24" strokeWidth={0.01} stroke="currentColor" className="w-6 h-6">
                            <path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-row mt-2 items-center justify-center  gap-4'>
                    <button className='p-2 border rounded-full text-fuchsia-500' onClick={() => setType(0)}>5x7</button>
                    <button className='p-2 border rounded-full text-fuchsia-600' onClick={() => setType(1)}>5x8</button>
                </div>
            </div>
            <div className='flex flex-col  w-full lg:w-7/12 mt-6 mb-2'>
                <p className=' text-center'>
                    Saved Characters
                </p>
                <hr className='my-2' />

                <table className='table-auto mx-2 mt-1'>
                    <tbody className='flex flex-col gap-2'>
                        {saved.length > 0 && saved.map((arr, i) => (
                            <tr className='flex flex-row'>
                                <td className='flex items-center justify-center'>
                                    • &nbsp;<Character type={type} sums={arr} />
                                </td>
                                <td className='flex flex-grow justify-center'>
                                    {textify(arr)}
                                    {(i === editIndex && edit) && (<p className='text-center self-center'>✍</p>)}
                                </td>
                                <td className='flex flex-row items-center justify-end'>
                                    <button title="copy" className='ml-2 p-0 sm:p-2 hover:bg-slate-100 rounded-lg  text-black text-lg'
                                        onClick={() => {
                                            navigator.clipboard.writeText(textify2(arr))
                                            toast.success("Copied to clipboard")
                                        }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                        </svg>
                                    </button>
                                    <button title="edit" className='ml-1 p-0 sm:p-2 hover:bg-slate-100 rounded-lg  text-black text-lg'
                                        onClick={() => onEdit(i)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button title="delete" className='ml-1 p-0 sm:p-2 text-red-600 hover:bg-slate-100 rounded-lg text-lg'
                                        onClick={() => onDelete(i)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr className='my-4' />
                <a
                    href="https://github.com/qublaidev/Resistor-Color-Codes"
                    className="flex flex-row items-center self-center  "
                    title="GitHub link"
                    target="_blank" rel="noopener noreferrer"
                >
                    by &nbsp;
                    <strong className='no-underline text-black hover:underline decoration-teal-300'>qublaidev</strong>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"
                        />
                    </svg>
                </a>
            </div>

        </div>


    )
}

export default Characters