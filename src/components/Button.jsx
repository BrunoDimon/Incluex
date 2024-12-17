export default function Button({ children, variant = 'default', className, ...props }) {
    const variantsClasses = {
        default: 'bg-blue-500 text-white hover:bg-blue-700',
        disabled: 'bg-blue-500 text-white opacity-50 cursor-not-allowed'
    }

    return (
        <button type="button" {...props} className={`px-3 py-1.5 rounded-md font-semibold shadow-md  ${className} ${variantsClasses[variant]}`}>
            {children}
        </button >
    )
}