export default function CurrencyInputGroup({select, input}) {
    return (
        <div className="flex w-100 m-4">
            <div className="mx-1 flex-1">
                {select}
            </div>
            <div className="mx-1 flex-1">
                {input}
            </div>
        </div>
    )
}