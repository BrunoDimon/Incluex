export default function Button({ children, variant = 'default', className, disabled, ...props }) {
    const variantsClasses = {
        default: 'bg-blue-300 text-gray-900 hover:bg-blue-200',
        disabled: 'bg-gray-300 text-gray-900'
    }

    return (
        <button type="button" {...props} className={`px-3 py-1 rounded-md ${className} ${variantsClasses[variant]}`} disabled={disabled}>
            {children}
        </button >
    )
}