/* eslint-disable react/prop-types */
export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "",
  className = "",
  ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg outline-0 ${textColor} ${bgColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

// export default Button
