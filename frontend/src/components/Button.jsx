export function Button({label, onClick}) {
    return (
    <div className="px-4">
        <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2">{label}</button>
    </div>
    )
}