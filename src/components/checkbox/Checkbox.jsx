import CheckboxIcon from "@/assets/img/check.svg"

export const Checkbox = () => {

    return (
        <label className='block relative aspect-square border border-gray-200/20
            rounded-sm cursor-pointer w-5 h-5 check:opacity-100 check:scale-100 has-[*:checked]:bg-gray-200/20'>
            <input className='absolute inset-0 opacity-0 invisible' type="checkbox"/>
            <img className='opacity-0 pointer-events-none select-none w-full scale-0 transition' src={CheckboxIcon} alt="check"/>
        </label>
    )
}