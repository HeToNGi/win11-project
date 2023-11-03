const Icon = ({ component: IconComponent, ...props }) => {
  return <IconComponent {...props}/>
}
const addSvg = ({ width = 24, height = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg> 
)
const clearSvg =({ width = 24, height = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} >
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
)

const AddIcon = ({ ...props }) => <Icon component={addSvg} {...props} />
const ClearIcon = ({ ...props }) => <Icon component={clearSvg} {...props} />

export {
  Icon,
  AddIcon,
  ClearIcon
}